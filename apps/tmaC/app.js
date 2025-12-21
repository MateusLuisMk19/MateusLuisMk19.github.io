const input = document.getElementById("input"),
  calc = document.getElementById("calc"),
  clear = document.getElementById("clear"),
  copyBtn = document.getElementById("copy"),
  results = document.getElementById("results"),
  countEl = document.getElementById("count"),
  npsPercent = document.getElementById("npsPercent"),
  npsPercentMeta = document.getElementById("npsPercentMeta"),
  totalMinEl = document.getElementById("totalMin"),
  totalMinSecEl = document.getElementById("totalMinSec"),
  tmaSecEl = document.getElementById("tmaSec"),
  npsVal = document.getElementById("npsVal"),
  usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  back = document.getElementById('back'),
  divBtns = document.getElementById("divBtns"),
  saveBtn = document.getElementById("save");

// --- INICIALIZAÇÃO / PYWEBVIEW ---
document.addEventListener("DOMContentLoaded", async () => {
  if (window.pywebview) {
    try {
      const dados = await window.pywebview.api.carregar();
      if (dados.tma_input) input.value = dados.tma_input;
      if (dados.nps_val !== undefined) npsVal.textContent = dados.nps_val;
    } catch (e) { console.error("Erro PyWebView:", e); }
  }
});

// --- LÓGICA DE INTERFACE (INFO TOGGLE) ---
const informHold = document.getElementById("informHold");
const informCont = document.getElementById("informCont");

informCont.addEventListener("click", () => {
  informHold.style.display = "block";
  informCont.style.display = "none";
});

informHold.addEventListener("click", () => {
  informHold.style.display = "none";
  informCont.style.display = "block";
});

// --- GESTÃO DE NPS (IQS) ---
async function npsDud(val) {
  let current = parseInt(npsVal.textContent) || 0;
  let newVal = Math.max(0, current + val);
  npsVal.textContent = newVal;

  if (window.pywebview) {
    await window.pywebview.api.guardar({ tma_input: input.value, nps_val: newVal });
  }
}

document.getElementById("npsAdd").addEventListener("click", () => npsDud(1));
document.getElementById("npsMinus").addEventListener("click", () => npsDud(-1));

// --- PARSE E CÁLCULOS ---
function parseInput(text) {
  if (!text) return [];
  return text.split(/[\n,;]+/).flatMap(chunk => 
    chunk.split(/\s+/).filter(Boolean).map(p => {
      const ignoreIQS = p.endsWith("*");
      let cleaned = p.replace(/\*/g, "").replace(/,/g, ".").replace(/[^0-9.]/g, "");
      if (!cleaned) return null;
      let num = Number(cleaned);
      if (num % 1 !== 0) {
        const intP = Math.floor(num);
        const secP = Math.round((num - intP) * 100);
        num = intP + (secP / 60);
      }
      return { value: num, ignoreIQS };
    })
  ).filter(Boolean);
}

calc.addEventListener("click", () => {
  const list = parseInput(input.value);
  if (!list.length) return alert("Insira tempos válidos.");

  const totalMin = list.reduce((a, b) => a + b.value, 0);
  const tmaSec = Math.round((totalMin / list.length) * 60);
  const nps = parseInt(npsVal.textContent) || 0;
  const validIQS = list.filter(x => !x.ignoreIQS).length;
  const percent = validIQS ? ((nps / validIQS) * 100).toFixed(1) : 0;

  results.hidden = false;
  countEl.textContent = list.length;
  totalMinEl.textContent = totalMin.toFixed(2);
  totalMinSecEl.textContent = Math.round(totalMin * 60);
  tmaSecEl.textContent = tmaSec;
  npsPercent.textContent = `${percent}%`;

  // Lógica de Meta
  if (percent < 70) {
    const meta = 0.701;
    const nec = Math.ceil((meta * list.length - (nps)) / (1 - meta));
    npsPercentMeta.textContent = `+ ${nec} para meta`;
    npsPercentMeta.style.backgroundColor = "#b33d18";
  } else {
    npsPercentMeta.textContent = "Good Job";
    npsPercentMeta.style.backgroundColor = "darkgreen";
  }
});

// --- BOTÕES DE ACÇÃO ---
clear.addEventListener("click", () => {
  input.value = "";
  npsVal.textContent = "0";
  results.hidden = true;
});

copyBtn.addEventListener("click", () => {
  const text = `TMA: ${tmaSecEl.textContent}s | IQS: ${npsPercent.textContent}`;
  navigator.clipboard.writeText(text).then(() => alert("Copiado!"));
});

saveBtn.addEventListener("click", () => {
  const list = parseInput(input.value);
  const nps = parseInt(npsVal.textContent) || 0;
  
  if (!usercode.value || !front.classList.contains("hide")) {
    return alert("Confirme o utilizador (botão V) antes de guardar.");
  }
  
  if (window.firebaseTMA) {
    window.firebaseTMA.saveTodayFromUI(list, nps);
  }
});

// --- USER CONFIRMATION ---
usercode.addEventListener("input", (e) => {
  divBtns.classList.toggle("hide", e.target.value.length < 5);
});

front.addEventListener('click', () => {
  usercode.classList.add("disabled");
  front.classList.add("hide");
});

back.addEventListener('click', () => {
  usercode.classList.remove("disabled");
  front.classList.remove("hide");
});
