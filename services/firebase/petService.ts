import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";

// 📌 Helper: retorna a referência da coleção de pets do usuário
function petsCollection() {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");
  return collection(db, "users", userId, "pets");
}

// 📌 Helper: retorna o documento de um pet específico do usuário
function petDoc(petId: string) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");
  return doc(db, "users", userId, "pets", petId);
}

// --------------------------------------------------------------------

export async function addPet(data: {
  nome: string;
  raca: string;
  fotoUri?: string | null;
}) {
  const colRef = petsCollection();
  const created = await addDoc(colRef, {
    nome: data.nome,
    nomeNormalizado: data.nome.toLowerCase(),
    raca: data.raca,
    racaNormalizada: data.raca.toLowerCase(),
    fotoUri: data.fotoUri || null,
    criadoEm: new Date(),
  });

  return created.id;
}


export async function getPets() {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");

  const petsRef = collection(db, "users", userId, "pets");
  const snapshot = await getDocs(petsRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}


export async function updatePet(petId: string, data: any) {
  const docRef = petDoc(petId);
  await updateDoc(docRef, data);
  return true;
}

export async function deletePet(petId: string) {
  const docRef = petDoc(petId);
  await deleteDoc(docRef);
  return true;

  
}


export async function getPetByName(nome: string) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");

  const petsRef = collection(db, "users", userId, "pets");
  const q = query(petsRef, where("nomeNormalizado", "==", nome.toLowerCase()));

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

export type Pet = {
  id: string;
  nome: string;
  raca: string;
  nomeNormalizado?: string;
  racaNormalizado?: string;
  image?: string;
};

export async function getPetById(id: string): Promise<Pet | null> {
  try {
    const user = auth.currentUser;

    // 1) tenta em /users/{uid}/pets/{id}
    if (user) {
      const userPetRef = doc(db, "users", user.uid, "pets", id);
      const userPetSnap = await getDoc(userPetRef);

      if (userPetSnap.exists()) {
        const data = userPetSnap.data() as any;
        return {
          id: userPetSnap.id,
          nome: data.nome ?? "",
          raca: data.raca ?? "",
          nomeNormalizado: data.nomeNormalizado,
          racaNormalizado: data.racaNormalizado,
          image: data.image,
        };
      }
    }

    // 2) fallback em /pets/{id}
    const petRef = doc(db, "pets", id);
    const petSnap = await getDoc(petRef);

    if (!petSnap.exists()) {
      console.warn("Pet não encontrado no Firestore para id:", id);
      return null;
    }

    const data = petSnap.data() as any;

    return {
      id: petSnap.id,
      nome: data.nome ?? "",
      raca: data.raca ?? "",
      nomeNormalizado: data.nomeNormalizado,
      racaNormalizado: data.racaNormalizado,
      image: data.image,
    };
  } catch (error) {
    console.error("Erro ao buscar pet:", error);
    throw error;
  }
}