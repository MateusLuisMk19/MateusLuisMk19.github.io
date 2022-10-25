/* var ps1 = $("#ps-1");
var ps2 = $("#ps-2");
var ps3 = $("#ps-3");
var ps4 = $("#ps-4");
var ps5 = $("#ps-5");
var ps6 = $("#ps-6");
var ps7 = $("#ps-7").css({
  backgroundColor: "#ffe",
  borderLeft: "5px solid #ccc",
});
var ps8 = $("#ps-8").html("80");
var ps9 = $(`#ps-9`).css("color", "blue");*/

//Funções
function replay() {
  for (let num = 1; num < 10; num++) {
    $(`#ps-${num}`).html("");
  }

  vez = "X";
  lastJogada = "";
  psVez.html(vez);
  jog_Count = 0;
}

function mudarVez() {
  vez == "X" ? (vez = "O") : (vez = "X");
  if (vez == "X" && lastJogada == "X") {
    vez = "O";
  } else if (vez == "O" && lastJogada == "O") {
    vez = "X";
  }
  psVez.html(vez);
}

function isWin(nVez) {
  if (
    (check_O[1] == nVez && check_O[4] == nVez && check_O[7] == nVez) ||
    (check_X[1] == nVez && check_X[4] == nVez && check_X[7] == nVez)
  ) {
    line_Win = [1, 4, 7];
    console.log("condição 1");
    return true;
  } else if (
    (check_O[2] == nVez && check_O[5] == nVez && check_O[8] == nVez) ||
    (check_X[2] == nVez && check_X[5] == nVez && check_X[8] == nVez)
  ) {
    line_Win = [2, 5, 8];
    console.log("condição 2");
    return true;
  } else if (
    (check_O[3] == nVez && check_O[6] == nVez && check_O[9] == nVez) ||
    (check_X[3] == nVez && check_X[6] == nVez && check_X[9] == nVez)
  ) {
    line_Win = [3, 6, 9];
    console.log("condição 3");
    return true;
  } else if (
    (check_O[1] == nVez && check_O[2] == nVez && check_O[3] == nVez) ||
    (check_X[1] == nVez && check_X[2] == nVez && check_X[3] == nVez)
  ) {
    line_Win = [1, 2, 3];
    console.log("condição 4");
    return true;
  } else if (
    (check_O[4] == nVez && check_O[5] == nVez && check_O[6] == nVez) ||
    (check_X[4] == nVez && check_X[5] == nVez && check_X[6] == nVez)
  ) {
    line_Win = [4, 5, 6];
    console.log("condição 5");
    return true;
  } else if (
    (check_O[7] == nVez && check_O[8] == nVez && check_O[9] == nVez) ||
    (check_X[7] == nVez && check_X[8] == nVez && check_X[9] == nVez)
  ) {
    line_Win = [7, 8, 9];
    console.log("condição 6");
    return true;
  } else if (
    (check_O[3] == nVez && check_O[5] == nVez && check_O[7] == nVez) ||
    (check_X[3] == nVez && check_X[5] == nVez && check_X[7] == nVez)
  ) {
    line_Win = [3, 5, 7];
    console.log("condição 7");
    return true;
  } else if (
    (check_O[1] == nVez && check_O[5] == nVez && check_O[9] == nVez) ||
    (check_X[1] == nVez && check_X[5] == nVez && check_X[9] == nVez)
  ) {
    line_Win = [1, 5, 9];
    console.log("condição 8");
    return true;
  }
}

function whatIs(v) {
  if (isWin(v)) {
    // alert(v + " Venceu!");
    line_Win.forEach((position) => {
      $(`#ps-${position}`).css({
        backgroundColor: "#97f5a4",
        transform: "scale(1.15)",
      });
    });
  } else if (jog_Count >= 9) {
    alert("Ninguém venceu");
    replay();
  }
}

function jogada(num) {
  if ($(`#ps-${num}`).html == "O" || $(`#ps-${num}`).html == "X") {
  } else {
    $(`#ps-${num}`).html(vez);
    vez == "X" ? (check_X[num] = vez) : (check_O[num] = vez);
    jog_Count++;

    whatIs(vez);
    lastJogada = vez;
    mudarVez();
  }
}

//Variaveis
var vez = "X";
var check_O = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
var check_X = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];
var jog_Count = 0;
var line_Win = [0, 0, 0];
var lastJogada = "";
const on = false;

var psVez = $("#ps-vez").html(vez);

//Display

function começarJogo() {
  $("#Intro").hide();
  $("#Jogo").show();
}

$(document).ready(function () {
  $("#Jogo").hide();
});
