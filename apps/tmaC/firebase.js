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

  listEl.innerHTML = '<p class="small" style="text-align: center;">A procurar registos do mês...</p>';
  statsEl.style.display = "none";
  
  try {
    // 1. Calcular o primeiro dia do mês atual no formato YYYY-MM-DD
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const primeiroDiaMes = `${ano}-${mes}-01`;

    // 2. Criar a Query com filtro de intervalo (where)
    // Buscamos todos os docs onde a "date" é maior ou igual ao dia 1 deste mês
    const { where } = await import("https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js");
    
    const q = query(
      collection(db, "users", userId, "daily"),
      where("date", ">=", primeiroDiaMes), 
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    listEl.innerHTML = "";
    
    let acumuladorTMA = 0;
    let acumuladorCalls = 0;
    let acumuladorIQS = 0;
    let totalDias = 0;

    if (querySnapshot.empty) {
      listEl.innerHTML = '<p class="small" style="text-align: center;">Nenhum registo encontrado para o mês corrente.</p>';
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalDias++;
      
      acumuladorTMA += (data.summary.tma_seconds || 0);
      acumuladorCalls += (data.summary.totalCalls || 0);
      acumuladorIQS += (data.summary.iqsPercent || 0);

      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `
        <div style="font-weight: bold; color: var(--accent); border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; margin-bottom: 8px;">
          Data: ${data.date}
        </div>
        <div class="history-grid">
          <div><span class="small">TMA:</span><br/><strong>${data.summary.tma_seconds}s</strong></div>
          <div><span class="small">Calls:</span><br/><strong>${data.summary.totalCalls}</strong></div>
          <div><span class="small">IQS:</span><br/><strong>${data.summary.iqsPercent}%</strong></div>
        </div>
      `;
      listEl.appendChild(item);
    });

    const mediaTMA = Math.round(acumuladorTMA / totalDias);
    const mediaIQS = (acumuladorIQS / totalDias).toFixed(1);

    statsEl.style.display = "grid";
    statsEl.innerHTML = `
      <div class="stat-item">
        <span>Média TMA</span>
        <div>${mediaTMA}s</div>
      </div>
      <div class="stat-item">
        <span>Total Mensal</span>
        <div style="color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.3);">${acumuladorCalls}</div>
      </div>
      <div class="stat-item">
        <span>Média IQS</span>
        <div>${mediaIQS}%</div>
      </div>
    `;
    /*let q;
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
    `;*/
    }
  } catch (e) { 
    console.error("Erro ao carregar histórico:", err);
    // Nota: Se receberes um erro de "index required", clica no link que aparece no console do browser para criar o índice automático no Firebase.
    listEl.innerHTML = '<p class="small" style="color: #ff4d4d; text-align: center;">Erro ao carregar dados do mês.</p>';
  }
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
