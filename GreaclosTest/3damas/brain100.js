var red = 0;
var green = 0;
var blue = 0;
let shadow = "#000";

$(document).ready(() => {
  paintField();
});

function paintField() {
  for (let numLine = 10; numLine >= 1; numLine--) {
    if (numLine % 2 == 0) {
      for (let numPs = 1; numPs <= 10; numPs += 2) {
        $(`#line${numLine} .ps-${numPs}`).css({
          backgroundImage: `linear-gradient(45deg, ${shadow}, rgb(${red}, ${green}, ${blue}))`,
        });
      }
    } else {
      for (let numPs = 2; numPs <= 10; numPs += 2) {
        $(`#line${numLine} .ps-${numPs}`).css({
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
  shadow == "#000" ? (shadow = "#fff") : (shadow = "#000");
  paintField();
}
