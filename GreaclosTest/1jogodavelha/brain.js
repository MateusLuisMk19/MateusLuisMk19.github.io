var ps1 = document.getElementById("ps-1");
var ps2 = document.getElementById("ps-2");
var ps3 = document.getElementById("ps-3");
var ps4 = document.getElementById("ps-4");
var ps5 = document.getElementById("ps-5");
var ps6 = document.getElementById("ps-6");
var ps7 = document.getElementById("ps-7");
var ps8 = document.getElementById("ps-8");
var ps9 = document.getElementById("ps-9");
var vez = "X";
var lastJogada = "";
var psVez = document.getElementById("ps-vez");

psVez.innerHTML = vez;

function jogada(num) {
  if (
    document.getElementById("ps-" + num).innerHTML == "O" ||
    document.getElementById("ps-" + num).innerHTML == "X"
  ) {
  } else {
    document.getElementById("ps-" + num).innerHTML = vez;
    whatIs(vez);
    lastJogada = vez;
    mudarVez();
  }
}

function mudarVez() {
  vez == "X" ? (vez = "O") : (vez = "X");
  if (vez == "X" && lastJogada == "X") {
    vez = "O";
  } else if (vez == "O" && lastJogada == "O") {
    vez = "X";
  }
  psVez.innerHTML = vez;
}

function whatIs(v) {
  if (isWin(v)) {
    alert(v + " Venceu!");
  }
}

function isWin(nVez) {
  if (ps1 == nVez && ps4 == nVez && ps7 == nVez) {
    return true;
  } else if (ps2 == nVez && ps5 == nVez && ps8 == nVez) {
    return true;
  } else if (ps3 == nVez && ps6 == nVez && ps9 == nVez) {
    return true;
  } else if (ps1 == nVez && ps2 == nVez && ps3 == nVez) {
    return true;
  } else if (ps4 == nVez && ps5 == nVez && ps6 == nVez) {
    return true;
  } else if (ps7 == nVez && ps8 == nVez && ps9 == nVez) {
    return true;
  } else if (ps3 == nVez && ps5 == nVez && ps7 == nVez) {
    return true;
  } else if (ps1 == nVez && ps5 == nVez && ps9 == nVez) {
    return true;
  }
}
