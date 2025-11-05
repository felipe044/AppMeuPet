import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

//salvar vacina na subseleção do pet
async function addVacine(petId: string, data: { nome: string, dataAplicada: string, dataProxDose: string, obs?: string }) {
    const vaccinesRef = collection(db, "pets", petId, "vaccines"); //va para tabela pets, dentro dela acesse o id e crie a subtabela vaccines
    const docRef = await addDoc(vaccinesRef, data);
    return docRef.id; // devolve o id da vacina criada
}

export default addVacine