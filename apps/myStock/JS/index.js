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

  reloadTheme();
  // !path.includes("login.html") ? configBut() : "";

  await firebase.auth().onAuthStateChanged(async (user) => {
    if (!user && !path.includes("login.html")) {
      if (path.includes("index.html")) navigate("login.html");
      else navigate("login.html");
      //   console.log(window.location.href);
    }
    // console.log(user.uid);
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

          // console.log(User);

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

async function reloadTheme() {
  await firebase
    .firestore()
    .collection("site_config")
    .doc("fZ6xWWL1xTDLqtUDRWof")
    .get()
    .then((snapshot) => {
      let body = document.getElementById("body");
      let check = document.getElementById("checkDark");
      let navBar = document.getElementById("navbar");
      let cardForm = document.getElementById("card-form");
      let ci = document.getElementById("ci")
      let im_ticket = document.getElementById("im-ticket")
      let title = document.getElementById("title")

      // console.log(snapshot.data().dark);

      function changeClass(element, newC, oldC) {
        element.classList.contains(oldC) ? element.classList.remove(oldC) : "";
        element.classList.add(newC);
      }

      if (snapshot.data().dark) {
        body.setAttribute("style", "color: beige;");

        changeClass(body, "bg-dark", "bg-light");

        changeClass(cardForm, "bg-dark", "bg-light");

        changeClass(ci, "bg-dark", "bg-light");
        changeClass(ci, "text-light", "text-dark");

        changeClass(im_ticket, "bg-dark", "bg-light");
        changeClass(im_ticket, "text-light", "text-dark");

        changeClass(title, "bg-dark", "bg-light");
        changeClass(title, "text-light", "text-dark");

        check.setAttribute("checked", "");
        check.classList.add("bg-info")

        changeClass(navBar, "navbar-dark", "navbar-light");

        changeClass(navBar, "bg-dark", "bg-light");
      } else {
        body.removeAttribute("style");

        changeClass(body, "bg-light", "bg-dark");

        changeClass(cardForm, "bg-light", "bg-dark");

        changeClass(ci, "bg-white", "bg-dark");
        changeClass(ci, "text-dark", "text-light");

        changeClass(im_ticket, "bg-white", "bg-dark");
        changeClass(im_ticket, "text-dark", "text-light");

        changeClass(title, "bg-white", "bg-dark");
        changeClass(title, "text-dark", "text-light");

        check.removeAttribute("checked");
        check.classList.remove("bg-info")

        changeClass(navBar, "navbar-light", "navbar-dark");

        changeClass(navBar, "bg-light", "bg-dark");
      }
    });
}
