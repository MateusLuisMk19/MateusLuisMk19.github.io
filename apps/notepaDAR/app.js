// Referências do DOM
const usercode = document.getElementById("usercode"),
  front = document.getElementById('front'),
  back = document.getElementById('back'),
  divBtns = document.getElementById("divBtns");


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

function confirmarLogin() {
    usercode.classList.add("disabled");
    localStorage.setItem("usercode", usercode.value.trim());
    front.style.display = "none";
    front.disabled = false;
    
}

document.addEventListener('DOMContentLoaded', (event) => {
	localStorage.removeItem("usercode");
});
