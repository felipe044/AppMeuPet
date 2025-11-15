import {auth} from './firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export async function signUp(email: string, password: string) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error: any) {
    throw error;
  }
}
// Login (sign in)
export async function signIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error: any) {
    throw error;
  }
}