import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

/** ✅ Buscar todos os pets */
export async function getAllPets() {
  const petsRef = collection(db, "pets");
  const snapshot = await getDocs(petsRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addPet(petData: { nome: string; raca: string }) {
  const petsRef = collection(db, "pets");

  const newPet = {
    nome: petData.nome,
    raca: petData.raca,
    nomeNormalizado: petData.nome.trim().toLowerCase(),
    racaNormalizada: petData.raca.trim().toLowerCase(),
  };

  const docRef = await addDoc(petsRef, newPet);
  return docRef.id;
}

export async function getPet(nome: string, raca: string) {
  const petsRef = collection(db, "pets");

  const q = query(
    petsRef,
    where("nomeNormalizado", "==", nome.trim().toLowerCase()),
    where("racaNormalizada", "==", raca.trim().toLowerCase())
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}
