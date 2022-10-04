function salut() {}

salut();

var data = new Date();
var hora = data.getHours();
var texto = document.getElementById("salut");

if (hora > 5 && hora < 12) {
  texto.innerHTML = "Bom Dia!";
}
if (hora > 11 && hora < 18) {
  texto.innerHTML = "Boa Tarde!";
}
if (hora > 17 && hora <= 23) {
  texto.innerHTML = "Boa Noite!";
}
if (hora >= 0 && hora < 6) {
  texto.innerHTML = "Boa Noite / Madrugada!";
}
