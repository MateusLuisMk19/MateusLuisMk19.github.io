// Importa os módulos necessários do Firebase (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase (substituir com os teus dados)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
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
