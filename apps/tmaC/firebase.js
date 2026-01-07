import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, collection, getDocs, query, orderBy, limit, where, getDoc,
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
    valueMin: Number(r.value),
    tmaCalc:Number(r.valueToCalc),
    seconds: (r.valueToCalc * 60),
    ignoreIQS: !!r.ignoreIQS
  }));

  const payload = {
    date: dateKey,
    calls,
    summary: {
      totalCalls: calls.length,
      tma_seconds: Math.round((calls.reduce((s, c) => s + c.tmaCalc, 0) / calls.length) * 60),
      iqsPercent: +((npsCurrentVal / calls.filter(c => !c.ignoreIQS).length || 1) * 100).toFixed(1),
      iqsVal: npsCurrentVal,
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
      <div id="middle-item" class="stat-item"><span>${filterType === '7days' ? 'Soma' : 'Total'} CHAM</span><div>${acCalls}</div></div>
      <div class="stat-item"><span>Média IQS</span><div>${(acIQS/totalDias).toFixed(1)}%</div></div>`;

    meuIntervaloCH("start", filterType, acCalls, cargaHoraria, totalDias);
    
  } catch (e) { 
    console.error("Erro ao carregar histórico:", err);
    listEl.innerHTML = '<p class="small" style="color:red;">Erro ao filtrar dados.</p>';
  }
}

// Ligar o evento de mudança do Select
document.getElementById("historyFilter").addEventListener("change", (e) => {
  meuIntervaloCH("end");
  const userId = document.getElementById("usercode").value.trim();
  const filter = e.target.value;

  localStorage.setItem("historyFilter", filter);
  fetchHistory(userId, filter);
});

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

// --- BUSCAR DADOS DE HOJE ---
async function fetchTodayData(userId) {
  if (!userId) return null;

  // Gera a chave da data atual no formato YYYY-MM-DD (mesmo formato usado no saveTodayFromUI)
  const dateKey = new Date().toISOString().split('T')[0];
  
  try {
    const docRef = doc(db, "users", userId, "daily", dateKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Dados de hoje encontrados:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("Nenhum registo para o dia de hoje.");
      return null;
    }
  } catch (e) {
    console.error("Erro ao buscar dados de hoje:", e);
    return null;
  }
}

// --- EXPOR PARA O WINDOW ---
window.firebaseTMA = { saveTodayFromUI, fetchHistory, checkUserExists, fetchTodayData };

// Listeners do Modal (IDs do seu HTML)
document.getElementById("showDays").addEventListener("click", () => {
  const uid = document.getElementById("usercode").value;
  if(uid) {
    document.getElementById("historyModal").style.display = "flex";
    const filter = localStorage.getItem("historyFilter") || "7days";
    
    fetchHistory(uid,filter);
  }
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("historyModal").style.display = "none";
  meuIntervaloCH("end");
});

function meuIntervaloCH(action, filterType, acCalls, cargaHoraria, totalDias){
  let count = 2;
  const mainDiv = document.getElementById("middle-item");
  let spanH = document.createElement("span");
  let divH = document.createElement("div");
  
  mainDiv.textContent = "";
  
  const meuIntervalo = setInterval(() => {    
      if(count%2==0){
        spanH.textContent = "Cham. Hora";
        divH.textContent = `${filterType === '7days' ? acCalls/(7*cargaHoraria).toFixed(2) : acCalls/(totalDias*cargaHoraria).toFixed(2)}`;  
      }else{
        spanH.textContent = `${filterType === '7days' ? 'Soma' : 'Total'} CHAM`;
        divH.textContent = `${acCalls}`;
      }
  
      mainDiv.appendChild(spanH);
      mainDiv.appendChild(divH);
      count=count+1;
  }, 5000); 

  if(action=="end"){
    clearInterval(meuIntervalo);
  }
}
