// Referências do DOM
const usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  back = document.getElementById('back'),
  divBtns = document.getElementById("divBtns"),
  cp_btn = document.getElementById("btn-cp"),
  clearBtn = document.getElementById("btn-clear"),
  saveBtn = document.getElementById("btn-save"),
  fr_nserv = document.getElementById("nserv"),
  fr_name = document.getElementById("name"),
  fr_tel = document.getElementById("tel"),
  fr_desc = document.getElementById("desc"),
  fr_nif = document.getElementById("nif"),
  fr_analise = document.getElementById("analise"),
  fr_Resol = document.getElementById("resol");

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

back.addEventListener('click', () => { 
	usercode.classList.remove("disabled"); front.classList.remove("hide"); 
	front.style.display = "flex";
    	front.disabled = false;
	front.style.opacity = "1";
	localStorage.removeItem("tma_usercode"); 
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

const generateUniqueId = async (length = 25) => {
  const actualLength = Math.min(length, 25);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  let isUnique = false;
  let finalId = '';

  while (!isUnique) {
    let result = '';
    const randomValues = new Uint32Array(actualLength);
    window.crypto.getRandomValues(randomValues);

    for (let i = 0; i < actualLength; i++) {
      result += chars.charAt(randomValues[i] % chars.length);
    }

    // Verifica no Firebase se o ID já existe
    // Assume-se que checkNoteExists retorna true se existir e false se não
    const exists = await window.firebaseTMA.checkNoteExists(result);

    if (!exists) {
      finalId = result;
      isUnique = true;
    } else {
      console.warn(`Colisão detectada para o ID: ${result}. Tentando novamente...`);
    }
  }

  return finalId;
};

function confirmarLogin() {
    usercode.classList.add("disabled");
    localStorage.setItem("usercode", usercode.value.trim());
    front.style.display = "none";
    front.disabled = false;
    
}
/***********************************************/
/******** Barra de Botões Função ***************/
/***********************************************/

cp_btn.addEventListener('click', () => {
    // Captura os elementos pelos IDs
    const desc = fr_desc.value;
    const analise = fr_analise.value;
    const resol = fr_Resol.value;

    // Monta a string formatada
    const textoParaCopiar = `D: ${desc}\nA: ${analise}\nR: ${resol}`;

    // Usa a Clipboard API para copiar
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Copiado com sucesso!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        alert("Erro ao copiar para a área de transferência.");
    });
})

saveBtn.addEventListener('click', () => {
	// tratamento de dados
	if(!fr_desc || !fr_analise || !fr_Resol){
		console.log("sem dados");
		return
	}

	const noteId = await generateUniqueId();
	const dar = {
		d: fr_desc,
		a: fr_analise,
		r: fr_Resol,
	};

	// IA resuming
	let type = "Sem tv"; //fr_desc resume
	let subtype = "Sem sinal"; //fr_desc resume cause
	
	if (window.firebaseTMA) window.firebaseTMA.saveNoteFromUI("#33dd88", type, subtype, dar, noteId);
})

clearBtn.addEventListener('click', () => {
	// tratamento de dados
	fr_nserv.value = "";
	fr_name.value = "";
	fr_tel.value = "";
	fr_desc.value = "";
	fr_nif.value = "";
	fr_analise.value = "";
	fr_Resol.value = "";
})


document.addEventListener('DOMContentLoaded', (event) => {
	localStorage.removeItem("usercode");
});
