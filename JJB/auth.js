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
        alertar("Login efetuado com sucesso!", "success");

        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        setTimeout(() => {
          navigate("Pages/home.html");
        }, [1500]);
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

async function cadastrar() {
  const new_User = {
    nome: document.getElementById("nome").value,
    cargo: document.getElementById("cargo").value,
    ramo: document.getElementById("ramo").value,
    uid: "",
  };

  email = document.getElementById("email").value;
  email_conf = document.getElementById("emailCf").value;
  password = "jjb2021_2022";
  
  if (email != email_conf) {
    alertar("A confirmação do email não confere", "danger");
  } else if (!nome || !cargo || !ramo || !email) {
    alertar("Preencha todos os campos", "warning");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((_new) => {
        loadingBtn('#cadastrar')
        new_User.uid = _new.user.uid;
        console.log(new_User);

        //
        firebase
          .firestore()
          .collection("users")
          .add(new_User)
          .then(() => {
            //

            alertar("conta criada com sucesso", "success");
            // console.log(_new.user.uid);
            setTimeout(() => {
              alertar(
                "Enviando mensagem para o email do proprietario...",
                "success"
              );
              recoverPassword(email);
            }, [2000]);
            setTimeout(() => {
              logOut();
              navigate("Pages/home.html");
            }, [8000]);
          });
      })
      .catch((error) => {
        validaAuth(error.code, "Registar");
      });
  }
}

//-------------------------------------
addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // console.log("clicou")
    document.getElementById("entrar").click();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.href == "login.html") {
        navigate("Pages/home.html");
      }
      //   console.log(window.location.href);
    }
  });
});

function recoverPassword(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alertar(
        "Foi enviado para o email " +
          email +
          " um link para definir a password. Deve verifique o Spam",
        "success"
      );
    })
    .catch((error) => {
      validaAuth(error.code, "Entrar");
    });
}


