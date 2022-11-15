var red = 0,
  green = 0,
  blue = 0;
let shadow = "#000";
const mesaDAMA = document.querySelector("#mesa64");
var mesa = [];
var isDama = false;
var isOp = false;
var vez = "blue";

$(document).ready(() => {
  createMesa();
  toPlay();
});

function createMesa() {
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++) {
      let quadrado = document.createElement("div");
      quadrado.setAttribute("id", `i${line}j${col}`);
      quadrado.setAttribute("class", "quadrado");

      if (line % 2 == 0) {
        if (col % 2 == 0) {
          (quadrado.style.backgroundColor = `white`),
            (quadrado.style.color = "gray");
        } else {
          (quadrado.setAttribute("class", "quadrado play"),
          (quadrado.style.backgroundColor = `black`)),
            (quadrado.style.color = "gray");
        }
      } else {
        if (col % 2 == 0) {
          (quadrado.setAttribute("class", "quadrado play"),
          (quadrado.style.backgroundColor = `black`)),
            (quadrado.style.color = "gray");
        } else {
          (quadrado.style.backgroundColor = `white`),
            (quadrado.style.color = "gray");
        }
      }
      mesaDAMA.appendChild(quadrado);

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
          makePiece(i, j, num++, "red");
        }
      } else {
        if (j % 2 == 0) {
          makePiece(i, j, num++, "red");
        }
      }
    }
  }
  num = 0;

  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          ("");
        } else {
          makePiece(i, j, num++, "blue");
        }
      } else {
        if (j % 2 == 0) {
          makePiece(i, j, num++, "blue");
        }
      }
    }
  }

  function makePiece(i, j, num, x) {
    let piece = document.createElement("div");
    piece.setAttribute("id", `piece-${num}-${x}`);
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

function toPlay() {
  document.querySelectorAll("div.play").forEach((space) => {
    space.addEventListener("click", () => {
      if (space.children.length != 0) {
        let id = space.id;
        let childClass = space.lastChild.classList.toString();

        if (childClass.includes("blue") && vez == "blue") {
          if (childClass.includes("dama")) {
            alert("Blue");
          } else {
            let i = parseInt(id.slice(1, 2));
            let j = parseInt(id.slice(3, 4));

            //Check

            let op1;
            let op2;

            const reload = () => {
              op1 = document.getElementById(`i${i - 1}j${j - 1}`);
              op2 = document.getElementById(`i${i - 1}j${j + 1}`);
            };
            reload();

            console.log(space.lastChild);
            if (op1) {
              if (op1.children.length == 0 || op1.lastChild == null) {
                opToPlay(op1);
                isOp = true;

                // setTimeout(() => {

                // }, [1000]);
              }
            }

            if (op2) {
              if (op2.children.length == 0 || op2.lastChild == null) {
                opToPlay(op2);

                // setTimeout(() => {

                // }, [1000]);
              }
            }
            console.log(space);
            step([op1, op2], space);
          }
        }
        if (childClass.includes("red")) {
          alert("Red");
        }
      }
    });
  });
}

function opToPlay(op) {
  op.style.backgroundImage = `linear-gradient(45deg, #FFFF80, rgb(255,240,37))`;
  op.style.boxShadow = "2px 2px 8px 1px gray";
  op.style.transform = "scale(1.04)";

  setTimeout(() => {
    op.style.backgroundImage = ``;
    op.style.boxShadow = "";
    op.style.transform = "scale(1)";
  }, [3000]);
}

function step(op, space) {
  let Okay = op;

  if (space) {
    Okay.forEach((Ok) => {
      Ok.addEventListener("click", () => {
        console.log(isOp);
        if (isOp) {
          isOp = false;
          const vId = space.lastChild.id;
          console.log(isOp);

          let piece = document.createElement("div");
          piece.setAttribute("id", `${vId}`);
          piece.setAttribute("class", `piece blue`);

          space.removeChild(space.lastChild);
          Ok.appendChild(piece);

          console.log("op1", Ok);

          // vez = "red";
          Ok = "";
          console.log(isOp);
        }
      });
    });
  }
}
