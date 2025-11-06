import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

//salvar vacina na subseleção do pet
export async function addVacine(petId: string, data: { nome: string, dataAplicada: string, dataProxDose: string, obs?: string }) {
    const vaccinesRef = collection(db, "pets", petId, "vaccines"); //va para tabela pets, dentro dela acesse o id e crie a subtabela vaccines
    const docRef = await addDoc(vaccinesRef, data);
    return docRef.id; // devolve o id da vacina criada
}


export async function getVaccine(petId: string) {
    try {
        const vaccinesRef = collection(db, "pets", petId, "vaccines");
        const snapshot = await getDocs(vaccinesRef);

        const vaccines = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        return vaccines
    } catch (error) {
        console.error("Erro ao buscar vacinas", error);
        throw error
    }
}