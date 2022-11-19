class Draggable {
  constructor(elemento) {
    var that = this;
    this.elemento = elemento;
    this.posX = 0;
    this.posY = 0;
    this.top = 0;
    this.left = 0;
    this.refMouseUp = function (event) {
      that.onMouseUp(event);
    };

    this.refMouseMove = function (event) {
      that.onMouseMove(event);
    };

    this.elemento.addEventListener("mousedown", function (event) {
      that.onMouseDown(event);
    });
  }
  onMouseDown(event) {
    this.posX = event.x;
    this.posY = event.y;

    this.elemento.classList.add("arrastando");
    window.addEventListener("mousemove", this.refMouseMove);
    window.addEventListener("mouseup", this.refMouseUp);
  }
  // Arrastar
  onMouseMove(event) {
    var diffX = event.x - this.posX;
    var diffY = event.y - this.posY;
    this.elemento.style.top = this.top + diffY + "px";
    this.elemento.style.left = this.left + diffX + "px";
  }
  // Largar
  onMouseUp(event) {
    this.top = parseInt(this.elemento.style.top.replace(/\D/g, "")) || 0;
    this.left = parseInt(this.elemento.style.left.replace(/\D/g, "")) || 0;
    this.elemento.classList.remove("arrastando");
    window.removeEventListener("mousemove", this.refMouseMove);
    window.removeEventListener("mouseup", this.refMouseUp);
  }
}

const newLocal = ".arrastar";
var draggables = document.querySelectorAll(newLocal);
[].forEach.call(draggables, function (draggable, indice) {
  new Draggable(draggable);
});

function elementoArrastado(
  x,
  y,
  altura,
  largura
) /*x/y posição inicial no eixo*/ {
  let colectionsArrastados = document.querySelectorAll(".arrastar");
  colectionsArrastados.forEach((arrastado) => {
    arrastado.setAttribute(
      "style",
      `float: left;
      position: relative;
      border: 1px solid;
      width: ${largura}px;
      height: ${altura}px;
      top: ${y}px;
      left: ${x}px;
      transition: transform 0.3s linear z-index 0.3 linear;
      z-index: 1;`
    );
  });
}
