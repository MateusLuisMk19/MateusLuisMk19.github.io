function salut() {
  var data = new Date();
  var hora = data.getHours();
  var texto = document.getElementById("salut");

  if (hora > 5 && hora < 12) {
    texto.innerHTML = "Bom Dia! Que o dia seja bom.";
  }
  if (hora > 11 && hora < 18) {
    texto.innerHTML = "Boa Tarde! Continuação de bom dia.";
  }
  if (hora > 17 && hora <= 23) {
    texto.innerHTML = "Boa Noite! Bom descanso pra quando for dormir.";
  }
  if (hora >= 0 && hora < 6) {
    texto.innerHTML =
      "Boa Noite / Madrugada! Vai logo dormir, e tenha um bom descanso.";
  }
}

salut();

// document.getElementById("myForm").onsubmit(alert("Submited"));

function logar() {
  var user = document.getElementById("user").value;
  var pass = document.getElementById("pssword").value;

  var colec = users;
  var colecLength = colec.length;

  for (var i = 0; i < colecLength; i++) {
    if (colec[i].name == user && colec[i].pass == pass) {
      localStorage.setItem("username", user);
      localStorage.setItem("password", pass);
      alert("User existente");
    }
  }
}
