var red = 0;
var green = 0;
var blue = 0;
let shadow = "#000";
const mesaDAMA = document.querySelector("#mesa64");
var mesa = [];

$(document).ready(() => {
  createMesa();
});

function createMesa() {
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++) {
      let quadrado = document.createElement("div");
      quadrado.setAttribute("id", `i${line}j${col}`);
      quadrado.setAttribute("class", "quadrado");
      mesaDAMA.appendChild(quadrado);

      if (line % 2 == 0) {
        if (col % 2 == 0) {
          (quadrado.style.backgroundColor = `white`),
            (quadrado.style.color = "gray");
        } else {
          (quadrado.style.backgroundColor = `black`),
            (quadrado.style.color = "gray");
        }
      } else {
        if (col % 2 == 0) {
          (quadrado.style.backgroundColor = `black`),
            (quadrado.style.color = "gray");
        } else {
          (quadrado.style.backgroundColor = `white`),
            (quadrado.style.color = "gray");
        }
      }

      // quadrado.innerHTML = `i${line}j${col}`;
    }
  }
  paintField();
  createPieces();
}

function createPieces() {
  var num = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 8; j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ("");
        } else {
          makePiece(i, j, num, "red");
        }
      } else {
        if (j % 2 == 0) {
          makePiece(i, j, num, "red");
        }
      }
    }
  }

  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ("");
        } else {
          makePiece(i, j, num, "blue");
        }
      } else {
        if (j % 2 == 0) {
          makePiece(i, j, num, "blue");
        }
      }
    }
  }

  function makePiece(i, j, num, x) {
    let piece = document.createElement("div");
    piece.setAttribute("id", `piece${num++}`);
    piece.setAttribute("class", `piece ${x}`);
    let quadrado = document.querySelector(`#i${i}j${j}`);
    quadrado.innerHTML = "";
    quadrado.appendChild(piece);
  }
}

function clearMap(clear) {
  if (clear) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let quadrado = document.querySelector(`#i${i}j${j}`);
        quadrado.innerHTML = "";
      }
    }
  } else {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            let quadrado = document.querySelector(`#i${i}j${j}`);
            quadrado.innerHTML == `i${i}j${j}`
              ? (quadrado.innerHTML = "")
              : (quadrado.innerHTML = `i${i}j${j}`);
          } else {
            ("");
          }
        } else {
          if (j % 2 == 0) {
            ("");
          } else {
            let quadrado = document.querySelector(`#i${i}j${j}`);
            quadrado.innerHTML == `i${i}j${j}`
              ? (quadrado.innerHTML = "")
              : (quadrado.innerHTML = `i${i}j${j}`);
          }
        }
      }
    }
  }
} // false: mapeia os quadrados brancos, true: limpa todo tabuleiro

function paintField() {
  for (let numLine = 0; numLine < 8; numLine++) {
    if (numLine % 2 == 0) {
      for (let numPs = 1; numPs < 8; numPs += 2) {
        $(`#i${numLine}j${numPs}`).css({
          backgroundImage: `linear-gradient(45deg, ${shadow}, rgb(${red}, ${green}, ${blue}))`,
        });
      }
    } else {
      for (let numPs = 0; numPs < 8; numPs += 2) {
        $(`#i${numLine}j${numPs}`).css({
          backgroundImage: `linear-gradient(45deg, ${shadow}, rgb(${red}, ${green}, ${blue}))`,
        });
      }
    }
  }
}

function preview(value, ident) {
  switch (ident) {
    case "red":
      red = value;
      break;
    case "blue":
      blue = value;
      break;
    case "green":
      green = value;
      break;
    default:
      break;
  }

  console.log(red, green, blue);
  paintField();
}

function changeShadow() {
  shadow == "#000" ? (shadow = "#aaa") : (shadow = "#000");
  paintField();
}

