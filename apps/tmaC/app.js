const input = document.getElementById("input"),
  calc = document.getElementById("calc"),
  clear = document.getElementById("clear"),
  results = document.getElementById("results"),
  countEl = document.getElementById("count"),
  npsPercent = document.getElementById("npsPercent"),
  npsPercentMeta = document.getElementById("npsPercentMeta"),
  tmaSecEl = document.getElementById("tmaSec"),
  saveBtn = document.getElementById("save"),
  npsVal = document.getElementById("npsVal"),
  usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  divBtns = document.getElementById("divBtns");

// --- LÓGICA DE PARSE ---
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

// --- CÁLCULOS ---
function computeTMA(list) {
  const totalMin = list.reduce((a, b) => a + b.value, 0);
  return { totalMin, tmaSec: Math.round((totalMin / list.length) * 60) };
}

function chamadasNecessarias(atuais, taxa, meta) {
  const x = (meta * atuais - (atuais * taxa / 100)) / (1 - meta);
  return Math.ceil(x);
}

// --- EVENTOS ---
calc.addEventListener("click", () => {
  const list = parseInput(input.value);
  if (!list.length) return alert("Sem dados.");

  const res = computeTMA(list);
  const nps = parseInt(npsVal.textContent) || 0;
  const validIQS = list.filter(x => !x.ignoreIQS).length;
  const percent = validIQS ? ((nps / validIQS) * 100).toFixed(1) : 0;

  results.hidden = false;
  countEl.textContent = list.length;
  tmaSecEl.textContent = res.tmaSec;
  npsPercent.textContent = `${percent}%`;

  if (percent < 70) {
    const nec = chamadasNecessarias(list.length, parseFloat(percent), 0.701);
    npsPercentMeta.textContent = `+ ${nec} para meta`;
    npsPercentMeta.style.backgroundColor = "#b33d18";
  } else {
    npsPercentMeta.textContent = "Meta atingida";
    npsPercentMeta.style.backgroundColor = "darkgreen";
  }
});

saveBtn.addEventListener("click", async () => {
  const list = parseInput(input.value);
  const nps = parseInt(npsVal.textContent) || 0;
  
  if (!usercode.value || !front.classList.contains("hide")) {
    return alert("Confirme o utilizador primeiro.");
  }
  
  if (window.firebaseTMA) {
    await window.firebaseTMA.saveTodayFromUI(list, nps);
  }
});

clear.addEventListener("click", () => {
  input.value = "";
  npsVal.textContent = "0";
  results.hidden = true;
});

usercode.addEventListener("input", (e) => {
  divBtns.classList.toggle("hide", e.target.value.length < 5);
});

front.addEventListener('click', () => {
  usercode.classList.add("disabled");
  front.classList.add("hide");
});

document.getElementById('back').addEventListener('click', () => {
  usercode.classList.remove("disabled");
  front.classList.remove("hide");
});
