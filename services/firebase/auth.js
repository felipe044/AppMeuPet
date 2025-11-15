import { auth } from "./firebase";

import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export async function login(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha);
}

export async function registrar(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha);
}