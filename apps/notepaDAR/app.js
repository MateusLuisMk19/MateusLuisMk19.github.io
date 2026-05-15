// Referências do DOM
const usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  back = document.getElementById('back'),
  divBtns = document.getElementById("divBtns"),
  save_list = document.getElementById("save-list"),
  cp_btn = document.getElementById("btn-cp"),
  cp_email = document.getElementById("btn-cp-email"),
  cp_transf = document.getElementById("btn-cp-transf"),
  clearBtn = document.getElementById("btn-clear"),
  fitBtn = document.getElementById("btn-fit"),
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
const dicionarioAbreviaturas = [
  { "Abreviatura": "ab", "Descritivo": "Acesso básico" },
  { "Abreviatura": "ad", "Descritivo": "Alteração diversa (requisição)" },
  { "Abreviatura": "Agt", "Descritivo": "Agente" },
  { "Abreviatura": "Alt", "Descritivo": "Alteração" },
  { "Abreviatura": "AN", "Descritivo": "Alteração de número" },
  { "Abreviatura": "AT", "Descritivo": "Área de Tratamento" },
  { "Abreviatura": "avr", "Descritivo": "Avaria" },
  { "Abreviatura": "Barr", "Descritivo": "Barramento" },
  { "Abreviatura": "BD", "Descritivo": "Base de Dados" },
  { "Abreviatura": "BO", "Descritivo": "Backoffice" },
  { "Abreviatura": "c/", "Descritivo": "Com" },
  { "Abreviatura": "CA", "Descritivo": "Contacto alternativo" },
  { "Abreviatura": "camp", "Descritivo": "Campanha" },
  { "Abreviatura": "Carreg", "Descritivo": "Carregamento" },
  { "Abreviatura": "CC", "Descritivo": "Classe Comercial" },
  { "Abreviatura": "Cham", "Descritivo": "chamadas" },
  { "Abreviatura": "Chq", "Descritivo": "Cheque" },
  { "Abreviatura": "Clt", "Descritivo": "Cliente" },
  { "Abreviatura": "COM", "Descritivo": "Comutação" },
  { "Abreviatura": "CPE/HN", "Descritivo": "Customer Premises Equipment/HomeNetwork" },
  { "Abreviatura": "cont", "Descritivo": "continuação" },
  { "Abreviatura": "CP7", "Descritivo": "Código Postal" },
  { "Abreviatura": "CT", "Descritivo": "classe técnica" },
  { "Abreviatura": "Ct", "Descritivo": "contencioso" },
  { "Abreviatura": "CV", "Descritivo": "Coding violations" },
  { "Abreviatura": "DC", "Descritivo": "Delegação de Competências" },
  { "Abreviatura": "DD", "Descritivo": "Débito Direto" },
  { "Abreviatura": "Desc", "Descritivo": "Desconto" },
  { "Abreviatura": "DU", "Descritivo": "Dia(s) Útil (eis)" },
  { "Abreviatura": "DLP", "Descritivo": "Data Limite de Pagamento" },
  { "Abreviatura": "DN", "Descritivo": "Data de Nascimento" },
  { "Abreviatura": "DL ou dwn", "Descritivo": "Download" },
  { "Abreviatura": "DRA", "Descritivo": "Disaster Recovery Application" },
  { "Abreviatura": "DVL", "Descritivo": "Desligar volta a ligar" },
  { "Abreviatura": "Enc", "Descritivo": "Encomenda" },
  { "Abreviatura": "Equip", "Descritivo": "Equipamento" },
  { "Abreviatura": "ET", "Descritivo": "Equipa Técnica" },
  { "Abreviatura": "Ext", "Descritivo": "Extensão" },
  { "Abreviatura": "fat", "Descritivo": "Fatura / Faturação" },
  { "Abreviatura": "FE", "Descritivo": "Fatura Eletrónica" },
  { "Abreviatura": "FF", "Descritivo": "Field Force" },
  { "Abreviatura": "FID", "Descritivo": "Fidelização" },
  { "Abreviatura": "FGW", "Descritivo": "FiberGateway" },
  { "Abreviatura": "FO", "Descritivo": "Frontoffice" },
  { "Abreviatura": "FR", "Descritivo": "Factory Reset" },
  { "Abreviatura": "H", "Descritivo": "Horário" },
  { "Abreviatura": "HSI", "Descritivo": "High Speed Internet" },
  { "Abreviatura": "Inf", "Descritivo": "Informar / informação" },
  { "Abreviatura": "HGW", "Descritivo": "HomeGateway" },
  { "Abreviatura": "infra", "Descritivo": "Infraestrutura" },
  { "Abreviatura": "IT", "Descritivo": "Internet no Telemóvel" },
  { "Abreviatura": "LA", "Descritivo": "Lista Amarela" },
  { "Abreviatura": "LAN", "Descritivo": "Local Area Network" },
  { "Abreviatura": "LAT", "Descritivo": "Localização área tecnológica" },
  { "Abreviatura": "LEDs", "Descritivo": "Luzes (light-emitting diode)" },
  { "Abreviatura": "lj", "Descritivo": "Loja" },
  { "Abreviatura": "LR", "Descritivo": "Linha de rede" },
  { "Abreviatura": "MB", "Descritivo": "Multibanco" },
  { "Abreviatura": "MC", "Descritivo": "Mudança de casa" },
  { "Abreviatura": "MR", "Descritivo": "Margens de ruído" },
  { "Abreviatura": "mm", "Descritivo": "mesmo/a" },
  { "Abreviatura": "MMS", "Descritivo": "Mensagem Multimédia" },
  { "Abreviatura": "n", "Descritivo": "não" },
  { "Abreviatura": "NC", "Descritivo": "Nota de crédito" },
  { "Abreviatura": "nc", "Descritivo": "nunca" },
  { "Abreviatura": "net", "Descritivo": "Internet" },
  { "Abreviatura": "NI", "Descritivo": "Nova instalação" },
  { "Abreviatura": "nok", "Descritivo": "Not ok" },
  { "Abreviatura": "nuv", "Descritivo": "Número único de venda" },
  { "Abreviatura": "Obg", "Descritivo": "Obrigada(o)" },
  { "Abreviatura": "OOP", "Descritivo": "Outro operador" },
  { "Abreviatura": "OV", "Descritivo": "Ordem de venda" },
  { "Abreviatura": "p/", "Descritivo": "Para/ por" },
  { "Abreviatura": "PA", "Descritivo": "Participação de Avaria" },
  { "Abreviatura": "PAA", "Descritivo": "Proposta de Acordo Adesão" },
  { "Abreviatura": "Pagmt", "Descritivo": "Pagamento" },
  { "Abreviatura": "PD", "Descritivo": "Ponto de Distribuição" },
  { "Abreviatura": "PDO", "Descritivo": "Ponto de Distribuição Óptico" },
  { "Abreviatura": "Pdd", "Descritivo": "Pedido" },
  { "Abreviatura": "pds", "Descritivo": "Ponto de situação" },
  { "Abreviatura": "pf", "Descritivo": "Por favor" },
  { "Abreviatura": "PPP", "Descritivo": "Plano pagamento prestações" },
  { "Abreviatura": "PPP", "Descritivo": "Pós Pagos" },
  { "Abreviatura": "PPS", "Descritivo": "pré Pagos" },
  { "Abreviatura": "prob", "Descritivo": "problema" },
  { "Abreviatura": "Prt", "Descritivo": "Pretende" },
  { "Abreviatura": "PSU", "Descritivo": "Power Supply Unit (fonte de alimentação)" },
  { "Abreviatura": "pts", "Descritivo": "Pontos" },
  { "Abreviatura": "PW", "Descritivo": "password" },
  { "Abreviatura": "q", "Descritivo": "Que" },
  { "Abreviatura": "qd", "Descritivo": "quando" },
  { "Abreviatura": "qq", "Descritivo": "Qualquer" },
  { "Abreviatura": "rap", "Descritivo": "Crédito (no âmbito de \"responder à primeira\")" },
  { "Abreviatura": "RE", "Descritivo": "Responsável equipa" },
  { "Abreviatura": "recfg", "Descritivo": "Reconfigurar" },
  { "Abreviatura": "recfg bbras", "Descritivo": "Reconfigurar bbras" },
  { "Abreviatura": "Recl", "Descritivo": "Reclamação" },
  { "Abreviatura": "Ref. MB", "Descritivo": "Referência Multibanco" },
  { "Abreviatura": "reg", "Descritivo": "Registo" },
  { "Abreviatura": "Req", "Descritivo": "Requisição" },
  { "Abreviatura": "Ret", "Descritivo": "Retirar / retirada" },
  { "Abreviatura": "RAD", "Descritivo": "Rede de Acesso de Distribuição" },
  { "Abreviatura": "RAL", "Descritivo": "Rede de Acesso Local" },
  { "Abreviatura": "RIC", "Descritivo": "Rede interna cliente" },
  { "Abreviatura": "RT", "Descritivo": "Relatório Técnico" },
  { "Abreviatura": "s/", "Descritivo": "Sem" },
  { "Abreviatura": "SFT", "Descritivo": "Serviço fixo telefónico" },
  { "Abreviatura": "STB", "Descritivo": "Set Top Box" },
  { "Abreviatura": "sinc", "Descritivo": "sincronismo" },
  { "Abreviatura": "Sit", "Descritivo": "Situação" },
  { "Abreviatura": "sms", "Descritivo": "mensagem" },
  { "Abreviatura": "Sol", "Descritivo": "Solicitação" },
  { "Abreviatura": "STBHE", "Descritivo": "Set Top Box High End" },
  { "Abreviatura": "STBLE", "Descritivo": "Set Top Box Low End" },
  { "Abreviatura": "Sup", "Descritivo": "Supervisor" },
  { "Abreviatura": "tarif", "Descritivo": "Tarifário" },
  { "Abreviatura": "Tb", "Descritivo": "Também" },
  { "Abreviatura": "TB", "Descritivo": "Transferência bancária" },
  { "Abreviatura": "tel", "Descritivo": "Telefone" },
  { "Abreviatura": "Tip", "Descritivo": "tipificação" },
  { "Abreviatura": "tlm", "Descritivo": "Telemóvel" },
  { "Abreviatura": "TME", "Descritivo": "Teste de Medidas Elétricas" },
  { "Abreviatura": "Transf", "Descritivo": "Transferência" },
  { "Abreviatura": "Unl", "Descritivo": "Unlimited" },
  { "Abreviatura": "Upg", "Descritivo": "Upgrade" },
  { "Abreviatura": "UL", "Descritivo": "Upload" },
  { "Abreviatura": "VD", "Descritivo": "venda dinheiro" },
  { "Abreviatura": "VM", "Descritivo": "Voice mail" },
  { "Abreviatura": "WAN", "Descritivo": "Wide Area Network" },
  { "Abreviatura": "WR", "Descritivo": "Waiting Ring" },
  { "Abreviatura": "Y", "Descritivo": "Crédito excepcional" }
];

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

    if (exists) {
 		console.warn(`Colisão detectada para o ID: ${result}. Tentando novamente...`);
    } else {
		finalId = result;
    	isUnique = true;
    }
  }

  return finalId;
};

async function confirmarLogin() {
    usercode.classList.add("disabled");
    localStorage.setItem("usercode", usercode.value.trim());
    front.style.display = "none";
    front.disabled = false;
    await loadSaveList()
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

cp_transf.addEventListener('click', () => {
    // Captura os elementos pelos IDs
    const name = fr_name.value;
    const desc = fr_desc.value;
    const analise = fr_analise.value;
    const resol = fr_Resol.value;

    // Monta a string formatada
    const textoParaCopiar = `Nome: ${name}\n\nD: ${desc}\nA: ${analise}\nR: ${resol}`;

    // Usa a Clipboard API para copiar
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Copiado com sucesso!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        alert("Erro ao copiar para a área de transferência.");
    });
})

cp_email.addEventListener('click', () => {
    // Captura os elementos pelos IDs
    const name = fr_name.value;
    const nserv = fr_nserv.value;
    const contt = fr_tel.value;
    const desc = fr_desc.value;
    const analise = fr_analise.value;
    const resol = fr_Resol.value;

    // Monta a string formatada
    const textoParaCopiar = `Nome: ${name}\nNum Serviço: ${nserv}\nContacto: ${contt}\n\nD: ${desc}\nA: ${analise}\nR: ${resol}`;

    // Usa a Clipboard API para copiar
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Copiado com sucesso!");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        alert("Erro ao copiar para a área de transferência.");
    });
})

saveBtn.addEventListener('click', async () => {
	// tratamento de dados
	if(!fr_desc || !fr_analise || !fr_Resol){
		console.log("sem dados");
		return
	}

	const noteId = await generateUniqueId();
	const dar = {
		d: fr_desc.value,
		a: fr_analise.value,
		r: fr_Resol.value,
	};

	// IA resuming
	let type = "Sem tv"; //fr_desc resume
	let subtype = "Sem sinal"; //fr_desc resume cause
	
	if (window.firebaseTMA) window.firebaseTMA.saveNoteFromUI("#33dd88", type, subtype, dar, noteId);
})

fitBtn.addEventListener('click', () => {
	// tratamento de dados
	let fitDescText = abreviarTexto(fr_desc.value);
	let fitAnaText = abreviarTexto(fr_analise.value);

	if(!fitDescText) fitDescText = expandirTexto(fr_desc.value);
	if(!fitAnaText) fitAnaText = expandirTexto(fr_analise.value);
	
	fr_desc.value = fitDescText;
	fr_analise.value = fitAnaText;
})

async function loadSaveList(uid){
	const finalUid = uid ? "all" : "";
	save_list.innerHTML = "";

	const notas = await window.firebaseTMA.fetchSaveList(finalUid);

	console.log("data:", notas)
	
	notas.forEach((nota) =>{
		let card = document.createElement("div");
		card.classList.add("bridge-item");
		card.value = `D: ${nota.dar.d}\nA: ${nota.dar.a}\nR: ${nota.dar.r}`;
		card.setAttribute("data-status", "no-signal");
		card.innerHTML = `<span class="bridge-title">${nota.type}</span>
		    		<span class="bridge-desc">${nota.subtype}</span>`;

		
		save_list.append(card)
	});
}

/**
 * Substitui descrições completas pelas suas abreviaturas.
 */
function abreviarTexto(texto) {
  let textoFinal = texto;
  
  // Ordenamos do maior descritivo para o menor para evitar substituições parciais incorretas
  const listaOrdenada = [...dicionarioAbreviaturas].sort((a, b) => 
    b.Descritivo.length - a.Descritivo.length
  );

  listaOrdenada.forEach(item => {
    // Criamos uma expressão regular para encontrar a palavra exata (case insensitive)
    const regex = new RegExp(`\\b${item.Descritivo}\\b`, 'gi');
    textoFinal = textoFinal.replace(regex, item.Abreviatura);
  });

  return textoFinal == texto ? false : textoFinal;
}

/**
 * Substitui abreviaturas pelas descrições completas.
 */
function expandirTexto(texto) {
  let textoFinal = texto;

  dicionarioAbreviaturas.forEach(item => {
    // Procura pela abreviatura como palavra isolada
    const regex = new RegExp(`\\b${item.Abreviatura}\\b`, 'g');
    textoFinal = textoFinal.replace(regex, item.Descritivo);
  });

  return textoFinal;
}

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


document.addEventListener('DOMContentLoaded', async (event) => {
	localStorage.removeItem("usercode");
	await loadSaveList(true);
});
