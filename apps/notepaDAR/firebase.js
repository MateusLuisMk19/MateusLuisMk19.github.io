import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, collection, getDocs, query, orderBy, limit, where, getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwuDRQyhAXkHTsH6omhCbLTNwodeQtKkc",
    authDomain: "notepedar.firebaseapp.com",
    projectId: "notepedar",
    storageBucket: "notepedar.firebasestorage.app",
    messagingSenderId: "317490353439",
    appId: "1:317490353439:web:e2791d8dfe2055ff198c2a"
 };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SALVAR ---
async function saveTodayFromUI(rawList, npsCurrentVal) {
  const userId = document.getElementById("usercode").value.trim();

  // Tratamendo de dados

  const payload = {
    color: "#987364",
    type: "Sem tv",
    subtype: "Por favor aguarde",
    dar: {
      d: "",
      a: "",
      r: "",
    }
  };

  try {
    await setDoc(doc(db, "users", userId), payload, { merge: true });
    alert("Guardado com sucesso!");
  } catch (e) { alert("Erro ao guardar."); }
}


async function checkUserExists(userId) {
  try {
    const userRef = doc(db, "users", userId);
    // Verificamos se existe pelo menos um documento na subcoleção daily
    const dailyRef = collection(db, "users", userId, "daily");
    const q = query(dailyRef, limit(1));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (e) {
    console.error("Erro ao verificar user:", e);
    return false;
  }
}


// --- EXPOR PARA O WINDOW ---
window.firebaseTMA = { saveTodayFromUI, checkUserExists };
