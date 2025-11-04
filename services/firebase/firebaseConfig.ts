import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9_nPimuwZ1iRWayuiAZ7lWFJMCLwPSnI",
  authDomain: "meupetvacinado-3d96f.firebaseapp.com",
  projectId: "meupetvacinado-3d96f",
  storageBucket: "meupetvacinado-3d96f.firebasestorage.app",
  messagingSenderId: "673340502361",
  appId: "1:673340502361:web:0216ccb7eabf2af84b1c48"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
