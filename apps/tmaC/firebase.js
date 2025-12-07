// Import modular SDK from CDN
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

  // ----------------------------
  // CONFIGURE - substitute your config here
  // ----------------------------
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

  // ----------------------------
  // HELPERS
  // ----------------------------
  function todayKey(date = new Date()) {
    // build YYYY-MM-DD in the user's timezone (browser default)
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // converte a tua lista (array de {value, ignoreIQS}) para o formato de call
  function buildCallRecord(valueMin, ignoreIQS = false) {
    const seconds = Math.round(valueMin * 60);
    return {
      valueMin: Number(valueMin.toFixed(3)),
      seconds,
      ignoreIQS: !!ignoreIQS,
      createdAt: new Date().toISOString(),
    };
  }

  // gera o summary a partir de uma lista de calls (cada call tem seconds e ignoreIQS)
  function computeSummaryFromCalls(calls) {
    const totalCalls = calls.length;
    const excludedCalls = calls.filter((c) => c.ignoreIQS).length;
    const includedCalls = totalCalls - excludedCalls;

    const totalSecondsAll = calls.reduce((s, c) => s + (c.seconds || 0), 0);
    const totalSecondsIncluded = calls
      .filter((c) => !c.ignoreIQS)
      .reduce((s, c) => s + (c.seconds || 0), 0);

    const tma_seconds =
      totalCalls === 0 ? 0 : Math.round(totalSecondsAll / totalCalls);
    const tma_minutes = +(tma_seconds / 60).toFixed(2);

    const iqsPercent =
      includedCalls === 0 ? 0 : +(( (parseInt(document.getElementById("npsVal")?.textContent || "0") ) / includedCalls) * 100).toFixed(1);

    return {
      totalCalls,
      excludedCalls,
      includedCalls,
      totalSecondsAll,
      totalSecondsIncluded,
      tma_seconds,
      tma_minutes,
      iqsPercent,
      updatedAt: new Date().toISOString(),
    };
  }

  // ----------------------------
  // FIRESTORE OPERATIONS
  // ----------------------------

  /**
   * Save (create or overwrite) the daily document for a user
   * path: users/{userId}/daily/{YYYY-MM-DD}
   * payload: { date, calls: [...], summary: {...}, meta: {...} }
   */
  async function saveDailyDoc(userId, dateKey, callsArray, extraMeta = {}) {
    if (!userId) throw new Error("userId required");
    const docRef = doc(db, "users", userId, "daily", dateKey);
    const summary = computeSummaryFromCalls(callsArray);

    const payload = {
      date: dateKey,
      calls: callsArray,
      summary,
      meta: {
        savedAt: new Date().toISOString(),
        ...extraMeta,
      },
    };

    await setDoc(docRef, payload, { merge: true });
    return payload;
  }

  /**
   * Append a single call record to today's doc (creates doc if missing)
   * - callRecord must be an object { valueMin, seconds, ignoreIQS, createdAt }
   * Returns the resulting doc payload after write (by reading it again).
   */
  async function appendCall(userId, dateKey, callRecord) {
    if (!userId || !dateKey) throw new Error("userId and dateKey required");
    const docRef = doc(db, "users", userId, "daily", dateKey);

    // strategy: read current doc (if any), push call into calls[], recompute summary and write
    const snap = await getDoc(docRef);
    let existing = snap.exists() ? snap.data() : null;
    const existingCalls = existing?.calls || [];

    const newCalls = existingCalls.concat(callRecord);
    const payload = {
      date: dateKey,
      calls: newCalls,
      summary: computeSummaryFromCalls(newCalls),
      meta: {
        savedAt: new Date().toISOString(),
      },
    };

    await setDoc(docRef, payload, { merge: true });
    return payload;
  }

  /**
   * Get daily doc (returns null if none)
   */
  async function getDailyDoc(userId, dateKey) {
    if (!userId || !dateKey) throw new Error("userId and dateKey required");
    const docRef = doc(db, "users", userId, "daily", dateKey);
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  }

  // ----------------------------
  // USAGE / INTEGRATION EXAMPLES
  // ----------------------------
  // These helpers assume you keep using `usercode.value` as userId.
  // If you use Firebase Auth, replace userId with auth.currentUser.uid

  async function saveTodayFromUI() {
    const userId = (document.getElementById("usercode")?.value || "").trim();
    if (!userId) {
      alert("Introduce um userId antes de guardar.");
      return;
    }
    // parse input using tua função existente parseInput
    const rawList = parseInput(document.getElementById("input").value || "");
    // rawList é array de { value, ignoreIQS }
    const calls = rawList.map((r) => buildCallRecord(r.value, r.ignoreIQS));

    const dateKey = todayKey();
    try {
      const payload = await saveDailyDoc(userId, dateKey, calls, {
        source: "web-ui",
      });
      console.log("Guardado:", payload);
      alert("Guardado no Firestore para " + dateKey);
    } catch (err) {
      console.error("Erro ao guardar:", err);
      alert("Erro ao guardar. Ver console.");
    }
  }

  async function addSingleCallFromUI(valueMin, ignoreIQS = false) {
    const userId = (document.getElementById("usercode")?.value || "").trim();
    if (!userId) {
      alert("Introduce um userId antes de adicionar chamada.");
      return;
    }
    const dateKey = todayKey();
    const call = buildCallRecord(valueMin, ignoreIQS);
    try {
      const payload = await appendCall(userId, dateKey, call);
      console.log("Chamada adicionada. Novo doc:", payload);
      return payload;
    } catch (err) {
      console.error("Erro ao adicionar chamada:", err);
      throw err;
    }
  }

  async function loadTodayToUI() {
    const userId = (document.getElementById("usercode")?.value || "").trim();
    if (!userId) {
      alert("Introduce um userId para carregar dados.");
      return;
    }
    const dateKey = todayKey();
    try {
      const doc = await getDailyDoc(userId, dateKey);
      if (!doc) {
        alert("Sem dados para hoje.");
        return null;
      }
      // se quiseres, preenche a UI com doc.calls e doc.summary
      console.log("Documento do dia:", doc);
      return doc;
    } catch (err) {
      console.error("Erro ao ler doc:", err);
      throw err;
    }
  }

  async function checkUserExists(userId) {
    if (!userId) throw new Error("userId required");
  
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
  
    return snap.exists() ? snap.data() : null;
  }


  // ----------------------------
  // Expor funções no global para fácil debug no console
  // ----------------------------
  window.firebaseTMA = {
    saveTodayFromUI,
    addSingleCallFromUI,
    loadTodayToUI,
    saveDailyDoc,
    appendCall,
    getDailyDoc,
    computeSummaryFromCalls,
    checkUserExists,
  };

  // exemplo extra: ligar um botão de guardar existente
  const saveBtn = document.getElementById("save");
  if (saveBtn) {
    saveBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      console.log("vamo salvar?")
      saveFunc(getDailyDoc, saveTodayFromUI);
      
    });
  }

  const front = document.getElementById('front'),
    usercode = document.querySelector("#usercode").value;

  if (front) {
    front.addEventListener('click', () => {
      // Procurar user na bd
      console.log(usercode)
      console.log(checkUserExists(usercode))
     /*  if(checkUserExists(usercode)){
        if (confirm("Utilizador existente, deseja associar?")) {
             console.log("selecionado")
           
        } else {
             console.log("não selecionado")
             
        }  
      }else{
        if (confirm("Utilizador não encontrado, deseja guardar " + usercode + "?")) {
             console.log("salvo")
        } else {
             console.log("não salvo")
             
        }
      } */
      // exemplo de ação
      /* 
      if (confirm("Tens a certeza?")) {
           
      } else {
           
      }  */
    });
  }
