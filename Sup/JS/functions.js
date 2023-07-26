function Reload() {
  window.location.reload();
}

function navigate(url) {
  window.location.href = url;
}

function configBut() {
  const divPai = document.querySelector("#configBut");

  divPai.innerHTML = `<i class="text-secondary">@${User.username}  </i> <a class="btn-link" onclick="logOut()">Sair</a>`;
}

// Função para colar o conteúdo da área de transferência na caixa de texto
function colarTexto(element) {
  console.log(element.id);

  navigator.clipboard
    .readText()
    .then((text) => {
      if (element.id == "im-ticket") {
        if (text.startsWith("IM")) {
          element.value = text;
        } else {
          alertar('O "IM" está incorreto!', "danger");
          return;
        }
      }
      element.value = text;
    })
    .catch((err) => {
      console.error(
        "Não foi possível ler o texto da área de transferência: ",
        err
      );
    });
}

//Recebendo os codigos de erro, traduzindo para portugues
//E criando alertas
//    code    string    //codigo de erro
//    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
function validaAuth(code) {
  switch (code) {
    case "auth/wrong-password":
      alertar("Palavra-passe errada!", "danger");
      console.log("Palavra-passe errada!");
      break;
    case "auth/invalid-email":
      alertar("Endereço de e-mail não válido!", "danger");
      console.log("Endereço de e-mail não válido!");
      break;
    case "auth/user-disabled":
      alertar("Este utilizador foi desabilitado.", "danger");
      console.log("Este utilizador foi desabilitado.");
      break;
    case "auth/user-not-found":
      alertar("Utilizador não encontrado.", "danger");
      console.log("Utilizador não encontrado.");
      break;
    case "auth/too-many-requests":
      alertar(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
        "danger"
      );
      console.log(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
      );
      break;
    case "auth/email-already-in-use":
      alertar("Já existe uma conta neste email.", "warning");
      console.log("Já existe uma conta neste email.");
      break;
    case "auth/weak-password":
      alertar(
        "Sua palavra passe é muito fraca, tente outra por favor.",
        "warning"
      );
      console.log("Sua palavra passe é muito fraca, tente outra por favor.");
      break;
    case "auth/operation-not-allowed":
      alertar("A conta neste email foi desativada.", "warning");
      console.log("A conta neste email foi desativada.");
      break;
    default:
      break;
  }
}

function alertar(message, type) {
  let Pai = document.querySelector(`#alerta`);

  console.log(Pai);
  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", `alert alert-${type} mt-3 alert-dismissible`);
  wrapper.setAttribute("role", "alert");

  let mensagem = document.createElement("div");
  mensagem.innerHTML = `${message}`;

  wrapper.appendChild(mensagem);

  let btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn-close visually-hidden");
  btn.setAttribute("data-bs-dismiss", "alert");
  btn.setAttribute("aria-label", "Close");

  wrapper.appendChild(btn);
  Pai.appendChild(wrapper);

  setTimeout(() => {
    btn.click();
  }, [5000]);
}

async function showAlarmes() {
  const divPai = document.querySelector("#show");

  console.log(User.uid);
  const dados = await firebase
    .firestore()
    .collection("alarme")
    .where("user", "==", User.uid)
    .orderBy("data", "desc")
    .orderBy("horario", "desc")
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

  console.log(dados);

  dados.forEach((element) => {
    let div = document.createElement("div");

    div = `
    <div class="row align-items-center m-4 d-flex align-items-stretch border border-dark p-2 rounded">
        <div class="col-10">
            <p><strong>CI:</strong> <span id="dados-ci">${element.ci}</span></p>
                <p><strong>IM Ticket:</strong> <span id="dados-im-ticket">${element.im_ticket}</span></p>
                <div class="row">
                    <div class="col-8 text-truncate">
                        <strong>Título:</strong> <span id="dados-title">${element.title}</span>
                    </div>
                </div>
        </div>
        <div class="col-2 text-end">
        <span class="text-secondary">${element.data} _ ${element.horario}</span><br/>
          <button title="copiar" class="btn btn-secondary btn-circle ms-auto rounded-circle" onclick="copiarParaAreaTransferencia('${element.id}')">
                <i class="">
                    <?xml version="1.0" encoding="iso-8859-1"?>

                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px"
                        viewBox="0 0 93.842 93.843" xml:space="preserve">
                        <g>
                            <path d="M74.042,11.379h-9.582v-0.693c0-1.768-1.438-3.205-3.206-3.205h-6.435V3.205C54.819,1.437,53.381,0,51.614,0H42.23
      c-1.768,0-3.206,1.438-3.206,3.205V7.48H32.59c-1.768,0-3.206,1.438-3.206,3.205v0.693h-9.582c-2.393,0-4.339,1.945-4.339,4.34
      v73.785c0,2.394,1.946,4.34,4.339,4.34h54.238c2.394,0,4.339-1.946,4.339-4.34V15.719C78.38,13.324,76.434,11.379,74.042,11.379z
       M32.617,25.336h28.61c1.709,0,3.102-1.391,3.102-3.1v-3.438h7.554l0.021,68.164l-49.939,0.021V18.801h7.554v3.436
      C29.517,23.945,30.907,25.336,32.617,25.336z" />
                        </g>
                    </svg>
                </i>
            </button>
            <button class="btn btn-danger rounded-circle" title="eliminar" onclick="deleteAlarme('${element.id}')">
                <i class="">
                    <?xml version="1.0" encoding="iso-8859-1"?>

                    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
                </i> 
            </button>
        </div>
      </div>
    `;

    divPai.innerHTML += div;
  });
}

function deleteAlarme(im) {
  firebase
    .firestore()
    .collection(`alarme`)
    .doc(im)
    .delete()
    .then(() => {
      // console.log(im);
      // alertar(`Alarme Apagado!`, "success");
      setTimeout(() => {
        Reload();
      }, [300]);
    });
}

function enviar() {
  const ciImp = document.getElementById("ci").value;
  const imImp = document.getElementById("im-ticket").value;
  const titleImp = document.getElementById("title").value;

  if (ciImp == "" || imImp == "" || titleImp == "") {
    return;
  } else {
    alarme.ci = ciImp;
    alarme.data = todayDate;
    alarme.horario =
      dt.getHours() < 10
        ? "0" + dt.getHours() + ":" + dt.getMinutes() < 10
          ? "0" + dt.getMinutes()
          : dt.getMinutes()
        : dt.getHours();
    alarme.im_ticket = imImp;
    alarme.user = User.uid;
    alarme.title = titleImp;

    firebase
      .firestore()
      .collection("alarme")
      .add(alarme)
      .then(() => {
        Reload();
      });
  }
}

// Função para copiar o conteúdo do card para a área de transferência
async function copiarParaAreaTransferencia(im) {
  const dadosCard = await firebase
    .firestore()
    .collection(`alarme`)
    .doc(im)
    .get()
    .then((docc) => {
      return docc.data();
    });

  const dadosCardText = `ci:${dadosCard.ci}\n${dadosCard.im_ticket}\nTitle:${dadosCard.title}`;

  // console.log(dadosCardText);

  navigator.clipboard
    .writeText(dadosCardText)
    .then(() => {
      alertar("Copiado!", "success");
    })
    .catch((err) => {
      alertar("Não foi possível copiar", "danger");
    });
}

// Firebase
// Firebase initialization
function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAypSg2Pz0Dcuf7pnyADEP9nYX7jp0o3wE",
    authDomain: "supervision-7cb0d.firebaseapp.com",
    projectId: "supervision-7cb0d",
    storageBucket: "supervision-7cb0d.appspot.com",
    messagingSenderId: "768957089004",
    appId: "1:768957089004:web:0a3b1b66c4092f68d7d1c9",
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// firebase.storage()

// ----------------------------- Firebase auth

function logOut() {
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.location.href.includes("index.html")) navigate("login.html");
        else navigate("login.html");
      });
  }
}

function login() {
  //Pegar valores do formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);
  //validar se nenhum dos campos está nulo
  if (email && password) {
    //Faz a requisição de login, passando o email e password como parametros
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //Caso a requisição seja bem sucedida

        // firebase.firestore().collection('users').where('uid','==',)
        alertar("Login efetuado com sucesso!", "success");

        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        // setTimeout(() => {
        //   navigate("../home.html");
        // }, [1000]);
      })
      .catch((error) => {
        //Caso a requisição dê erro

        //Reseta campo do formulario
        document.getElementById("password").value = "";

        //Chamada da função validaAuth
        validaAuth(error.code);
      });
  } else {
    //se email nulo mostra o allerta
    email ? "" : alertar("O campo email é obrigatório", "warning");
    //se password nula mostra o allerta
    password ? "" : alertar("O campo palavra passe é obrigatório", "warning");
  }
}
