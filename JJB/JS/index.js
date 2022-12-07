//constantes
const form = {
  clientNome: "",
  card: {
    nome: "",
    cambio: 0,
  },
  valorKz: 0,
  valorDl: 0,
  bancoEnt: "",
  bancoSai: "",
  data: "",
  user: "",
  horario: "",
  ramo: "",
};

const Cambio = {
  valor: 0,
  type: "",
};

const dt = new Date();

const User = {
  ramo: "",
  uid: "",
  cargo: "",
  nome: "",
};

const reg_Diario = {
  data: dt.getFullYear() + "-" + (dt.getUTCMonth() + 1) + "-0" + dt.getDate(),
  lucro: 0,
  numClientes: 0,
  totalDl: 0,
  totalKz: 0,
  ops: [],
  user: "",
};

// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -

function startHome() {
  createSelect(User.ramo, "card");
  createSelect(User.ramo, "bank", "in");
  createSelect(User.ramo, "bank", "out");
  // showOperations('ramo',User.ramo);
  // showOperations('user',User.uid);
  showOperations("today", User.uid);

  setTimeout(() => {
    createList("listDl", "valorDl");
    createList("listKz", "valorKz");
  }, [2000]);
}

function startColab() {
  getUsers(User.uid, User.cargo);
}

function startHistory() {
  // getHistory('ramo',User.ramo);
  // getHistory('user',User.uid);
  getHistory(User.cargo);
}

function startConfig() {
  User.ramo == "all"
    ? (showCardsTab("jj", User.cargo), showCardsTab("jb", User.cargo))
    : showCardsTab(User.ramo, User.cargo);
  showBanksTab("jj", User.cargo);
}

function startContas() {
  getContas(User.cargo);
}

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      navigate("../login.html");
      //   console.log(window.location.href);
    }
    // console.log(user.uid)
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", user.uid)
      .get()
      .then(async (userData) => {
        const dados = await userData.docs.map((doc) => doc.data());
        dados.forEach((element) => {
          User.nome = element.nome;
          User.cargo = element.cargo;
          User.ramo = element.ramo;
          User.uid = element.uid;
        });
        let path = window.location.href;

        document.querySelector("#username-show").innerHTML = User.nome;

        if (path.includes("Pages/home.html")) startHome();
        if (path.includes("Pages/colaboradores.html")) startColab();
        if (path.includes("Pages/history.html")) startHistory();
        if (path.includes("Pages/contas.html")) startContas();
        if (path.includes("Pages/config.html")) startConfig();
      });
  });
});
