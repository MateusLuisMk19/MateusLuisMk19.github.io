const form = {
  nome: "",
  typeCard: "",
  valorKz: 0,
  valorDl: 0,
  bankEnt: "",
  bankSai: "",
};
const CAMBIO = {
  v_go: 0,
  v_boost: 0,
  v_premium: 0,
};
let spanList = document.querySelectorAll("span.cmb");
var data;
let cambio;
var dataGetted;

function escolha() {
  let another;
  let str = "";
  let valor = "";
  let card = document.getElementById("typeCard").value;

  if (document.getElementById("valorKz").value != (null || "")) {
    another = document.getElementById("valorDl");
    valor = parseInt(document.getElementById("valorKz").value) / cambio;
    str = valor.toString();
    // console.log(str);
    for (let i = 0; i < str.length; i++) {
      // console.log(str[i]);

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
  dataGetted = StorageM("", "getData");
  if (dataGetted) {
    for (let i = 0; i < dataGetted.length; i++) {
      showOperations(dataGetted[i]);
    }
  }

  if (!dataGetted) {
    document.querySelectorAll(".botoes-sup").forEach((botao) => {
      botao.classList.add("visually-hidden");
    });
  } else {
    document.querySelectorAll(".botoes-sup").forEach((botao) => {
      botao.classList.replace("visually-hidden", "visually");
    });
  }
  updateCambioView();
}

function updateCambioView() {
  let cambioList = [
    sendCambio("get", "v_go"),
    sendCambio("get", "v_boost"),
    sendCambio("get", "v_go"),
    sendCambio("get", "v_premium"),
  ];

  // console.log(cambioList, spanList);

  for (let i = 0; i < cambioList.length; i++) {
    spanList[i].innerHTML = cambioList[i] ? cambioList[i] + "Kz" : "S/C";
  }
}

function showOperations(names) {
  let Pai = document.getElementById("lines");
  data = StorageM(names, "get");
  // console.log(variavel);

  let tr = document.createElement("tr");

  let td = [];
  for (let i = 0; i < 6; i++) {
    td[i] = document.createElement("td");
  }

  for (let i = 0; i < 6; i++) {
    td[i].innerHTML = data[i];
  }

  switch (td[1].innerHTML) {
    case "V-GO":
      td[1].classList.add("bg-v-go");
      break;
    case "V-BOOST":
      td[1].classList.add("bg-v-boost");

      break;
    case "V-PREMIUM":
      td[1].classList.add("bg-v-premium");
      break;
    default:
      break;
  }

  tr.appendChild(td[0]); //Nome
  tr.appendChild(td[1]); //Catão
  tr.appendChild(td[2]); //Kz
  tr.appendChild(td[3]); //$
  tr.appendChild(td[4]); //Bank Entrada
  tr.appendChild(td[5]); //Bannk Saida

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
      let dataNames = window.sessionStorage.getItem("data");
      if (dataNames) {
        dataNames += "," + pão.nome.replace(" ", "");
        window.sessionStorage.setItem("data", [dataNames]);
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
  function lastLine(lucro) {
    let Pai = document.getElementById("lines");
    let tr = document.createElement("tr");
    let trEmpty = document.createElement("tr");

    let td = [];
    for (let i = 0; i < 5; i++) {
      td[i] = document.createElement("td");
    }

    let tdEmpty = [];
    for (let i = 0; i < 6; i++) {
      tdEmpty[i] = document.createElement("td");
    }

    trEmpty.appendChild(tdEmpty[0]);
    trEmpty.appendChild(tdEmpty[1]);
    trEmpty.appendChild(tdEmpty[2]);
    trEmpty.appendChild(tdEmpty[3]);
    trEmpty.appendChild(tdEmpty[4]);
    trEmpty.appendChild(tdEmpty[5]);

    td[0].setAttribute("class", "fw-bold");
    td[0].innerHTML = "Total";

    td[1].setAttribute("title", "Número total de cartões");
    td[1].innerHTML = iavel.length;

    td[2].setAttribute("title", "Valor total em Kz");
    td[2].innerHTML = totalKz;

    td[3].setAttribute("title", "Valor total em $");
    td[3].innerHTML = totalDl;

    td[4].setAttribute("colspan", "2");
    td[4].setAttribute("class", "fw-bold");
    td[4].setAttribute("title", "Lucro do Dia");
    td[4].innerHTML = `Lucro: ${lucro}Kz`;
    if (lucro < 0) {
      td[4].classList.add("bg-danger");
    } else if (lucro > 0) {
      td[4].classList.add("bg-success");
    }
    tr.appendChild(td[0]);
    tr.appendChild(td[1]);
    tr.appendChild(td[2]);
    tr.appendChild(td[3]);
    tr.appendChild(td[4]);

    Pai.appendChild(trEmpty);
    Pai.appendChild(tr);
  }

  var iavel = StorageM("", "getData");
  var totalKz = 0;
  var totalDl = 0;

  if (iavel) {
    var cambilAtual = parseInt(prompt("Qual é o cambio atual?"));

    if (cambilAtual) {
      for (let i = 0; i < iavel.length; i++) {
        let newD = StorageM(iavel[i], "get");
        totalKz += parseInt(newD[2]);
        totalDl += parseInt(newD[3]);
      }

      //Total de Kz - (Total de Dollar * cambio Atual)
      let lucro = parseFloat(totalKz - totalDl * cambilAtual);
      lastLine(lucro);

      let inc = 5;
      let botaoTD = document.querySelector("#terminarDia");
      botaoTD.setAttribute("disabled", "");
      let baixar = setInterval(() => {
        if (inc == 0) {
          botaoTD.removeAttribute("disabled", "");
          botaoTD.innerHTML = "Terminar Dia";
          Export();
          clearInterval(baixar);
        } else {
          botaoTD.innerHTML = "Baixar Excel " + inc--;
        }
      }, [1000]);
    }
  } else {
    alert("Você ainda nem começou o dia");
  }

  function Export() {
    let dataL = new Date();
    let dataA =
      dataL.getDate() +
      "/" +
      dataL.getMonth() +
      "/" +
      dataL.getFullYear().toString().slice(2, 4);
    let horas = dataL.getHours() + ":" + dataL.getMinutes();
    let name = "REG-" + dataA + "-" + horas + "-JB";
    // console.log(name);

    $("#registoDia").table2excel({
      filename: `${name}.xls`,
    });
  }
}

function remover() {
  //   StorageM(client, "remove");
  let dataN = window.sessionStorage.getItem("data");

  if (dataN) {
    var client = prompt("Quem deseja remover?").replace(" ", "");
    // console.log(dataN[0]);

    dataN = dataN.replace(`${client}`, "");
    // console.log(dataN[0]);
    if (dataN.includes(",,")) {
      dataN = dataN.replace(`,,`, ",");
    }
    if (dataN[0] == ",") {
      dataN = dataN.replace(`,`, "");
    }
    window.sessionStorage.setItem("data", []);
    window.sessionStorage.setItem("data", [dataN]);
    window.location.reload();
  } else {
    alert("Sem dados para serem removidos");
  }
}

function whatCard(card) {
  function valor(num) {
    let val = parseInt(spanList[num].innerHTML);

    if (val) {
      return val;
    }
    alert(
      "Este cartão não tem câmbio definido\nPor favor defina o câmbio de " +
        card +
        " nas definições"
    );
  }
  card == "V-GO"
    ? (cambio = valor(0))
    : card == "V-PREMIUM"
    ? (cambio = valor(3))
    : card == "V-BOOST"
    ? (cambio = valor(1))
    : "";
}

function isMT1space(str) {
  let cont = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] == " ") cont++;
  }
  if (cont > 1) return true;
  return false;
}

document.getElementById("newLine").addEventListener("click", () => {
  form.clientNome = document.getElementById("nome").value;
  form.card = document.getElementById("typeCard").value;
  form.valorKz = parseInt(document.getElementById("valorKz").value);
  form.valorDl = parseInt(document.getElementById("valorDl").value);
  form.bancoEnt = document.getElementById("bankEnt").value;
  form.bancoSai = document.getElementById("bankSai").value;

  if (!form.clientNome.includes(" ") || isMT1space(form.clientNome)) {
    alert(
      "Por favor preencha o campo nome com Nome e Sobrenome ou retire o espaço depois do último nome"
    );
  } else if (!form.valorDl && !form.valorKz) {
    alert("Por favor preencha um dos valores monetarios");
  } else if (!form.bancoEnt || !form.bancoSai || !form.card) {
    !form.bancoEnt
      ? alert("Por favor selecione o Banco de entrada dos valores")
      : "";
    !form.bancoSai
      ? alert("Por favor selecione o Banco de saída dos valores")
      : "";
    !form.card ? alert("Por favor selecione o tipo de cartão requisitado") : "";
  } else {
    StorageM(form, "set");
    // atualizar();
    limpar();
  }
  // StorageM("", "clear");
});

atualizar();

function sendCambio(option, type) {
  switch (option) {
    case "set":
      CAMBIO.v_go = document.getElementById("cmb-v-go").value;
      CAMBIO.v_boost = document.getElementById("cmb-v-boost").value;
      CAMBIO.v_premium = document.getElementById("cmb-v-premium").value;

      CAMBIO.v_go ? window.localStorage.setItem("v_go", CAMBIO.v_go) : "";
      CAMBIO.v_boost
        ? window.localStorage.setItem("v_boost", CAMBIO.v_boost)
        : "";
      CAMBIO.v_premium
        ? window.localStorage.setItem("v_premium", CAMBIO.v_premium)
        : "";
      break;
    case "get":
      return window.localStorage.getItem(type);
    case "trash":
      window.localStorage.clear();
      break;
    default:
      break;
  }

  window.location.reload();
}
