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

var check_O = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
var check_X = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
var jog_Count = 0;

psVez.innerHTML = vez;

function jogada(num) {
  if (
    document.getElementById("ps-" + num).innerHTML == "O" ||
    document.getElementById("ps-" + num).innerHTML == "X"
  ) {
  } else {
    document.getElementById("ps-" + num).innerHTML = vez;
    vez == "X" ? (check_X[num] = vez) : (check_O[num] = vez);
    jog_Count++;

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
  if (check_O[(1, 4, 7)] == nVez || check_X[(1, 4, 7)] == nVez) {
    return true;
  } else if (check_O[(2, 5, 8)] == nVez || check_X[(2, 5, 8)] == nVez) {
    return true;
  } else if (check_O[(3, 6, 9)] == nVez || check_X[(3, 6, 9)] == nVez) {
    return true;
  } else if (check_O[(1, 2, 3)] == nVez || check_X[(1, 2, 3)] == nVez) {
    return true;
  } else if (check_O[(4, 5, 6)] == nVez || check_X[(4, 5, 6)] == nVez) {
    return true;
  } else if (check_O[(7, 8, 9)] == nVez || check_X[(7, 8, 9)] == nVez) {
    return true;
  } else if (check_O[(3, 5, 7)] == nVez || check_X[(3, 5, 7)] == nVez) {
    return true;
  } else if (check_O[(1, 5, 9)] == nVez || check_X[(1, 5, 9)] == nVez) {
    return true;
  }
}

function replay() {
  for (let num = 1; num < 10; num++) {
    document.getElementById("ps-" + num).innerHTML = "";
  }
  vez = "X";
  lastJogada = "";
  psVez.innerHTML = vez;
}
