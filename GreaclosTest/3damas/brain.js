$(document).ready(() => {
  paintField(1, 8);
  startPieces(1, 24);
});

function paintField(ps_Ini, ps_Fin) {
  for (let num = ps_Ini; num <= ps_Fin; num += 2) {
    $(`#ps-${num}`).css({
      backgroundColor: "#000",
      // color: "#000",
    });
  }
  if (ps_Ini == 1 || ps_Ini == 17 || ps_Ini == 33 || ps_Ini == 49) {
    paintField(ps_Fin + 2, ps_Fin + 8);
  } else if (ps_Ini == 10 || ps_Ini == 26 || ps_Ini == 42 || ps_Ini == 58) {
    paintField(ps_Fin + 1, ps_Fin + 8);
  }
}

let _fin = 8;

function startPieces(ps_Ini, ps_Fin) {
  // alert("Oi");
  console.log(ps_Ini, ps_Fin, _fin);
  if (_fin >= ps_Fin) return;
  for (let num = ps_Ini; num <= _fin; num += 2) {
    $(`#ps-${num}`).css({
      backgroundImage: "linear-gradient(360deg, #7b3100, rgb(146, 89, 33))",
      color: "#000",
    });
  }
  if (ps_Ini == 1 || ps_Ini == 17) {
    startPieces(ps_Ini + 9, (_fin += 8));
  } else if (ps_Ini == 10) {
    startPieces(ps_Ini + 7, (_fin += 8));
  }
}
