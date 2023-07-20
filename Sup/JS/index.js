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

const alarme = {
  im_ticket: "",
  ci: "",
  data: "",
  horario: "",
  title: "",
  user: "",
};

const User = {
  uid: "",
  username: "",
  nome: "",
};

// - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - - - - - - - - - -

function startData() {
  showAlarmes();
}

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

          configBut();
          startData();
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
