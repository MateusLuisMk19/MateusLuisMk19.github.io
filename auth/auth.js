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


$(document).ready( function() {
	usersDB[0].currentPlay.ultimaJogada="Sei lá"
  usersDB.setItem
	console.log(usersDB)
	
})