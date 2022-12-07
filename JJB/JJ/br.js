const form = {
  nome: "",
  typeCard: "",
  valorKz: 0,
  valorDl: 0,
  bankEnt: "",
  bankSai: "",
};
const CAMBIO = {
  digi_basico: 610,
  digi_mais: 620,
};
var variavel;
var cambio;
var dataGetted;

function escolha() {
  let another, str, valor;
  let card = document.getElementById("typeCard").value;

  if (document.getElementById("valorKz").value != (null || "")) {
    //Se existir o valor em KZ
    another = document.getElementById("valorDl");
    valor = parseInt(document.getElementById("valorKz").value) / cambio;
    str = valor.toString();

    for (let i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }
    //
  } else if (document.getElementById("valorDl").value != (null || "")) {
    //Se existir o valor em Dolares
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
    //
  }
}

function createLines(names) {
  let Pai = document.getElementById("lines");
  variavel = StorageM(names, "get");
  // console.log(variavel);

  let tr = document.createElement("tr");

  let td = [];
  for (let i = 0; i < 6; i++) {
    td[i] = document.createElement("td");
  }

  for (let i = 0; i < 6; i++) {
    td[i].innerHTML = variavel[i];
  }

  switch (td[1].innerHTML) {
    case "Digi-Básico":
      td[1].classList.add("bg-digi-basico");
      break;
    case "Digi-Mais":
      td[1].classList.add("bg-digi-mais");
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
      let dataNames = window.sessionStorage.getItem("datajj");
      if (dataNames) {
        dataNames += "," + pão.nome.replace(" ", "");
        window.sessionStorage.setItem("datajj", [dataNames]);
      } else {
        window.sessionStorage.setItem("datajj", [pão.nome.replace(" ", "")]);
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
      let dbD = window.sessionStorage.getItem("datajj");
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

function whatCard(card) {
  card == "Digi-Básico"
    ? (cambio = CAMBIO.digi_basico)
    : card == "Digi-Mais"
    ? (cambio = CAMBIO.digi_mais)
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

atualizar();

//Funções onClicked
function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("typeCard").value = "";
  document.getElementById("valorKz").value = "";
  document.getElementById("valorDl").value = "";
  document.getElementById("bankEnt").value = "";
  document.getElementById("bankSai").value = "";
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

function atualizar() {
  dataGetted = StorageM("", "getData");

  if (dataGetted) {
    for (let i = 0; i < dataGetted.length; i++) {
      createLines(dataGetted[i]);
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
}

function terminarDia() {
  var dataGetted = StorageM("", "getData");
  var totalKz = 0;
  var totalDl = 0;

  if (dataGetted) {
    let cambilAtual = parseInt(prompt("Qual é o cambio atual?"));

    if (cambilAtual) {
      for (let i = 0; i < dataGetted.length; i++) {
        let newD = StorageM(dataGetted[i], "get");
        totalKz += parseInt(newD[2]);
        totalDl += parseInt(newD[3]);
      }

      //Total de Kz - (Total de Dollar * cambio Atual)
      let luc = parseFloat(totalKz - totalDl * cambilAtual);
      lastLine(luc);

      let inc = 5;
      window.sessionStorage.setItem("isTerminedDay",true)
      let botaoTD = document.querySelector("#terminarDia");
    
      botaoTD.setAttribute("disabled", "");

      let baixar = setInterval(() => {
        if (inc == 0) {
          botaoTD.innerHTML = "Terminar Dia";
          //Export();
          clearInterval(baixar);
        } else {
          botaoTD.innerHTML = "Baixar Excel " + inc--;
        }
      }, [1000]);
    }
  } else {
    alert("Você ainda nem começou o dia");
  }

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
    td[1].innerHTML = dataGetted.length;

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

  function Export() {
    let dataL = new Date();
    let dataA =
      dataL.getDate() +
      "/" +
      dataL.getMonth() +
      "/" +
      dataL.getFullYear().toString().slice(2, 4);
    let horas = dataL.getHours() + ":" + dataL.getMinutes();
    let name = "REG-" + dataA + "-" + horas + "-JJDigiPay";
    // console.log(name);

    $("#registoDia").table2excel({
      filename: `${name}.xls`,
    });
  }
}

function remover() {
  let dataN = window.sessionStorage.getItem("datajj");

  if (dataN) {
    var client = prompt("Quem deseja remover?").replace(" ", "");

    dataN = dataN.replace(`${client}`, "");

    if (dataN.includes(",,")) {
      dataN = dataN.replace(`,,`, ",");
    }
    if (dataN[0] == ",") {
      dataN = dataN.replace(`,`, "");
    }

    window.sessionStorage.setItem("datajj", []);
    window.sessionStorage.setItem("datajj", [dataN]);
    window.location.reload();
  } else {
    alert("Sem dados para serem removidos");
  }
}

document.getElementById("newLine").addEventListener("click", () => {
  form.nome = document.getElementById("nome").value;
  form.typeCard = document.getElementById("typeCard").value;
  form.valorKz = parseInt(document.getElementById("valorKz").value);
  form.valorDl = parseInt(document.getElementById("valorDl").value);
  form.bankEnt = document.getElementById("bankEnt").value;
  form.bankSai = document.getElementById("bankSai").value;

  if (!form.nome.includes(" ") || isMT1space(form.nome)) {
    alert(
      "Por favor preencha o campo nome com Nome e Sobrenome ou retire o espaço depois do último nome"
    );
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
});

function getCambio(digi) {
  let dataCambio = window.sessionStorage.getItem("cambio");

  switch (digi) {
    case "basico":
      break;
    case "mais":
      break;
    default:
      break;
  }
}
console.log(window.sessionStorage.getItem("isTerminedDay"))
if(window.sessionStorage.getItem("isTerminedDay")){
  let botaoTD = document.querySelector("#terminarDia");
  let botaoNC = document.querySelector("#newClient");

  botaoTD.setAttribute("disabled", "");
  botaoNC.setAttribute("disabled", "");
}

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