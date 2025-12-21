import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc, collection, getDocs, query, orderBy, limit, where
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

// --- HELPERS ---
function todayKey() {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildCallRecord(valueMin, ignoreIQS = false) {
  return {
    valueMin: Number(valueMin.toFixed(3)),
    seconds: Math.round(valueMin * 60),
    ignoreIQS: !!ignoreIQS,
    createdAt: new Date().toISOString(),
  };
}

function computeSummaryFromCalls(calls, npsValue) {
  const totalCalls = calls.length;
  const includedCalls = calls.filter((c) => !c.ignoreIQS).length;
  const totalSecondsAll = calls.reduce((s, c) => s + (c.seconds || 0), 0);
  const tma_seconds = totalCalls === 0 ? 0 : Math.round(totalSecondsAll / totalCalls);
  const iqsPercent = includedCalls === 0 ? 0 : +((npsValue / includedCalls) * 100).toFixed(1);

  return {
    totalCalls,
    includedCalls,
    tma_seconds,
    tma_minutes: +(tma_seconds / 60).toFixed(2),
    iqsPercent,
    updatedAt: new Date().toISOString(),
  };
}

// --- OPERATIONS ---
async function saveTodayFromUI(rawList, npsCurrentVal) {
  const userId = (document.getElementById("usercode")?.value || "").trim();
  if (!userId) return alert("ID de utilizador em falta.");

  const calls = rawList.map(r => buildCallRecord(r.value, r.ignoreIQS));
  const summary = computeSummaryFromCalls(calls, npsCurrentVal);
  const dateKey = todayKey();

  try {
    const docRef = doc(db, "users", userId, "daily", dateKey);
    await setDoc(docRef, { date: dateKey, calls, summary, meta: { savedAt: new Date().toISOString() } }, { merge: true });
    alert("Guardado com sucesso no Firestore!");
  } catch (err) {
    console.error(err);
    alert("Erro ao guardar.");
  }
}

async function fetchHistory(userId, filterType = "7days") {
  const listEl = document.getElementById("historyList");
  const statsEl = document.getElementById("historyStats");
  listEl.innerHTML = '<p class="small">A carregar...</p>';
  
  try {
    let q;
    const ref = collection(db, "users", userId, "daily");
    if (filterType === "7days") q = query(ref, orderBy("date", "desc"), limit(7));
    else {
      const agora = new Date();
      const inicio = filterType === "currentMonth" 
        ? `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-01`
        : `${agora.getFullYear()}-${String(agora.getMonth()).padStart(2, '0')}-01`;
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
      
      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `<strong>${d.date}</strong><div class="history-grid">
        <div>TMA: ${d.summary.tma_seconds}s</div><div>Calls: ${d.summary.totalCalls}</div><div>IQS: ${d.summary.iqsPercent}%</div>
      </div>`;
      listEl.appendChild(item);
    });

    if(count > 0) {
      statsEl.style.display = "grid";
      statsEl.innerHTML = `<div class="stat-item"><span>Média TMA</span><div>${Math.round(acTMA/count)}s</div></div>
                           <div class="stat-item"><span>Total Calls</span><div>${acCalls}</div></div>
                           <div class="stat-item"><span>Média IQS</span><div>${(acIQS/count).toFixed(1)}%</div></div>`;
    }
  } catch (e) { console.error(e); }
}

// --- EXPOSE & LISTENERS ---
window.firebaseTMA = { saveTodayFromUI, fetchHistory };

document.getElementById("historyFilter")?.addEventListener("change", (e) => {
  const uid = document.getElementById("usercode").value;
  fetchHistory(uid, e.target.value);
});

document.getElementById("showDays")?.addEventListener("click", () => {
  const uid = document.getElementById("usercode").value;
  if(!uid) return alert("Insira o utilizador.");
  document.getElementById("historyModal").style.display = "flex";
  fetchHistory(uid);
});

document.getElementById("closeModal")?.addEventListener("click", () => {
  document.getElementById("historyModal").style.display = "none";
});
