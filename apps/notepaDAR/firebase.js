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
async function saveNoteFromUI(color, type, subtype, dar, noteId) {
  const userId = document.getElementById("usercode").value.trim();

  // Tratamendo de dados
  console.log(userId);

  const payload = {
    color: color,
    type: type,
    subtype: subtype,
    dar: dar,
    uid: userId ? userId : "all"
  };

  console.log(payload);

  try {
    //await setDoc(doc(db, "users", userId), payload);
    await setDoc(doc(db, "notes", noteId), payload);
    alert("Guardado com sucesso!");
  } catch (e) { alert("Erro ao guardar."); }
}


async function checkUserExists(userId) {
  try {
    const userRef = doc(db, "users", userId);
    
    const querySnapshot = await getDoc(userRef);
    console.log(querySnapshot);
    
    return !querySnapshot.empty;
  } catch (e) {
    console.error("Erro ao verificar user:", e);
    return false;
  }
}

async function checkNoteExists(noteId) {
  try {
    const noteRef = doc(db, "notes", noteId);
    
    const querySnapshot = await getDoc(noteRef);
    console.log(querySnapshot);
    
    return !querySnapshot.empty;
  } catch (e) {
    console.error("Erro ao verificar user:", e);
    return false;
  }
}


// --- EXPOR PARA O WINDOW ---
window.firebaseTMA = { saveNoteFromUI, checkUserExists, checkNoteExists };
