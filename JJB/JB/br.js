const form = {
  nome: "",
  typeCard: "",
  valorKz: 0,
  valorDl: 0,
  bankEnt: "",
  bankSai: "",
};
var variavel;
let cambio;

function escolha() {
  let another;
  let str = "";
  let valor = "";
  let card = document.getElementById("typeCard").value;

  if (document.getElementById("valorKz").value != (null || "")) {
    another = document.getElementById("valorDl");
    valor = parseInt(document.getElementById("valorKz").value) / cambio;
    str = valor.toString();
    console.log(str);
    for (let i = 0; i < str.length; i++) {
      console.log(str[i]);

      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }

    // another.setAttribute("disabled", "");
  } else if (document.getElementById("valorDl").value != (null || "")) {
    another = document.getElementById("valorKz");
    valor = parseInt(document.getElementById("valorDl").value) * cambio;
    str = valor.toString();

    for (let i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }
    // another.setAttribute("disabled", "");
  } else {
  }
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("typeCard").value = "";
  document.getElementById("valorKz").value = "";
  document.getElementById("valorDl").value = "";
  document.getElementById("bankEnt").value = "";
  document.getElementById("bankSai").value = "";
}

function atualizar() {
  var iavel = StorageM("", "getData");
  if (iavel) {
    for (let i = 0; i < iavel.length; i++) {
      createLines(iavel[i]);
    }
  }
}

function createLines(names) {
  let Pai = document.getElementById("lines");
  variavel = StorageM(names, "get");
  console.log(variavel);

  let tr = document.createElement("tr");

  let div = document.createElement("div");
  div.setAttribute("class", "col-sm");

  let div2 = document.createElement("div");
  div2.setAttribute("class", "col-sm");

  let td = [];
  for (let i = 0; i < 5; i++) {
    td[i] = document.createElement("td");
  }

  for (let i = 0; i < 4; i++) {
    td[i].innerHTML = variavel[i];
  }

  div.innerHTML = variavel[4];
  div2.innerHTML = variavel[5];

  td[4].setAttribute("class", "row");
  td[4].setAttribute("colspan", "2");
  td[4].appendChild(div);
  td[4].appendChild(div2);

  tr.appendChild(td[0]);
  tr.appendChild(td[1]);
  tr.appendChild(td[2]);
  tr.appendChild(td[3]);
  tr.appendChild(td[4]);

  Pai.appendChild(tr);
}

function StorageM(pão, option) {
  let each = "";
  let iAll = 0;

  switch (option) {
    case "set":
      window.sessionStorage.setItem(pão.nome.replace(" ", ""), [
        pão.nome,
        pão.typeCard,
        pão.valorKz,
        pão.valorDl,
        pão.bankEnt,
        pão.bankSai,
      ]);
      let dataN = window.sessionStorage.getItem("data");
      if (dataN) {
        dataN += "," + pão.nome.replace(" ", "");
        window.sessionStorage.setItem("data", [dataN]);
      } else {
        window.sessionStorage.setItem("data", [pão.nome.replace(" ", "")]);
      }
      window.location.reload();
      break;
    case "remove":
      window.sessionStorage.removeItem(pão);
      window.location.reload();
      break;
    case "clear":
      window.sessionStorage.clear();
      window.location.reload();
      break;
    case "get":
      let db = window.sessionStorage.getItem(pão);
      each = "";
      let allDb = ["", "", "", "", "", ""];
      iAll = 0;

      for (let i = 0; i <= db.length; i++) {
        if (db[i] == "," || i == db.length) {
          allDb[iAll] = each;
          each = "";
          iAll++;
        } else {
          each += db[i];
        }
      }
      return allDb;
    case "getData":
      let dbD = window.sessionStorage.getItem("data");
      each = "";
      let allDbD = [];
      iAll = 0;

      if (dbD) {
        for (let i = 0; i <= dbD.length; i++) {
          if (dbD[i] == "," || i == dbD.length) {
            allDbD[iAll] = each;
            each = "";
            iAll++;
          } else {
            each += dbD[i];
          }
        }
        return allDbD;
      }
      break;
    default:
      break;
  }
}

function limparBD() {
  var data = StorageM("", "getData");

  if (data) {
    StorageM("", "clear");
    atualizar();
  } else {
    alert("A Base de Dados já se encontra limpa");
  }
}

function terminarDia() {
  var iavel = StorageM("", "getData");
  var totalKz = 0;
  var totalDl = 0;

  if (iavel) {
    var cambilAtual = parseInt(prompt("Qual é o cambio atual?"));

    for (let i = 0; i < iavel.length; i++) {
      let newD = StorageM(iavel[i], "get");
      totalKz += parseInt(newD[2]);
      totalDl += parseInt(newD[3]);
    }

    //Total de Kz - (Total de Dollar * cambio Atual)
    let lucro = parseFloat(totalKz - totalDl * cambilAtual);
    alert("Terminou o dia com um Lucro de: " + lucro + " Kz");
  } else {
    alert("Você ainda nem começou o dia");
  }
}

function remover() {
  //   StorageM(client, "remove");
  let dataN = window.sessionStorage.getItem("data");

  if (dataN) {
    var client = prompt("Quem deseja remover?").replace(" ", "");

    dataN = dataN.replace(`,${client}`, "");
    window.sessionStorage.setItem("data", [dataN]);
    window.location.reload();
  } else {
    alert("Sem dados para serem removidos");
  }
}

function whatCard(card) {
  card == "V-GO"
    ? (cambio = 590)
    : card == "V-PREMIUM"
    ? (cambio = 590)
    : (cambio = 600);
}

document.getElementById("newLine").addEventListener("click", () => {
  form.nome = document.getElementById("nome").value;
  form.typeCard = document.getElementById("typeCard").value;
  form.valorKz = parseInt(document.getElementById("valorKz").value);
  form.valorDl = parseInt(document.getElementById("valorDl").value);
  form.bankEnt = document.getElementById("bankEnt").value;
  form.bankSai = document.getElementById("bankSai").value;

  if (!form.nome.includes(" ")) {
    alert("Por favor preencha o campo nome com Nome e Sobrenome");
  } else if (!form.valorDl && !form.valorKz) {
    alert("Por favor preencha um dos valores monetarios");
  } else if (!form.bankEnt || !form.bankSai || !form.typeCard) {
    !form.bankEnt
      ? alert("Por favor selecione o Banco de entrada dos valores")
      : "";
    !form.bankSai
      ? alert("Por favor selecione o Banco de saída dos valores")
      : "";
    !form.typeCard
      ? alert("Por favor selecione o tipo de cartão requisitado")
      : "";
  } else {
    StorageM(form, "set");
    // atualizar();
    limpar();
  }
  // StorageM("", "clear");
});

atualizar();
