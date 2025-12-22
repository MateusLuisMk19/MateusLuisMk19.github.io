import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, collection, getDocs, query, orderBy, limit, where
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNCzEEjvnlyeT2gtPPC20HJLlSe7M2-_U",
  authDomain: "my-tma-exe.firebaseapp.com",
  projectId: "my-tma-exe",
  storageBucket: "my-tma-exe.firebasestorage.app",
  messagingSenderId: "977728683930",
  appId: "1:977728683930:web:db99a995c17929dc960423"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SALVAR ---
async function saveTodayFromUI(rawList, npsCurrentVal) {
  const userId = document.getElementById("usercode").value.trim();
  const dateKey = new Date().toISOString().split('T')[0];
  
  const calls = rawList.map(r => ({
    valueMin: Number(r.value.toFixed(3)),
    seconds: Math.round(r.value * 60),
    ignoreIQS: !!r.ignoreIQS
  }));

  const payload = {
    date: dateKey,
    calls,
    summary: {
      totalCalls: calls.length,
      tma_seconds: Math.round(calls.reduce((s, c) => s + c.seconds, 0) / calls.length),
      iqsPercent: +((npsCurrentVal / calls.filter(c => !c.ignoreIQS).length || 1) * 100).toFixed(1),
      updatedAt: new Date().toISOString()
    }
  };

  try {
    await setDoc(doc(db, "users", userId, "daily", dateKey), payload, { merge: true });
    alert("Guardado com sucesso!");
  } catch (e) { alert("Erro ao guardar."); }
}

// --- HISTÓRICO ---
async function fetchHistory(userId, filterType = "7days") {
  const listEl = document.getElementById("historyList");
  const statsEl = document.getElementById("historyStats");
  
  try {
    let q;
    const ref = collection(db, "users", userId, "daily");
    if (filterType === "7days") q = query(ref, orderBy("date", "desc"), limit(7));
    else {
      const agora = new Date();
      let ano = agora.getFullYear(), mes = agora.getMonth() + 1;
      if (filterType === "lastMonth") mes--;
      const inicio = `${ano}-${String(mes).padStart(2, '0')}-01`;
      q = query(ref, where("date", ">=", inicio), orderBy("date", "desc"));
    }

    const snap = await getDocs(q);
    listEl.innerHTML = "";
    let acTMA = 0, acCalls = 0, acIQS = 0, count = 0;

    snap.forEach(doc => {
      const d = doc.data();
      count++;
      acTMA += d.summary.tma_seconds;
      acCalls += d.summary.totalCalls;
      acIQS += d.summary.iqsPercent;
      listEl.innerHTML += `<div class="history-item"><strong>${d.date}</strong><br>TMA: ${d.summary.tma_seconds}s | Calls: ${d.summary.totalCalls} | IQS: ${d.summary.iqsPercent}%</div>`;
    });

    if (count > 0) {
      statsEl.style.display = "grid";
      statsEl.innerHTML = `
      <div class="stat-item">
        <span>Média TMA</span>
        <div>${Math.round(acTMA/count)}s</div>
      </div>
      <div class="stat-item">
        <span>Total Calls</span>
        <div>${acCalls}</div>
      </div>
      <div class="stat-item">
        <span>Média IQS</span>
        <div>${(acIQS/count).toFixed(1)}%</div>
      </div>
    `;
    }
  } catch (e) { console.error(e); }
}

// --- EXPOR PARA O WINDOW ---
window.firebaseTMA = { saveTodayFromUI, fetchHistory };

// Listeners do Modal (IDs do seu HTML)
document.getElementById("showDays").addEventListener("click", () => {
  const uid = document.getElementById("usercode").value;
  if(uid) {
    document.getElementById("historyModal").style.display = "flex";
    fetchHistory(uid);
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("historyModal").style.display = "none";
});

document.getElementById("historyFilter").addEventListener("change", (e) => {
  fetchHistory(document.getElementById("usercode").value, e.target.value);
});
