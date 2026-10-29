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
  { "Abreviatura": "ad", "Descritivo": "Alteração diversa" },
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
  { "Abreviatura": "DU", "Descritivo": "Dia Útil" },
  { "Abreviatura": "DU", "Descritivo": "Dias Úteis" },
  { "Abreviatura": "DLP", "Descritivo": "Data Limite de Pagamento" },
  { "Abreviatura": "DN", "Descritivo": "Data de Nascimento" },
  { "Abreviatura": "DL", "Descritivo": "Download" },
  { "Abreviatura": "dwl", "Descritivo": "Download" },
  { "Abreviatura": "DRA", "Descritivo": "Disaster Recovery Application" },
  { "Abreviatura": "DVL", "Descritivo": "Desligar volta a ligar" },
  { "Abreviatura": "Enc", "Descritivo": "Encomenda" },
  { "Abreviatura": "Equip", "Descritivo": "Equipamento" },
  { "Abreviatura": "ET", "Descritivo": "Equipa Técnica" },
  { "Abreviatura": "Ext", "Descritivo": "Extensão" },
  { "Abreviatura": "fat", "Descritivo": "Fatura" },
  { "Abreviatura": "fat", "Descritivo": "Faturação" },
  { "Abreviatura": "FE", "Descritivo": "Fatura Eletrónica" },
  { "Abreviatura": "FF", "Descritivo": "Field Force" },
  { "Abreviatura": "FID", "Descritivo": "Fidelização" },
  { "Abreviatura": "FGW", "Descritivo": "FiberGateway" },
  { "Abreviatura": "FO", "Descritivo": "Frontoffice" },
  { "Abreviatura": "FR", "Descritivo": "Factory Reset" },
  { "Abreviatura": "H", "Descritivo": "Horário" },
  { "Abreviatura": "HSI", "Descritivo": "High Speed Internet" },
  { "Abreviatura": "Inf", "Descritivo": "informação" },
  { "Abreviatura": "Inf", "Descritivo": "Informar" },
  { "Abreviatura": "HGW", "Descritivo": "HomeGateway" },
  { "Abreviatura": "infra", "Descritivo": "Infraestrutura" },
  { "Abreviatura": "IT", "Descritivo": "Internet no Telemóvel" },
  { "Abreviatura": "LA", "Descritivo": "Lista Amarela" },
  { "Abreviatura": "LAN", "Descritivo": "Local Area Network" },
  { "Abreviatura": "LAT", "Descritivo": "Localização área tecnológica" },
  { "Abreviatura": "LEDs", "Descritivo": "Luzes" },
  { "Abreviatura": "LED", "Descritivo": "Luz" },
  { "Abreviatura": "lj", "Descritivo": "Loja" },
  { "Abreviatura": "LR", "Descritivo": "Linha de rede" },
  { "Abreviatura": "MB", "Descritivo": "Multibanco" },
  { "Abreviatura": "MC", "Descritivo": "Mudança de casa" },
  { "Abreviatura": "MR", "Descritivo": "Margens de ruído" },
  { "Abreviatura": "mm", "Descritivo": "mesmo" },
  { "Abreviatura": "mm", "Descritivo": "mesma" },
  { "Abreviatura": "MMS", "Descritivo": "Mensagem Multimédia" },
  { "Abreviatura": "n", "Descritivo": "não" },
  { "Abreviatura": "NC", "Descritivo": "Nota de crédito" },
  { "Abreviatura": "nc", "Descritivo": "nunca" },
  { "Abreviatura": "net", "Descritivo": "Internet" },
  { "Abreviatura": "NI", "Descritivo": "Nova instalação" },
  { "Abreviatura": "nok", "Descritivo": "Not ok" },
  { "Abreviatura": "nuv", "Descritivo": "Número único de venda" },
  { "Abreviatura": "Obg", "Descritivo": "Obrigado" },
  { "Abreviatura": "Obg", "Descritivo": "Obrigada" },
  { "Abreviatura": "OOP", "Descritivo": "Outro operador" },
  { "Abreviatura": "OV", "Descritivo": "Ordem de venda" },
  { "Abreviatura": "p/", "Descritivo": "Para" },
  { "Abreviatura": "p/", "Descritivo": "Por" },
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
  { "Abreviatura": "PSU", "Descritivo": "Fonte de alimentação" },
  { "Abreviatura": "pts", "Descritivo": "Pontos" },
  { "Abreviatura": "PW", "Descritivo": "password" },
  { "Abreviatura": "q", "Descritivo": "Que" },
  { "Abreviatura": "qd", "Descritivo": "quando" },
  { "Abreviatura": "qq", "Descritivo": "Qualquer" },
  { "Abreviatura": "RE", "Descritivo": "Responsável equipa" },
  { "Abreviatura": "recfg", "Descritivo": "Reconfigurar" },
  { "Abreviatura": "recfg bbras", "Descritivo": "Reconfigurar bbras" },
  { "Abreviatura": "Recl", "Descritivo": "Reclamação" },
  { "Abreviatura": "Ref. MB", "Descritivo": "Referência Multibanco" },
  { "Abreviatura": "reg", "Descritivo": "Registo" },
  { "Abreviatura": "Req", "Descritivo": "Requisição" },
  { "Abreviatura": "Ret", "Descritivo": "Retirar" },
  { "Abreviatura": "Ret", "Descritivo": "Retirada" },
  { "Abreviatura": "RAD", "Descritivo": "Rede de Acesso de Distribuição" },
  { "Abreviatura": "RAL", "Descritivo": "Rede de Acesso Local" },
  { "Abreviatura": "RIC", "Descritivo": "Rede interna cliente" },
  { "Abreviatura": "RT", "Descritivo": "Relatório Técnico" },
  { "Abreviatura": "s/", "Descritivo": "Sem" },
  { "Abreviatura": "SFT", "Descritivo": "Serviço fixo telefónico" },
  { "Abreviatura": "STB", "Descritivo": "Box" },
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
        showToast(`Logado como ${uid}`);
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
        showToast("Copiado com sucesso!","success");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        showToast("Erro ao copiar para a área de transferência.", "error");
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
        showToast("Copiado com sucesso!","success");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        showToast("Erro ao copiar para a área de transferência.","error");
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
        showToast("Copiado com sucesso!","success");
    }).catch(err => {
        console.error("Erro ao copiar: ", err);
        showToast("Erro ao copiar para a área de transferência.","error");
    });
})

saveBtn.addEventListener('click', async () => {
	return //disabled
    // tratamento de dados
    if(!fr_desc || !fr_analise || !fr_Resol){
        console.log("sem dados");
        return;
    }

    // Valores padrão caso a IA falhe
    let type = "Outros";
    let subtype = "Sem sinal";
    let aiColor = "#dd8833"; // Cor padrão caso falhe

    // IA resuming (Groq API via CORS Proxy para GitHub Pages)
    try {
        const GROQ_API_KEY = "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"; 
        
        // URL da API do Groq codificada para passar pelo proxy CORS
        const targetUrl = "https://api.groq.com/openai/v1/chat/completions";
        const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(targetUrl);

        const response = await fetch(proxyUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", // Usando um modelo suportado e rápido da Groq
                messages: [
                    {
                        role: "system",
                        content: `És um resumidor de textos para assistente técnico de telecomunicações. 
							Analisa a descrição e analise da avaria e devolve estritamente um objeto JSON com três chaves: 
							'type' (resumo curto do problema, ex: 'sem serviços', 'sem tv', 'sem voip', etc.), 
							'subtype' (diagnóstico curto, ex: 'sem sinal', 'av incorreto', 'n recebe chamadas', etc.) e 
							'color' em Exadecimal (#dd8833).`
                    },
                    {
                        role: "user",
                        content: `descrição: ${fr_desc.value}, analise: ${fr_analise.value}`
                    }
                ],
                response_format: { type: "json_object" },
                temperature: 0.1 
            })
        });

        const data = await response.json();
        console.log("data", data);
        
        if (data.choices && data.choices[0]) {
            const aiResult = JSON.parse(data.choices[0].message.content);
            type = aiResult.type || type;
            subtype = aiResult.subtype || subtype;
            if (aiResult.color) aiColor = aiResult.color;
        }

    } catch (error) {
        console.error("Erro ao processar resumo com IA:", error);
        // Fallback básico caso a API falhe
        type = "Análise Manual";
        subtype = "Verificar descrição";
    }

    const noteId = await generateUniqueId();
    const dar = {
        d: fr_desc.value,
        a: fr_analise.value,
        r: fr_Resol.value,
    };
    
    if (window.firebaseTMA) {
        window.firebaseTMA.saveNoteFromUI(aiColor, type, subtype, dar, noteId);
    }

    loadSaveList(true);
});

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

    console.log("data:", notas);
    
    notas.forEach((nota) => {
        let card = document.createElement("div");
        card.classList.add("bridge-item");
        
        // Se precisares de guardar os dados no elemento, podes usar dataset
        card.dataset.id = nota.id;
        card.value = `D: ${nota.dar.d}\nA: ${nota.dar.a}\nR: ${nota.dar.r}`;
        card.setAttribute("data-status", "no-signal");
        
        card.innerHTML = `
            <span class="bridge-title">${nota.type}</span>
            <span class="bridge-desc">${nota.subtype}</span>
        `;

        // Adicionar o evento de clique corretamente com listener
        card.addEventListener("click", () => {
            console.log("clicado no card", nota);
            // Podes colocar aqui a lógica que tinhas planeada para o clique
        });

        save_list.append(card);
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

/**
 * Exibe um alerta dinâmico (Toast).
 * 
 * @param {string} message - Mensagem a ser exibida.
 * @param {string} type - Tipo de alerta: 'success', 'error', 'warning', 'info' (Padrão: 'info').
 * @param {number} duration - Tempo em milissegundos antes de desaparecer (Padrão: 4000ms / 4s).
 */
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Cria o elemento do toast
  const toast = document.createElement('div');
  toast.classList.add('toast', type);

  // Conteúdo HTML do alerta com botão de fechar (×)
  toast.innerHTML = `
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Fechar">&times;</button>
  `;

  // Função interna para fechar com animação
  const removeToast = () => {
    if (toast.classList.contains('hide')) return; // Evita correr duas vezes
    toast.classList.add('hide');
    
    // Espera a animação de saída (300ms) terminar antes de remover do DOM
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  };

  // Fecha ao clicar no botão 'x'
  toast.querySelector('.toast-close').addEventListener('click', (e) => {
    e.stopPropagation();
    removeToast();
  });

  // Temporizador para fechar automaticamente
  const autoCloseTimeout = setTimeout(removeToast, duration);

  // Opcional: Pausa o temporizador quando o rato está por cima (hover)
  toast.addEventListener('mouseenter', () => clearTimeout(autoCloseTimeout));
  toast.addEventListener('mouseleave', () => {
    setTimeout(removeToast, duration);
  });

  // Adiciona o toast ao contentor
  container.appendChild(toast);
}

/**
 * Adiciona o evento de clique com o botão direito (contextmenu) num elemento.
 * @param {HTMLElement|string} target - Elemento HTML ou seletor CSS (ex: '#meuInput' ou document.querySelector('#meuInput'))
 */
function enableRightClickPaste(target) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
        console.error("Elemento não encontrado.");
        return;
    }

    element.addEventListener("contextmenu", async (event) => {
        // Previne o menu de contexto padrão do navegador (menu que aparece com botão direito)
        event.preventDefault();

        try {
            // Lê o texto que está na área de transferência
            const text = await navigator.clipboard.readText();

            // Se o elemento for um campo de texto (input ou textarea)
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Insere o texto no local onde o cursor estiver posicionado
                const start = element.selectionStart;
                const end = element.selectionEnd;
                const currentValue = element.value;

                element.value = currentValue.substring(0, start) + text + currentValue.substring(end);

                // Re-posiciona o cursor após o texto colado
                element.selectionStart = element.selectionEnd = start + text.length;
            } else {
                // Se for outro tipo de elemento (como uma div editável ou texto normal)
                element.textContent += text;
            }

            console.log("Conteúdo colado com sucesso!");
        } catch (err) {
            console.error("Falha ao ler a área de transferência: ", err);
        }
    });
}

/**
 * Adiciona um evento de duplo clique para copiar texto para a área de transferência.
 * @param {HTMLElement|string} target - Elemento HTML ou seletor CSS.
 * @param {string|Function} [textToCopy] - Texto fixo a copiar, uma função que retorna o texto, ou vazio para copiar o conteúdo do elemento.
 */
function enableDoubleClickCopy(target, textToCopy) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
        console.error("Elemento não encontrado.");
        return;
    }

    element.addEventListener("dblclick", async () => {
        try {
            let content = "";

            // Determina o que deve ser copiado
            if (typeof textToCopy === 'function') {
                content = textToCopy(element);
            } else if (typeof textToCopy === 'string') {
                content = textToCopy;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                content = element.value;
            } else {
                content = element.innerText || element.textContent;
            }

            // Copia para a área de transferência
            await navigator.clipboard.writeText(content);
            console.log("Copiado com sucesso:", content);
            
            // Opcional: Feedback visual temporário (ex: mudar a cor ou dar um alerta subtil)
            element.style.outline = "2px solid #4CAF50";
            setTimeout(() => element.style.outline = "none", 400);

        } catch (err) {
            console.error("Falha ao copiar para a área de transferência: ", err);
        }
    });
}

clearBtn.addEventListener('click', async () => {
	// tratamento de dados
	fr_nserv.value = "";
	fr_name.value = "";
	fr_tel.value = "";
	fr_desc.value = "";
	fr_nif.value = "";
	fr_analise.value = "";
	fr_Resol.value = "";
	await loadSaveList(true);
})


document.addEventListener('DOMContentLoaded', async (event) => {
	localStorage.removeItem("usercode");
	enableRightClickPaste(fr_desc);
	enableRightClickPaste(fr_nserv);
	enableRightClickPaste(fr_name);
	enableRightClickPaste(fr_tel);
	enableRightClickPaste(fr_nif);
	enableRightClickPaste(fr_analise);
	enableRightClickPaste(fr_Resol);

	enableDoubleClickCopy(fr_desc);
	enableDoubleClickCopy(fr_nserv);
	enableDoubleClickCopy(fr_name);
	enableDoubleClickCopy(fr_tel);
	enableDoubleClickCopy(fr_nif);
	enableDoubleClickCopy(fr_analise);
	enableDoubleClickCopy(fr_Resol);
	await loadSaveList(true);
});
