import { db, auth } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// path helper
function vaccinesCollection(petId: string) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");

  return collection(db, "users", userId, "pets", petId, "vaccines");
}

function vaccineDoc(petId: string, vaccineId: string) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Usuário não autenticado");

  return doc(db, "users", userId, "pets", petId, "vaccines", vaccineId);
}

// --------------------------------------------------------------------

export async function addVaccine(petId: string, data: any) {
  const colRef = vaccinesCollection(petId);
  const created = await addDoc(colRef, {
    ...data,
    criadoEm: new Date(),
  });

  return created.id;
}

export async function getVaccines(petId: string) {
  const colRef = vaccinesCollection(petId);
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getVaccineById(petId: string, vaccineId: string) {
  const docRef = vaccineDoc(petId, vaccineId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) throw new Error("Vacina não encontrada");

  return { id: snapshot.id, ...snapshot.data() };
}

export async function updateVaccine(
  petId: string,
  vaccineId: string,
  data: {
    nome: string;
    dataAplicada: string;
    dataProxDose: string;
    obs: string;
  }
) {
  try {
    const ref = vaccineDoc(petId, vaccineId); // CAMINHO CORRETO
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.log("Erro ao atualizar vacina:", error);
    throw error;
  }
}


export async function deleteVaccine(petId: string, vaccineId: string) {
  const docRef = vaccineDoc(petId, vaccineId);
  await deleteDoc(docRef);
}

