// Importa os módulos necessários do Firebase (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase (substituir com os teus dados)
const firebaseConfig = {
  apiKey: "AIzaSyDNCzEEjvnlyeT2gtPPC20HJLlSe7M2-_U",
    authDomain: "my-tma-exe.firebaseapp.com",
    projectId: "my-tma-exe",
    storageBucket: "my-tma-exe.firebasestorage.app",
    messagingSenderId: "977728683930",
    appId: "1:977728683930:web:db99a995c17929dc960423"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Guarda um documento no Firestore
 * @param {string} userId 
 * @param {object} data 
 */
export async function guardarFirebase(userId, data) {
  if (!userId) throw new Error("UserId é obrigatório");
  try {
    const ref = doc(db, "users", userId);
    await setDoc(ref, data, { merge: true });
    console.log("Dados guardados com sucesso no Firestore");
  } catch (e) {
    console.error("Erro ao guardar dados no Firestore:", e);
  }
}

/**
 * Lê um documento do Firestore
 * @param {string} userId 
 * @returns {object|null}
 */
export async function carregarFirebase(userId) {
  if (!userId) throw new Error("UserId é obrigatório");
  try {
    const ref = doc(db, "users", userId);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) return snapshot.data();
    return null;
  } catch (e) {
    console.error("Erro ao carregar dados do Firestore:", e);
    return null;
  }
}
