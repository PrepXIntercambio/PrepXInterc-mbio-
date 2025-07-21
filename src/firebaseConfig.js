// Importe as funções necessárias dos SDKs que você precisa
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// A configuração do seu app da web do Firebase
// ATENÇÃO: Substitua os valores abaixo pelos valores da SUA tela do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA994FE3LPgf10gwnTJHgltX10NdRxgG6w",
  authDomain: "onliprep-app.firebaseapp.com",
  projectId: "onliprep-app",
  storageBucket: "onliprep-app.firebasestorage.app",
  messagingSenderId: "55098424135",
  appId: "1:55098424135:web:eeb925f03905a0441dea62"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporte os serviços que você vai usar no seu app
// db é a nossa conexão com o banco de dados Firestore
export const db = getFirestore(app);
// auth é a nossa conexão com o sistema de autenticação (login/senha)
export const auth = getAuth(app);
