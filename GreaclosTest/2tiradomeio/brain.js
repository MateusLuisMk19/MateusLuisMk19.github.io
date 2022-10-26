var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pc_Tam = 60;
var pc1_1 = [15, -5];
var pc1_2 = [458, -5];
var pc1_3 = [900, -5];
var pc2_1 = [15, 440];
var pc2_2 = [458, 440];
var pc2_3 = [900, 440];
var d_x = 0;
var d_y = 0;
/* 
[15, -5]        [458, -5]       [900, -5] 

[15, 220]       [458, 220]      [900, 220]

[15, 440]       [458, 440]      [900, 440]
 */

var background = new Image(); // Create new img element
background.src = "./media/field.png";
var pc1 = new Image(); // Create new img element
pc1.src = "./media/tccm-pc-amarela.png";
var pc2 = new Image(); // Create new img element
pc2.src = "./media/tccm-pc-verde.png";

pc1.addEventListener("click", () => {
  console.log("ai");
});

function loop() {
  window.requestAnimationFrame(loop, canvas);

  update();
  render();
}

function update() {
  ctx.clearRect(0, 0, 1000, 520);
  pc2_3[0] += d_x;
  pc2_3[1] += d_y;

  if (pc2_3[0] == 900 && pc2_3[1] == 440) {
    d_x = 0;
    d_y = -1;
  }
  if (pc2_3[0] == 900 && pc2_3[1] == -5) {
    d_x = -1;
    d_y = 0;
  }
  if (pc2_3[0] == 15 && pc2_3[1] == -5) {
    d_x = 0;
    d_y = 1;
  }
  if (pc2_3[0] == 15 && pc2_3[1] == 440) {
    d_x = 1;
    d_y = 0;
  }
  if (pc2_3[0] == 458 && pc2_3[1] == 440) {
    d_x = 0;
    d_y = -1;
  }
  if (pc2_3[0] == 458 && pc2_3[1] == 220) {
    d_x = 2;
    d_y = 1;
  }
}

function render() {
  ctx.drawImage(background, -10, -10, 1000, 520);

  //Peças cima
  ctx.drawImage(pc1, pc1_1[0], pc1_1[1], pc_Tam, pc_Tam);
  ctx.drawImage(pc1, pc1_2[0], pc1_2[1], pc_Tam, pc_Tam);
  ctx.drawImage(pc1, pc1_3[0], pc1_3[1], pc_Tam, pc_Tam);

  //Peças baixo
  ctx.drawImage(pc2, pc2_1[0], pc2_1[1], pc_Tam, pc_Tam);
  ctx.drawImage(pc2, pc2_2[0], pc2_2[1], pc_Tam, pc_Tam);
  ctx.drawImage(pc2, pc2_3[0], pc2_3[1], pc_Tam, pc_Tam);
}

loop();
