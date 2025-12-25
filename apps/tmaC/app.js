// Referências do DOM
const input = document.getElementById("input"),
  calc = document.getElementById("calc"),
  clear = document.getElementById("clear"),
  refresh = document.getElementById("refresh") || document.createElement("button"),
  copyBtn = document.getElementById("copy"),
  saveBtn = document.getElementById("save"),
  results = document.getElementById("results"),
  countEl = document.getElementById("count"),
  npsPercent = document.getElementById("npsPercent"),
  npsPercentMeta = document.getElementById("npsPercentMeta"),
  totalMinEl = document.getElementById("totalMin"),
  totalMinSecEl = document.getElementById("totalMinSec"),
  tmaSecEl = document.getElementById("tmaSec"),
  tmaSecBox = document.getElementById("tmaSecBox"),
  npsVal = document.getElementById("npsVal"),
  usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  back = document.getElementById('back'),
  divBtns = document.getElementById("divBtns"),
  informHold = document.getElementById("informHold"),
  informCont = document.getElementById("informCont");

// --- FUNÇÕES GLOBAIS (Chamadas pelo HTML) ---
window.npsDud = function(val) {
  let current = parseInt(npsVal.textContent) || 0;
  npsVal.textContent = Math.max(0, current + val);
  isClearORrefresh();
};

window.changeInfoContente = function(state) {
  if (state === 0) { // Esconder
    informHold.style.display = "none";
    informCont.style.display = "block";
  } else { // Mostrar
    informHold.style.display = "block";
    informCont.style.display = "none";
  }
};

// --- LÓGICA DE CÁLCULO ---
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

  // Cores do TMA
  if (tmaSec < 550) tmaSecBox.style.backgroundColor = "darkgreen";
  else if (tmaSec <= 700) tmaSecBox.style.backgroundColor = "#b33d18";
  else tmaSecBox.style.backgroundColor = "darkred";

  // Lógica de Meta
  if (percent < 70) {
    const meta = 0.701;
    const txAct = parseFloat(npsPercent.textContent);
    const list = parseInput(input.value);
    const chAct = list.length;
    const finalIQS = Math.ceil((meta * validIQS - nps) / (1 - meta)) + nps;

    const chamN = chamadasNecessarias({  chamadasAtuais:chAct,  taxaAtual:txAct, meta:meta})
    npsPercentMeta.textContent = `+${chamN} para >70%`;
    npsPercentMeta.style.backgroundColor = "#b33d18";
  } else {
    npsPercentMeta.textContent = "Good Job";
    npsPercentMeta.style.backgroundColor = "darkgreen";
  }
});

// --- BOTÕES ---
clear.addEventListener("click", () => {
  input.value = "";
  npsVal.textContent = "00";
  results.hidden = true;
  tmaSecBox.style.backgroundColor = "transparent";
  isClearORrefresh();
});

copyBtn.addEventListener("click", () => {
  const text = `TMA: ${tmaSecEl.textContent}s | IQS: ${npsPercent.textContent}`;
  navigator.clipboard.writeText(text).then(() => alert("Copiado!"));
});

saveBtn.addEventListener("click", () => {
  if (!usercode.value || !front.classList.contains("hide")) return alert("Confirme o utilizador.");
  const list = parseInput(input.value);
  const nps = parseInt(npsVal.textContent) || 0;
  if (window.firebaseTMA) window.firebaseTMA.saveTodayFromUI(list, nps);
});

function chamadasNecessarias({
  chamadasAtuais,
  taxaAtual,      // ex: 0.25
  meta            // ex: 0.70
}) {
  const transferidasAtuais = chamadasAtuais * taxaAtual/100;
  const x = (meta * chamadasAtuais - transferidasAtuais) / (1 - meta);
  return Math.ceil(x);
}

// Controlo do FAB de Novidades
const fabBtn = document.getElementById("fabBtn");
const newsPanel = document.getElementById("newsPanel");
const closeNews = document.getElementById("closeNews");

fabBtn.addEventListener("click", () => {
  newsPanel.classList.toggle("hide");
});

closeNews.addEventListener("click", () => {
  newsPanel.classList.add("hide");
});

// Fechar se clicar fora do painel
document.addEventListener("click", (e) => {
  if (!document.getElementById("newsFAB").contains(e.target)) {
    newsPanel.classList.add("hide");
  }
});

// Interface User
usercode.addEventListener("input", (e) => divBtns.classList.toggle("hide", e.target.value.length < 5));
back.addEventListener('click', () => { usercode.classList.remove("disabled"); front.classList.remove("hide"); localStorage.removeItem("tma_usercode"); });
input.addEventListener('change', () => { isClearORrefresh(); });
refresh.addEventListener('click', async () => {
	const uid = usercode.value.trim();
	const dadosHoje = await window.firebaseTMA.fetchTodayData(uid);

	if (dadosHoje) {
		// Exemplo: atualizar um contador na tela com o que já foi salvo
		console.log("Hoje já fizeste " + dadosHoje.summary.totalCalls + " chamadas.");
		console.log(dadosHoje)
	}else{
		console.log("sem dados")
	}
});
front.addEventListener('click', async () => {
    const uid = usercode.value.trim();
    if (uid.length < 5) return;

    // Feedback visual de carregamento
    front.style.opacity = "0.5";
    front.disabled = true;

    const exists = await window.firebaseTMA.checkUserExists(uid);

    if (exists) {
        alert(`Logado como ${uid}`);
        confirmarLogin();
    } else {
        const novoRegisto = confirm(`O user "${uid}" não foi encontrado na base de dados.\nDeseja criar um novo registo com este nome?`);
        if (novoRegisto) {
            confirmarLogin();
        } else {
            // Se não quiser, desbloqueia para editar
            front.style.opacity = "1";
            front.disabled = false;
        }
    }
});

function confirmarLogin() {
    usercode.classList.add("disabled");
    front.classList.add("hide");
    localStorage.setItem("tma_usercode", usercode.value.trim());
    front.style.opacity = "1";
    front.disabled = false;
	isClearORrefresh();
}

function isClearORrefresh(){
  if(localStorage.getItem("tma_usercode") && !input.value && parseInt(npsVal.textContent) < 1){
	    clear.style.display = "none";
	    refresh.style.display = "block";
	}else {
	    clear.style.display = "block"
	    refresh.style.display = "none"
	}
}

document.addEventListener('DOMContentLoaded', (event) => {
	localStorage.removeItem("tma_usercode");
	isClearORrefresh();
});
