const dt = new Date();
const todayDate =
  dt.getFullYear() +
  "-" +
  (dt.getUTCMonth() + 1 < 10
    ? "0" + (dt.getUTCMonth() + 1)
    : "-" + dt.getUTCMonth() + 1) +
  (dt.getDate() < 10 ? "-0" + dt.getDate() : "-" + dt.getDate());

let path = window.location.href;
//constantes

const reg_form_Aux = {
  img_fr: "",
  img_vr: "",
  bi_num: "",
  iban: "",
  nome: "",
};

const Cambio = {
  valor: 0,
  type: "",
};

const User = {
  uid: "",
  username: "",
  nome: "",
};

const Client = {
  data: "",
  ramo: "",
  nome: "",
  sobrenome: "",
  numSolicitacao: 0,
  bi: {
    img: {
      front: "",
      verse: "",
    },
    num: "",
    verificado: true,
  },
  iban: [],
  total_pago: {
    dolar: 0,
    kz: 0,
  },
};

// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -

/* function startHome() {
  const labelJJ = document.querySelector(`#lb-jj`);
  const labelJB = document.querySelector(`#lb-jb`);
  const inputJJ = document.querySelector(`#inp-jj`);
  const inputJB = document.querySelector(`#inp-jb`);

  if (User.ramo == "all") {
    inputJB.setAttribute("checked", "");
    createSelect("jb", "card");
    createSelect("jb", "bank", "in");
    createSelect("jb", "bank", "out");
    document.querySelectorAll(`input[name="options-ramo"]`).forEach((e) => {
      e.addEventListener("click", (b) => {
        document.querySelector(`#seletBanks`).innerHTML = "";
        document.querySelector(`#selectCard`).innerHTML = "";
        console.log(b.target);
        createSelect(b.target.value, "card");
        createSelect(b.target.value, "bank", "in");
        createSelect(b.target.value, "bank", "out");
      });
    });
  } else if (User.ramo == "jj") {
    labelJB.classList.add("visually-hidden");
    inputJJ.setAttribute("checked", "");

    createSelect("jj", "card");
    createSelect("jj", "bank", "in");
    createSelect("jj", "bank", "out");
  } else if (User.ramo == "jb") {
    console.log(labelJJ);
    labelJJ.classList.add("visually-hidden");
    inputJB.setAttribute("checked", "");

    createSelect("jb", "card");
    createSelect("jb", "bank", "in");
    createSelect("jb", "bank", "out");
  }

  setTimeout(() => {
    createList("listDl", "valorDl");
    createList("listKz", "valorKz");
    // console.log(inputJB);
  }, [2000]);

  // showOperations('ramo',User.ramo);
  // showOperations('user',User.uid);
  showOperations("today", User.uid);
}

function startClients() {
  getClients();
  const labelJJ = document.querySelector(`#lb-jj`);
  const labelJB = document.querySelector(`#lb-jb`);
  const inputJJ = document.querySelector(`#inp-jj`);
  const inputJB = document.querySelector(`#inp-jb`);

  if (User.ramo == "all") {
    inputJB.setAttribute("checked", "");

    document.querySelectorAll(`input[name="options-ramo"]`).forEach((e) => {
      e.addEventListener("click", (b) => {
        console.log(b.target);
      });
    });
  } else if (User.ramo == "jj") {
    labelJB.classList.add("visually-hidden");
    inputJJ.setAttribute("checked", "");
  } else if (User.ramo == "jb") {
    console.log(labelJJ);
    labelJJ.classList.add("visually-hidden");
    inputJB.setAttribute("checked", "");
  }

  // showOperations('ramo',User.ramo);
  // showOperations('user',User.uid);
  showOperations("today", User.uid);
}

function startColab() {
  getUsers(User.uid, User.cargo);
} */

document.addEventListener("DOMContentLoaded", async () => {
  initFirebase();

  // !path.includes("login.html") ? configBut() : "";

  await firebase.auth().onAuthStateChanged(async (user) => {
    if (!user && !path.includes("login.html")) {
      if (path.includes("index.html")) navigate("login.html");
      else navigate("login.html");
      //   console.log(window.location.href);
    }
    console.log(user.uid);
    if (path.includes("login.html")) authLogin();
    else {
      await firebase
        .firestore()
        .collection("user")
        .where("uid", "==", user.uid)
        .get()
        .then(async (dat) => {
          const dados = await dat.docs.map((doc) => doc.data())[0];
          
          User.nome = dados.nome;
          User.username = dados.username;
          User.uid = dados.uid;
          
          console.log(User);

          configBut()
        })
        .catch((error) => console.log(error));
      }
  });
});

function authLogin() {
  // console.log("Login in");
  addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      // console.log("clicou");
      document.getElementById("entrar").click();
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigate("index.html");
    }
  });
}
