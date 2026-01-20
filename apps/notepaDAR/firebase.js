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

// --- HISTÓRICO ---
async function fetchHistory(userId, filterType = "7days") {
  const listEl = document.getElementById("historyList");
  const statsEl = document.getElementById("historyStats");
  const cargaHoraria = Number(document.getElementById("cargaHoraria")) || 8;

  listEl.innerHTML = '<p class="small" style="text-align: center;">A procurar registos do mês...</p>';
  statsEl.style.display = "none";
  
  try {
    let q;
    const dailyRef = collection(db, "users", userId, "daily");
    const agora = new Date();

    if (filterType === "7days") {
      // Padrão: Últimos 7 registos independente da data
      q = query(dailyRef, orderBy("date", "desc"), limit(7));
      
    } else if (filterType === "currentMonth") {
      // Mês atual: Desde o dia 1
      const inicioMes = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-01`;
      q = query(dailyRef, where("date", ">=", inicioMes), orderBy("date", "desc"));
      
    } else if (filterType === "lastMonth") {
      // Mês anterior: Entre o dia 1 e o último dia do mês passado
      const dataMesPassado = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
      const anoP = dataMesPassado.getFullYear();
      const mesP = String(dataMesPassado.getMonth() + 1).padStart(2, '0');
      
      const inicioMesPassado = `${anoP}-${mesP}-01`;
      const fimMesPassado = `${anoP}-${mesP}-31`; // Firestore tratará as strings corretamente
      
      q = query(dailyRef, 
        where("date", ">=", inicioMesPassado), 
        where("date", "<=", fimMesPassado), 
        orderBy("date", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    listEl.innerHTML = "";
    
    let acTMA = 0, acCalls = 0, acIQS = 0, totalDias = 0;

    if (querySnapshot.empty) {
      listEl.innerHTML = '<p class="small" style="text-align: center;">Sem dados para este período.</p>';
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalDias++;
      acTMA += data.summary.tma_seconds;
      acCalls += data.summary.totalCalls;
      acIQS += data.summary.iqsPercent;

      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `
        <div style="font-weight:bold; color:var(--accent); border-bottom:1px solid #333; padding-bottom:5px; margin-bottom:8px;">Data: ${data.date}</div>
        <div class="history-grid">
          <div><span class="small">TMA:</span><br/><strong>${data.summary.tma_seconds}s</strong></div>
          <div><span class="small">Calls:</span><br/><strong>${data.summary.totalCalls}</strong></div>
          <div><span class="small">IQS:</span><br/><strong>${data.summary.iqsPercent}%</strong></div>
        </div>`;
      listEl.appendChild(item);
    });

    statsEl.style.display = "grid";
    statsEl.innerHTML = `
      <div class="stat-item"><span>Média TMA</span><div>${Math.round(acTMA/totalDias)}s</div></div>
      <div id="middle-item" class="stat-item"><span>${filterType === '7days' ? 'Soma' : 'Total'} Cham</span><div>${acCalls}</div></div>
      <div class="stat-item"><span>Média IQS</span><div>${(acIQS/totalDias).toFixed(1)}%</div></div>`;

    meuIntervaloCH("start", filterType, acCalls, cargaHoraria, totalDias);
    
  } catch (e) { 
    console.error("Erro ao carregar histórico:", err);
    listEl.innerHTML = '<p class="small" style="color:red;">Erro ao filtrar dados.</p>';
  }
}

// --- EXPOR PARA O WINDOW ---
window.firebaseTMA = { fetchHistory };
