async function showOperations(by, value) {
  let PaiG = document.getElementById("paiGrandeHome");
  let Pai = document.getElementById("lines");
  let divM = document.createElement("div");
  if (PaiG.lastChild == divM) {
    PaiG.removeChild(divM);
  }
  const botoes = document.getElementsByClassName("botoes-sup");
  for (let f = 0; f < botoes.length; f++) {
    botoes[f].classList.remove("disabled");
  }

  Pai.innerHTML = "";

  if (by == "ramo") {
    const dataOp = await firebase
      .firestore()
      .collection("jjb_op")
      .where("ramo", "==", value)
      .orderBy("data", "desc")
      .get()
      .then((snapshot) => {
        const operations = snapshot.docs.map((doc) => doc.data());
        // console.log(operations);
        return operations;
      });

    // console.log("ihii", dataOp);

    dataOp.forEach(async (doc) => {
      // console.log(doc);

      let tr = document.createElement("tr");

      let td = [];
      for (let i = 0; i < 6; i++) {
        td[i] = document.createElement("td");
      }

      td[0].innerHTML = doc.clientNome;
      td[1].innerHTML = doc.card.nome;
      td[2].innerHTML = doc.valorKz;
      td[3].innerHTML = doc.valorDl;
      td[4].innerHTML = doc.bancoEnt;
      td[5].innerHTML = doc.bancoSai;

      tr.appendChild(td[0]); //Nome
      tr.appendChild(td[1]); //Catão
      tr.appendChild(td[2]); //Kz
      tr.appendChild(td[3]); //$
      tr.appendChild(td[4]); //Bank Entrada
      tr.appendChild(td[5]); //Bannk Saida

      Pai.appendChild(tr);
      // console.log(td);
    });
  } else if (by == "user") {
    const dataOp = await firebase
      .firestore()
      .collection("jjb_op")
      .where("user", "==", value)
      .orderBy("data", "desc")
      .get()
      .then((snapshot) => {
        const operations = snapshot.docs.map((doc) => doc.data());
        // console.log(operations);
        return operations;
      });

    // console.log("ihii", dataOp);

    dataOp.forEach(async (doc) => {
      // console.log(doc);

      let tr = document.createElement("tr");

      let td = [];
      for (let i = 0; i < 6; i++) {
        td[i] = document.createElement("td");
      }

      td[0].innerHTML = doc.clientNome;
      td[1].innerHTML = doc.card.nome;
      td[2].innerHTML = doc.valorKz;
      td[3].innerHTML = doc.valorDl;
      td[4].innerHTML = doc.bancoEnt;
      td[5].innerHTML = doc.bancoSai;

      tr.appendChild(td[0]); //Nome
      tr.appendChild(td[1]); //Catão
      tr.appendChild(td[2]); //Kz
      tr.appendChild(td[3]); //$
      tr.appendChild(td[4]); //Bank Entrada
      tr.appendChild(td[5]); //Bannk Saida

      Pai.appendChild(tr);
      // console.log(td);
    });
  } else if (by == "today") {
    const dataOp = await firebase
      .firestore()
      .collection("jjb_op")
      .where("data", "==", todayDate)
      .where("user", "==", User.uid)
      .orderBy("horario", "desc")
      .get()
      .then((snapshot) => {
        const operations = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(operations);
        return operations;
      });

    const reg = await firebase
      .firestore()
      .collection("jjb_reg_dia")
      .where("data", "==", todayDate)
      .where("user", "==", User.uid)
      .get()
      .then((snapshot) => {
        const operations = snapshot.docs.map((doc) => doc);
        // console.log("Opening", operations.length);
        if (operations.length != 0) {
          console.log(operations[0].data());
          return {
            dados: operations[0].data(),
            exist: operations[0].exists,
          };
        }
        return null;
      });
    // console.log("REG", reg);

    dataOp.forEach(async (doc) => {
      // console.log(doc);

      let tr = document.createElement("tr");

      let td = [];
      for (let i = 0; i < 7; i++) {
        td[i] = document.createElement("td");
      }

      td[0].innerHTML = doc.clientNome;
      td[1].innerHTML = doc.card.nome;
      td[2].innerHTML = doc.valorKz;
      td[3].innerHTML = doc.valorDl;
      td[4].innerHTML = doc.bancoEnt;
      td[5].innerHTML = doc.bancoSai;
      td[6].innerHTML = `<button class="btn btn-danger btn-sm" 
      onclick="deleteOperation('${doc.id}', '${doc.clientNome}', '${doc.data}')"
      style="border-radius: 50%; height: 30px; width: 30px;"
                            title="Eliminar">X
                        </button>`;
      td[6].setAttribute("style", "width:40px");

      tr.appendChild(td[0]); //Nome
      tr.appendChild(td[1]); //Catão
      tr.appendChild(td[2]); //Kz
      tr.appendChild(td[3]); //$
      tr.appendChild(td[4]); //Bank Entrada
      tr.appendChild(td[5]); //Bannk Saida
      tr.appendChild(td[6]); //apagar
      Pai.appendChild(tr);
      // console.log(td);
    });

    if (reg) {
      if (reg.exist) {
        for (let f = 0; f < botoes.length; f++) {
          botoes[f].classList.add("disabled");
        }

        divM.classList.add("row", "w-100", "bg-success");

        let divCol = [];
        for (let i = 0; i < 3; i++) {
          divCol[i] = document.createElement("div");
          divCol[i].classList.add(
            "col",
            "fs-3",
            "text-white",
            "m-2",
            "text-center"
          );
        }

        divCol[0].innerHTML = "Dia Terminado";
        divCol[1].innerHTML = `Lucro: ${reg.dados.lucro} Kz`;
        divCol[2].innerHTML = `Data: ${reg.dados.data}`;

        divM.appendChild(divCol[0]);
        divM.appendChild(divCol[1]);
        divM.appendChild(divCol[2]);
        PaiG.appendChild(divM);
      }
    }
    return await dataOp;
  } else {
    const dataOp = await firebase
      .firestore()
      .collection("jjb_op")
      .orderBy("data", "desc")
      .get()
      .then((snapshot) => {
        const operations = snapshot.docs.map((doc) => doc.data());
        // console.log(operations);
        return operations;
      });

    // console.log("ihii", dataOp);

    dataOp.forEach(async (doc) => {
      // console.log(doc);

      let tr = document.createElement("tr");

      let td = [];
      for (let i = 0; i < 6; i++) {
        td[i] = document.createElement("td");
      }

      td[0].innerHTML = doc.clientNome;
      td[1].innerHTML = doc.card.nome;
      td[2].innerHTML = doc.valorKz;
      td[3].innerHTML = doc.valorDl;
      td[4].innerHTML = doc.bancoEnt;
      td[5].innerHTML = doc.bancoSai;

      tr.appendChild(td[0]); //Nome
      tr.appendChild(td[1]); //Catão
      tr.appendChild(td[2]); //Kz
      tr.appendChild(td[3]); //$
      tr.appendChild(td[4]); //Bank Entrada
      tr.appendChild(td[5]); //Bannk Saida

      Pai.appendChild(tr);
    });
  }
}

async function createSelect(ramo, type, method) {
  switch (type) {
    case "card":
      const dataCard = await firebase
        .firestore()
        .collection("jjb_card")
        .where("ramo", "in", [ramo, "all"])
        .orderBy("order")
        .get()
        .then((snapshot) => {
          var card;
          var cardsText = [];

          snapshot.docs.forEach((doc, index) => {
            //  console.log(doc.data());
            card = doc.data();
            cardsText[index] = card.type;
          });
          // console.log(cardsText);
          return cardsText;
        });

      optionSel(
        ["name", "required", "id", "onchange", "class"],
        ["TypeCard", "", "typeCard", "whatCard(this.value)", "form-select"],
        dataCard,
        "selectCard"
      ); //JB Virtual Cartão
      // console.log("ihii", dataCard);
      break;
    case "bank":
      const dataBank = await firebase
        .firestore()
        .collection("jjb_banks")
        .where("ramo", "in", [ramo, "all"])
        .where("method", "==", method)
        .orderBy("order")
        .get()
        .then((snapshot) => {
          var bank;
          var banksText = [];

          snapshot.docs.forEach((doc, index) => {
            //  console.log(doc.data());
            bank = doc.data();
            banksText[index] = bank.nome;
          });
          // console.log(banksText);
          return banksText;
        });

      optionSel(
        ["name", "required", "id", "class"],
        [
          method == "in" ? "Entrada" : "Saída",
          "",
          method == "in" ? "bankEnt" : "bankSai",
          "col form-select mt-0 m-1",
        ],
        dataBank,
        "seletBanks"
      ); //JB Virtual Cartão
      // console.log("ihii", dataBank);

      break;

    default:
      break;
  }
}

async function salvarOperations() {
  reg_form.clientNome = document.getElementById("nome").value;
  reg_form.card.nome = document.getElementById("typeCard").value;
  reg_form.valorKz = parseFloat(document.getElementById("valorKz").value);
  reg_form.valorDl = parseFloat(document.getElementById("valorDl").value);
  reg_form.bancoEnt = document.getElementById("bankEnt").value;
  reg_form.bancoSai = document.getElementById("bankSai").value;
  reg_form.user = getCurrentUser().uid;

  reg_form_Aux.img_fr = document.getElementById("bi-img-fr").files[0];
  reg_form_Aux.img_vr = document.getElementById("bi-img-vr").files[0];
  reg_form_Aux.bi_num = document.getElementById("bi-num").value;

  reg_form_Aux.iban = document.getElementById("iban").value;

  console.log(Client.nome, Client.sobrenome);
  if (isValido(reg_form)) {
    Client.bi.verificado = true;

    var splittedN = reg_form.clientNome.split(" ");

    Client.nome = splittedN[0];
    Client.sobrenome = splittedN[splittedN.length - 1];

    Client.total_pago.kz = reg_form.valorKz;

    reg_form.data = todayDate;
    reg_form.user = User.uid;
    reg_form.horario = dt.getHours() + ":" + dt.getMinutes();
    if (User.ramo == "all") {
      reg_form.ramo = reg_form.card.nome.includes("Digi") ? "jj" : "jb";
    } else {
      reg_form.ramo = User.ramo;
    }

    // console.log('form1',form);

    firebase
      .firestore()
      .collection("jjb_card")
      .where("type", "==", reg_form.card.nome)
      .get()
      .then((snapshot) => {
        reg_form.card.cambio = snapshot.docs[0].data().cambio;
        // console.log('form2',form);
        firebase
          .firestore()
          .collection("jjb_op")
          .add(reg_form)
          .then(() => {
            Reload();
          });
      });
  }
}

// -----------------------clients
async function getClients() {
  let Pai = document.getElementById("lines");
  Pai.innerHTML = "";

  const dataCli = await firebase
    .firestore()
    .collection("jjb_clients")
    .where("ramo", "==", User.ramo)
    .orderBy("nome")
    .get()
    .then((snapshot) => {
      const cli = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(cli);
      return cli;
    });

  // console.log("ihii", dataOp);

  const ibanDb = await firebase
    .firestore()
    .collection("clients_iban")
    .get()
    .then((snapshot) => {
      let res = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  dataCli.forEach(async (doc) => {
    // console.log(doc);

    let tr = document.createElement("tr");

    let td = [];
    for (let i = 0; i < 5; i++) {
      td[i] = document.createElement("td");
    }

    let nameLink = document.createElement("a");
    nameLink.innerHTML = doc.nome + " " + doc.sobrenome;
    nameLink.setAttribute("class", "link-local");
    nameLink.setAttribute("role", "button");
    nameLink.setAttribute("onclick", `registoPessoal('${doc.uid}')`);
    td[0].appendChild(nameLink);

    doc.bi.verificado ? td[1].setAttribute("class", "text-success") : "";
    td[1].innerHTML = doc.bi.num;

    const ibanDat = [];
    ibanDb.forEach((element) => {
      doc.iban.forEach((iid) => {
        if (element.id == iid) {
          ibanDat.push(element.iban);
        }
      });
    });

    td[2].innerHTML = ibanDat.length > 1 ? "Mais de um..." : ibanDat[0];
    td[2].setAttribute("class", "text-center");

    // const valorTotalDb = await firebase
    //   .firestore()
    //   .collection("jjb_op")
    //   .get()
    //   .then((snapshot) => {
    //     const res = [];
    //     snapshot.docs.map((cada, index) => {
    //       console.log(doc.iban[index]);
    //       if (cada.id == doc.iban[index].toString()) {
    //         res.push(cada.data());
    //       }
    //     });
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // console.log(valorTotalDb);

    // td[3].innerHTML = doc.total_pago.kz;
    // td[3].setAttribute('class','text-center')

    let dropleft = document.createElement("div");
    dropleft.classList.add("dropstart");
    dropleft.innerHTML = `<svg id="i-ellipsis-vertical" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="32" 
    height="32" role='button' fill="none" data-bs-toggle="dropdown" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                          <circle cx="16" cy="7" r="2" />
                          <circle cx="16" cy="16" r="2" />
                          <circle cx="16" cy="25" r="2" />
                          </svg>`;

    let ulDr = document.createElement("ul");
    ulDr.setAttribute("class", "dropdown-menu");

    let li = [];
    for (let i = 0; i < 3; i++) {
      li[i] = document.createElement("li");
    }

    let opEdit = document.createElement("a");
    opEdit.setAttribute("class", "dropdown-item");
    opEdit.setAttribute("title", "Editar");
    opEdit.setAttribute("value", doc.id);
    opEdit.setAttribute("onclick", "editClient(this.value)");
    opEdit.innerHTML = "Editar";

    li[0].appendChild(opEdit);

    let opDelete = document.createElement("a");
    opDelete.setAttribute("class", "dropdown-item");
    opDelete.setAttribute("title", "Eliminar");
    opDelete.setAttribute("value", doc.id);
    opDelete.setAttribute("onclick", "deleteClient(this.value)");
    opDelete.innerHTML = "Eliminar";

    li[1].appendChild(opDelete);

    ulDr.appendChild(li[0]);
    ulDr.appendChild(li[1]);
    dropleft.appendChild(ulDr);
    td[4].appendChild(dropleft);

    tr.appendChild(td[0]); //Nome completo
    tr.appendChild(td[1]); //BI
    tr.appendChild(td[2]); //Iban
    tr.appendChild(td[3]); //botão
    tr.appendChild(td[4]); //botão

    Pai.appendChild(tr);
    // console.log(td);
  });
}

async function salvarClient() {
  reg_form_Aux.nome = document.getElementById("nome").value;

  reg_form_Aux.img_fr = document.getElementById("bi-img-fr").files[0];
  reg_form_Aux.img_vr = document.getElementById("bi-img-vr").files[0];
  reg_form_Aux.bi_num = document.getElementById("bi-num").value;

  reg_form_Aux.iban = document.getElementById("iban").value;

  console.log(iban);
  if (isValido("client")) {
    // if (true) {
    let splittedN = reg_form_Aux.nome.split(" ");
    let nib = reg_form_Aux.iban;
    let iban = {
      iban:
        "AO06 " +
        nib.slice(0, 4) +
        " " +
        nib.slice(4, 8) +
        " " +
        nib.slice(8, 12) +
        " " +
        nib.slice(12, 16) +
        " " +
        nib.slice(16, 20) +
        " " +
        nib.slice(20, 24) +
        " " +
        nib.slice(24, 25) +
        "",
      nib: reg_form_Aux.iban + "",
    };

    await withFire();
    Client.nome = splittedN[0];
    Client.sobrenome = splittedN[splittedN.length - 1];
    Client.data = todayDate;
    Client.ramo = document.querySelector(".ramo-ch[checked]").value;
    Client.bi.num = reg_form_Aux.bi_num;

    console.log(Client);

    setTimeout(async () => {
      await firebase
        .firestore()
        .collection("jjb_clients")
        .add(Client)
        .then(() => {
          alertar("Novo cliente adicionado", "success");
          setTimeout(() => {
            Reload();
          }, [3000]);
        })
        .catch((err) => {
          alertar(err, "danger");
        });
    }, [5000]);

    // console.log('form1',form);
    async function withFire() {
      Client.bi.img.front = await firebase
        .storage()
        .ref()
        .child("bi")
        .child(reg_form_Aux.nome + "_BI-front")
        .put(reg_form_Aux.img_fr)
        .then(async (res) => {
          let linkImg = await res.ref.getDownloadURL().then((link) => {
            return link;
          });
          return linkImg;
        })
        .catch((err) => {
          alertar(err, "danger");
        });

      Client.bi.img.verse = await firebase
        .storage()
        .ref()
        .child("bi")
        .child(reg_form_Aux.nome + "_BI-Verse")
        .put(reg_form_Aux.img_vr)
        .then(async (res) => {
          let linkImg = await res.ref.getDownloadURL().then((link) => {
            return link;
          });
          return linkImg;
        })
        .catch((err) => {
          alertar(err, "danger");
        });

      const ibnCl = await firebase
        .firestore()
        .collection("clients_iban")
        .add(iban)
        .then((res) => {
          return res.id;
        })
        .catch((err) => {
          alertar(err, "danger");
        });
      Client.iban.push(await ibnCl);
    }
  }
}
// Contas -------------------------------------------------------------------
async function getContas(cargo, startDate, endDate) {
  let Pai = document.getElementById("lines");
  Pai.innerHTML = "";

  let getData_ = {
    data: [],
    valor: [],
  };

  if (!endDate) endDate = todayDate;

  const dataOp = await firebase
    .firestore()
    .collection("jjb_reg_dia")
    .where("data", ">=", startDate)
    .where("data", "<=", endDate)
    .orderBy("data", "desc")
    .get()
    .then((snapshot) => {
      const operations = snapshot.docs.map((doc) => doc.data());
      // console.log("Exp", operations);
      return operations;
    });

  console.log("ihii", dataOp);

  dataOp.forEach(async (doc, index) => {
    // console.log(doc);

    // console.log("id", dataOp.id[index]);
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", doc.user)
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data());

        if (users.length > 0) {
          // console.log(users);

          let tr = document.createElement("tr");

          let td = [];
          for (let i = 0; i < 7; i++) {
            td[i] = document.createElement("td");
          }

          let luc = 0;
          let th = document.createElement("th");
          th.innerHTML = index + 1;

          getData_.data.push(
            monthName(doc.data.slice(5, 7), doc.data.slice(8, 11))
          );
          // console.log(getData_.data.length-1)
          monthName(doc.data.slice(5, 7)) ==
          getData_.data[getData_.data.length - 1]
            ? (luc += doc.lucro)
            : (luc = doc.lucro);

          getData_.valor.push(luc);
          td[0].innerHTML = doc.data;
          td[1].innerHTML = doc.totalKz + " Kz";
          td[2].innerHTML = doc.totalDl + " $";
          td[3].innerHTML = doc.numClientes;
          td[4].innerHTML = doc.lucro + " Kz";
          td[5].innerHTML = users[0].nome;

          tr.appendChild(th); //Nome
          tr.appendChild(td[0]); //Nome
          tr.appendChild(td[1]); //Catão
          tr.appendChild(td[2]); //Kz
          tr.appendChild(td[3]); //$
          tr.appendChild(td[4]); //Bank Entrada
          tr.appendChild(td[5]); //botão

          Pai.appendChild(tr);
        }
      });
  });

  function monthName(mNum, dia) {
    console.log();
    const monthNames = [
      "Janeiro" + " " + dia,
      "Fevereiro" + " " + dia,
      "Março" + " " + dia,
      "Abril" + " " + dia,
      "Maio" + " " + dia,
      "Junho" + " " + dia,
      "Julho" + " " + dia,
      "Agosto" + " " + dia,
      "Setembro" + " " + dia,
      "Outubro" + " " + dia,
      "Novembro" + " " + dia,
      "Dezembro" + " " + dia,
    ];
    return monthNames[mNum - 1];
  }
  graphic(getData_);
}
// History -----------------------------------------------------------------
async function getHistory(cargo) {
  let Pai = document.getElementById("lines");
  Pai.innerHTML = "";

  const dataOp = await firebase
    .firestore()
    .collection("jjb_op")
    .orderBy("data", "desc")
    .get()
    .then((snapshot) => {
      const operations = {
        data: snapshot.docs.map((doc) => doc.data()),
        id: snapshot.docs.map((doc) => doc.id),
      };
      // console.log("Exp", operations);
      return operations;
    });

  // console.log("ihii", dataOp);

  dataOp.data.forEach(async (doc, index) => {
    // console.log(doc);

    // console.log("id", dataOp.id[index]);
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", doc.user)
      .get()
      .then((snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data());

        if (users.length > 0) {
          // console.log(users);

          let tr = document.createElement("tr");

          let td = [];
          for (let i = 0; i < 6; i++) {
            td[i] = document.createElement("td");
          }

          td[0].innerHTML = doc.clientNome;
          td[1].innerHTML = doc.card.nome;
          td[2].innerHTML = doc.data;
          td[3].innerHTML = doc.horario;
          td[4].innerHTML = users[0].nome;

          let button = document.createElement("button");
          button.setAttribute("class", "btn btn-secondary btn-sm");
          button.setAttribute(
            "style",
            "border-radius: 50%; height: 32px; width: 32px;"
          );
          button.setAttribute("title", "Ver detalhes");
          button.setAttribute("value", dataOp.id[index]);
          button.setAttribute("onclick", `showDetails(this.value,'${cargo}')`);
          button.innerHTML = `<svg
            id="i-paperclip"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 32"
            width="20"
            height="20"
            fill="none"
            stroke="currentcolor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M10 9 L10 24 C10 28 13 30 16 30 19 30 22 28 22 24 L22 6 C22 3 20 2 18 2 16 2 14 3 14 6 L14 23 C14 24 15 25 16 25 17 25 18 24 18 23 L18 9" />
          </svg>`;

          td[5].appendChild(button);

          tr.appendChild(td[0]); //Nome
          tr.appendChild(td[1]); //Catão
          tr.appendChild(td[2]); //Kz
          tr.appendChild(td[3]); //$
          tr.appendChild(td[4]); //Bank Entrada
          tr.appendChild(td[5]); //botão

          Pai.appendChild(tr);
        }
      });
  });
}

// {
//   <div >
//       <div class="modal-dialog  ">

//           <div class="modal-">

//               <div class="modal-header">
//                   <h1 class="modal-title fs-5" id="datailsOpLabel">Eliminar operação</h1>
//                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>

//               <div class="modal-body">

//               </div>

//               <div class="modal-footer">
//               </div>

//           </div>

//       </div>
//   </div>
// }

function deleteOperation(opId, nome, data) {
  let PAI = document.querySelector("body");
  document.querySelector(`#btn-f-${opId}`)
    ? document.querySelector(`#btn-f-${opId}`).click()
    : "";

  let btn_modal = document.createElement("button");
  btn_modal.setAttribute("class", "btn btn-primary visually-hidden");
  btn_modal.setAttribute("data-bs-target", "#deletOp");
  btn_modal.setAttribute("data-bs-toggle", "modal");
  btn_modal.setAttribute("data-bs-dismiss", "modal");

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal fade");
  modal.setAttribute("id", "deletOp");
  modal.setAttribute("data-bs-backdrop", "static");
  modal.setAttribute("data-bs-keyboard", "false");
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", "deletOpLabel");
  modal.setAttribute("aria-hidden", "true");

  let modal_dialog = document.createElement("div");
  modal_dialog.setAttribute("class", "modal-dialog modal-dialog-centered");

  let modal_content = document.createElement("div");
  modal_content.setAttribute("class", "modal-content");
  modal_content.innerHTML = `
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="datailsOpLabel">Eliminar operação</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

  <div class="modal-body">
    <label>Pretende realmente eliminar a operaçao de: <br/><span class="fw-bold">${nome} - ${data}</span></label>
  </div>

  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" id="fecharDelOp" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-danger" id="confirmDelOp">Confirmar</button>
  </div>`;

  modal_dialog.appendChild(modal_content);
  modal.appendChild(modal_dialog);
  PAI.appendChild(modal);
  PAI.appendChild(btn_modal);
  btn_modal.click();

  document.getElementById("confirmDelOp").addEventListener("click", () => {
    confirmDel();
    document.getElementById("fecharDelOp").click();
  });

  function confirmDel() {
    firebase
      .firestore()
      .collection(`jjb_op`)
      .doc(opId)
      .delete()
      .then((snapshot) => {
        alertar(`Operação "${nome} - ${data}" Apagado!`, "success");
        setTimeout(() => {
          Reload();
        }, [2000]);
      });
  }
}
// User ------------------------------------------------------------------

async function getUsers(uid, cargo) {
  let Pai = document.getElementById("lines");
  let Pai_but = document.getElementById("pai-button");
  Pai.innerHTML = "";
  Pai_but.innerHTML = "";

  let button_cad = document.createElement("button");
  button_cad.setAttribute("class", "btn btn-primary btn-sm");
  button_cad.setAttribute(
    "style",
    "border-radius: 50%; height: 35px; width: 35px;"
  );
  button_cad.setAttribute("title", "Novo Colaborador");
  button_cad.setAttribute("onclick", "navigate('auth/cadastro.html')");
  button_cad.innerHTML = `<svg
        id="i-plus"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35 32"
        width="20"
        height="20"
        fill="none"
        stroke="currentcolor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      >
        <path d="M16 2 L16 30 M2 16 L30 16" />
      </svg>`;

  cargo == "Administrador" ? Pai_but.appendChild(button_cad) : "";

  const dataOp = await firebase
    .firestore()
    .collection("users")
    .where("uid", "!=", uid)
    .orderBy("uid")
    .get()
    .then((snapshot) => {
      const colab = snapshot.docs.map((doc) => doc.data());
      console.log(colab);
      return colab;
    });

  // console.log("ihii", dataOp);

  dataOp.forEach(async (doc) => {
    // console.log(doc);

    let tr = document.createElement("tr");

    let td = [];
    for (let i = 0; i < 4; i++) {
      td[i] = document.createElement("td");
    }

    let nameLink = document.createElement("a");
    nameLink.innerHTML = doc.nome;
    nameLink.setAttribute("class", "link-local");
    nameLink.setAttribute("role", "button");
    nameLink.setAttribute("onclick", `registoPessoal('${doc.uid}')`);
    td[0].appendChild(nameLink);

    td[1].innerHTML = doc.cargo;
    td[2].innerHTML =
      doc.ramo == "jj"
        ? "JJ DigiPay"
        : doc.ramo == "jb"
        ? "JB Virtual"
        : "Global";

    let buttonDeleteUser = document.createElement("button");
    buttonDeleteUser.setAttribute("class", "btn btn-danger btn-sm m-1");
    buttonDeleteUser.setAttribute(
      "style",
      "border-radius: 50%; height: 35px; width: 35px;"
    );
    buttonDeleteUser.setAttribute("title", "Eliminar");
    buttonDeleteUser.setAttribute("value", doc.uid);
    buttonDeleteUser.setAttribute("onclick", "deleteUser(this.value)");
    buttonDeleteUser.innerHTML = `<svg id="i-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentcolor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        ><path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" /></svg>`;

    let buttonPromotion = document.createElement("button");
    let colorBtn = "";
    let titleBtn = "";
    let svgProm = `<svg id="i-chevron-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                      <path d="M30 20 L16 8 2 20" />
                  </svg>`;
    let svgDesp = `<svg id="i-chevron-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M30 12 L16 24 2 12" />
              </svg>`;
    let icon = "";
    doc.cargo == "Administrador"
      ? ((colorBtn = "danger"), (titleBtn = "Despromover"), (icon = svgDesp))
      : ((colorBtn = "success"), (titleBtn = "Promover"), (icon = svgProm));
    buttonPromotion.setAttribute("class", `btn btn-${colorBtn} btn-sm m-1`);
    buttonPromotion.setAttribute(
      "style",
      "border-radius: 50%; height: 35px; width: 35px;"
    );
    buttonPromotion.setAttribute("title", titleBtn);
    buttonPromotion.setAttribute("value", doc.uid);
    buttonPromotion.setAttribute(
      "onclick",
      `userPromotion(this.value,'${titleBtn}')`
    );
    buttonPromotion.innerHTML = icon;
    cargo == "Administrador"
      ? (td[3].appendChild(buttonPromotion),
        td[3].appendChild(buttonDeleteUser),
        td[3].setAttribute("style", "width:110px"))
      : "";

    tr.appendChild(td[0]); //Nome
    tr.appendChild(td[1]); //Cargo
    tr.appendChild(td[2]); //Ramo
    tr.appendChild(td[3]); //botão

    Pai.appendChild(tr);
    // console.log(td);
  });
}

function deleteUser(uid) {
  console.log("Delete", uid);
}

function userPromotion(uid, type) {
  switch (type) {
    case "Promover":
      console.log(type, uid);

      break;
    case "Despromover":
      console.log(type, uid);

      break;

    default:
      break;
  }
}

function registoPessoal(uid) {
  console.log("Registos de", uid);
}
// Create html


function configBut() {
  const divPai = document.querySelector("#configBut");

  console.log();
  if (window.innerWidth < 768) {
    if (divPai.classList.contains("dropstart")) {
      divPai.classList.remove("dropstart");
    }
    divPai.classList.remove("dropdown");
    divPai.classList.add("dropend");
  } else {
    if (divPai.classList.contains("dropend")) {
      divPai.classList.remove("dropend");
    }
    divPai.classList.remove("dropdown");
    divPai.classList.add("dropstart");
  }
  divPai.innerHTML = `
  <svg id="i-options" class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" width="32" 
  height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" 
  stroke-width="2" class="nav-link dropdown-toggle" href="#" role="button"
  data-bs-toggle="dropdown" aria-expanded="false">
    <path d="M28 6 L4 6 M28 16 L4 16 M28 26 L4 26 M24 3 L24 9 M8 13 L8 19 M20 23 L20 29" />
</svg>
  <ul class="dropdown-menu fs-6">
    <li>
        <a class="dropdown-item" href="#">
            <svg id="i-user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="18"
                height="18" fill="none" stroke="currentcolor" stroke-linecap="round"
                stroke-linejoin="round" stroke-width="2">
                <path
                    d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z" />
            </svg><span style="margin-left: 5px;" id="username-show"></span>
        </a>
    </li>
    <li><a class="dropdown-item" role="button"
            onclick="navigate('config.html')">
            <svg id="i-settings" class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="18"
  height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round"
  stroke-width="2" class="nav-link dropdown-toggle" href="#" role="button"
  data-bs-toggle="dropdown" aria-expanded="false">
  <path
      d="M13 2 L13 6 11 7 8 4 4 8 7 11 6 13 2 13 2 19 6 19 7 21 4 24 8 28 11 25 13 26 13 30 19 30 19 26 21 25 24 28 28 24 25 21 26 19 30 19 30 13 26 13 25 11 28 8 24 4 21 7 19 6 19 2 Z" />
  <circle cx="16" cy="16" r="4" />
  </svg><span style="margin-left: 5px;">Configurações</span></a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li>
        <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" onclick="logOut()">Sair</a></li>
  </ul>`;
}

function optionSel(
  attr,
  val,
  ops,
  elementPai,
  clear
) /*lista dos atributos, valor dos atributos, lista de opções,texto defaut, numero de lista de atributos, id do elemento pai*/ {
  const PAI = document.querySelector(`#${elementPai}`);

  if (clear) {
    PAI.innerHTML = "";
    return;
  }

  let select = document.createElement("select");

  for (let i = 0; i < attr.length; i++) {
    select.setAttribute(`${attr[i]}`, `${val[i]}`);
  }

  for (let i = 0; i < ops.length; i++) {
    let option = document.createElement("option");

    if (i == 0) {
      option.setAttribute("selected", "");
      option.setAttribute("disabled", "");
      option.setAttribute("class", "disabled");
    }

    option.innerHTML = ops[i];
    option.setAttribute("value", `${ops[i]}`);
    select.appendChild(option);
  }
  PAI.appendChild(select);
}

function selectValorDB(id, value) {
  const caixa = document.getElementById(id);
  caixa.value = value;
  changeValor(id);
  // console.log(caixa,value)
}

async function whatCard(card) {
  const dataCard = await firebase
    .firestore()
    .collection("jjb_card")
    .where("type", "==", card)
    .get()
    .then((snapshot) => {
      var card;

      snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        card = doc.data();
      });
      // console.log(card)
      return card;
    });

  // console.log("ihii", dataCard);

  Cambio.valor = dataCard.cambio;
  Cambio.type = dataCard.type;

  // console.log(Cambio);
  createList("listDl", "valorDl");
  createList("listKz", "valorKz");
}

function changeValor(alt) {
  let another;
  let alterado = document.getElementById(alt);
  let str = "";
  let valor = "";

  if (Cambio.valor) {
    if (alt == "valorKz") {
      another = document.getElementById("valorDl");
      valor = parseFloat(alterado.value / Cambio.valor);
      str = valor.toString();

      // console.log(valor, str);

      showAnother(str, another);
    } else if (alt == "valorDl") {
      another = document.getElementById("valorKz");
      valor = parseFloat(alterado.value * Cambio.valor);
      str = valor.toString();
      showAnother(str, another);
    }
  } else {
    alert("Por favor selecione o cartão primeiro");
    limpar();
  }

  function showAnother(str, another) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] == ".") {
        another.value = str.slice(0, i + 3);
        return;
      } else {
        another.value = str;
      }
    }
  }
}

function createList(id, type) {
  const Pai = document.querySelector(`#${id}`);
  const Card = document.querySelector("#typeCard").value;
  let cambio = 610;
  let moeda = "";
  let vDl = [];
  let vKz = [];

  if (Card == "V-Boost" || Card == "V-Premium" || Card == "Digi-Mais")
    vDl = [25, 30, 40, 50, 100];
  else vDl = [10, 20, 30, 40, 50, 100];

  vDl.forEach((valor, index) => {
    vKz[index] = cambio * valor;
  });

  type == "valorDl"
    ? ((base = vDl), (moeda = "$"))
    : type == "valorKz"
    ? ((base = vKz), (moeda = "Kz"))
    : "";

  Pai.innerHTML = "";

  for (let i = 0; i < base.length; i++) {
    let a = document.createElement("a");
    a.setAttribute("class", "dropdown-item");

    a.setAttribute("onclick", `selectValorDB('${type}',${base[i]})`);
    a.innerHTML = base[i] + " " + moeda;

    let li = document.createElement("li");
    li.appendChild(a);

    Pai.appendChild(li);
  }
}

// Auxiliares

function isValido(ddd) {
  console.log(reg_form_Aux.iban);
  if (ddd == "client") {
    if (
      !reg_form_Aux.nome ||
      !reg_form_Aux.nome.includes(" ") ||
      reg_form_Aux.nome[reg_form_Aux.nome.length - 1] == " "
    ) {
      alertar("Por favor preencha o campo nome e sobrenome", "danger");
    } else if (!reg_form_Aux.iban) {
      alertar("Por favor preencha o campo de IBAN", "danger");
    } else if (reg_form_Aux.iban.length != 21) {
      alertar("IBAN incorreto", "danger");
    } else if (
      reg_form_Aux.img_fr == "" ||
      reg_form_Aux.img_vr == "" ||
      !reg_form_Aux.bi_num
    ) {
      alertar("Por favor preencha todos os campos relativos ao BI", "danger");
    } else {
      if (reg_form_Aux.img_fr.name == reg_form_Aux.img_vr.name)
        alertar("As imagens do BI não podem ser iguais", "danger");
      else return true;
    }
  } else {
    if (
      !ddd.clientNome ||
      !ddd.clientNome.includes(" ") ||
      ddd.clientNome[ddd.clientNome.length - 1] == " "
    ) {
      alertar("Por favor preencha o campo nome e sobrenome", "danger");
    } else if (!ddd.valorDl && !ddd.valorKz) {
      alertar("Por favor preencha um dos valores monetarios", "danger");
    } else if (!reg_form_Aux.iban) {
      alertar("Por favor preencha o campo de IBAN", "danger");
    } else if (reg_form_Aux.iban.length != 21) {
      alertar("IBAN incorreto", "danger");
    } else if (!reg_form_Aux.img_fr || !reg_form_Aux.img_vr || !Client.bi.num) {
      alertar("Por favor preencha todos os campos relativos ao BI", "danger");
    } else if (
      ddd.bancoEnt == "Banco de entrada" ||
      ddd.bancoSai == "Banco de saída" ||
      ddd.card.nome == "Escolher cartão"
    ) {
      ddd.bancoEnt == "Banco de entrada"
        ? alertar(
            "Por favor selecione o Banco de entrada dos valores",
            "danger"
          )
        : "";
      ddd.bancoSai == "Banco de saída"
        ? alertar("Por favor selecione o Banco de saída dos valores", "danger")
        : "";
      ddd.card.nome == "Escolher cartão"
        ? alertar("Por favor selecione o tipo de cartão requisitado", "danger")
        : "";
    } else {
      return true;
    }
  }
}

function Reload() {
  window.location.reload();
}

function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("valorKz").value = "";
  document.getElementById("valorDl").value = "";
  optionSel([], [], [], "seletBanks", true); //Clear
  optionSel([], [], [], "selectCard", true); //Clear
  startHome();
}

function navigate(url) {
  window.location.href = url;
}

//Valida a autenticação
//Recebendo os codigos de erro, traduzindo para portugues
//E criando alertas
//    code    string    //codigo de erro
//    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
function validaAuth(code) {
  switch (code) {
    case "auth/wrong-password":
      alertar("Palavra-passe errada!", "danger");
      console.log("Palavra-passe errada!");
      break;
    case "auth/invalid-email":
      alertar("Endereço de e-mail não válido!", "danger");
      console.log("Endereço de e-mail não válido!");
      break;
    case "auth/user-disabled":
      alertar("Este utilizador foi desabilitado.", "danger");
      console.log("Este utilizador foi desabilitado.");
      break;
    case "auth/user-not-found":
      alertar("Utilizador não encontrado.", "danger");
      console.log("Utilizador não encontrado.");
      break;
    case "auth/too-many-requests":
      alertar(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
        "danger"
      );
      console.log(
        "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
      );
      break;
    case "auth/email-already-in-use":
      alertar("Já existe uma conta neste email.", "warning");
      console.log("Já existe uma conta neste email.");
      break;
    case "auth/weak-password":
      alertar(
        "Sua palavra passe é muito fraca, tente outra por favor.",
        "warning"
      );
      console.log("Sua palavra passe é muito fraca, tente outra por favor.");
      break;
    case "auth/operation-not-allowed":
      alertar("A conta neste email foi desativada.", "warning");
      console.log("A conta neste email foi desativada.");
      break;
    default:
      break;
  }
}

function alertar(message, type) {
  let Pai = document.querySelector(`#alerta`);

  console.log(Pai);
  let wrapper = document.createElement("div");
  wrapper.setAttribute("class", `alert alert-${type} mt-3 alert-dismissible`);
  wrapper.setAttribute("role", "alert");

  let mensagem = document.createElement("div");
  mensagem.innerHTML = `${message}`;

  wrapper.appendChild(mensagem);

  let btn = document.createElement("button");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn-close visually-hidden");
  btn.setAttribute("data-bs-dismiss", "alert");
  btn.setAttribute("aria-label", "Close");

  wrapper.appendChild(btn);
  Pai.appendChild(wrapper);

  setTimeout(() => {
    btn.click();
  }, [5000]);
}

function loadingBtn(btn) {
  let botao = document.querySelector(btn);
  botao.innerHTML = "Carregando...";

  let span = document.createElement("span");
  span.setAttribute("class", "spinner-border spinner-border-sm");
  span.setAttribute("role", "status");
  span.setAttribute("aria-hidden", "true");

  botao.appendChild(span);
}

async function getCurrentUser() {
  await firebase.auth().currentUser;
}

function showDetails(opId, cargo) {
  const footerD = document.querySelector("#footer-detail");
  const btnModal = document.getElementById("btnModal");
  footerD.innerHTML = "";

  let btnFechar = document.createElement("button");
  btnFechar.setAttribute("type", "button");
  btnFechar.setAttribute("id", `btn-f-${opId}`);
  btnFechar.setAttribute("class", "btn btn-secondary");
  btnFechar.setAttribute("data-bs-dismiss", `modal`);
  btnFechar.innerHTML = "Fechar";

  let btnDel = document.createElement("button");
  btnDel.setAttribute("type", "button");
  btnDel.setAttribute("class", "btn btn-danger");
  btnDel.innerHTML = "Eliminar operação";

  footerD.appendChild(btnFechar);
  cargo == "Administrador" ? footerD.appendChild(btnDel) : "";

  const dataDetails = {
    clientNome: document.getElementById("dt-nome-client"),
    card: {
      nome: document.getElementById("dt-cartao"),
      cambio: document.getElementById("dt-cambio"),
    },
    valorKz: document.getElementById("dt-valorKz"),
    valorDl: document.getElementById("dt-valorDl"),
    bancoEnt: document.getElementById("dt-banco-ent"),
    bancoSai: document.getElementById("dt-banco-sai"),
    data: document.getElementById("dt-data"),
    responsavel: document.getElementById("dt-responsavel"),
    horario: document.getElementById("dt-hora"),
    ramo: document.getElementById("dt-ramo"),
  };

  // console.log(dataDetails);
  firebase
    .firestore()
    .collection("jjb_op")
    .get()
    .then((snapshot) => {
      snapshot.docs.map((doc) => {
        if (doc.id == opId) {
          let dados = doc.data();
          firebase
            .firestore()
            .collection("users")
            .where("uid", "==", dados.user)
            .get()
            .then((snapshot) => {
              snapshot.docs.map((doc) => {
                let userName = doc.data().nome;
                // console.log(form, userName);

                dataDetails.clientNome.innerHTML = dados.clientNome;
                dataDetails.card.nome.innerHTML = dados.card.nome;
                dataDetails.card.cambio.innerHTML = dados.card.cambio;
                dataDetails.bancoEnt.innerHTML = dados.bancoEnt;
                dataDetails.bancoSai.innerHTML = dados.bancoSai;
                dataDetails.data.innerHTML = dados.data;
                dataDetails.horario.innerHTML = dados.horario;

                dataDetails.valorKz.innerHTML = dados.valorKz;
                dataDetails.valorDl.innerHTML = dados.valorDl;
                dataDetails.ramo.innerHTML =
                  dados.ramo == "jj"
                    ? "JJ DigiPay"
                    : dados.ramo == "jb"
                    ? "JB Virtual"
                    : "";
                dataDetails.responsavel.innerHTML = userName;
              });
            });
          btnDel.setAttribute(
            "onclick",
            `deleteOperation('${opId}','${dados.clientNome}','${dados.data}')`
          );
        }
      });
    });
  btnModal.click();
}

async function showCardsTab(ramo, cargo) {
  const pai = document.querySelector("#cartoes");

  let h6 = document.createElement("h5");
  h6.classList.add("h5");
  switch (ramo) {
    case "jj":
      h6.innerHTML = "Cartões JJ DigiPay";
      break;
    case "jb":
      h6.innerHTML = "Cartões JB Virtual";
      break;
    case "all":
      h6.innerHTML = "Todos Cartões";
      break;
    default:
      break;
  }

  const dados = await firebase
    .firestore()
    .collection("jjb_card")
    .where("order", "!=", "0")
    .where("ramo", "==", ramo)
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

  console.log("Aqui", dados);

  let th = [];
  for (let i = 0; i < 3; i++) {
    th[i] = document.createElement("th");
    th[i].setAttribute("scope", "col");
  }

  th[0].innerHTML = "Nome";
  th[1].innerHTML = "Câmbio";
  th[2].setAttribute("colspan", "2");
  cargo == "Administrador"
    ? (th[2].innerHTML = `<button title="Novo" class="btn btn-success btn-sm m-1" onclick="config_mod('new', '${ramo}','card')"
  style="border-radius: 50%; height: 35px; width: 35px;" title="Criar novo"></button>`)
    : "";

  let trH = document.createElement("tr");

  trH.appendChild(th[0]);
  trH.appendChild(th[1]);
  trH.appendChild(th[2]);

  let thead = document.createElement("thead");
  thead.appendChild(trH);

  let table = document.createElement("table");
  table.classList.add("table");

  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  dados.forEach((arq) => {
    let campo = [];
    for (let i = 0; i < 3; i++) {
      campo[i] = document.createElement("td");
    }
    campo[0].innerHTML = arq.type;
    campo[1].innerHTML = arq.cambio + " Kz";
    cargo == "Administrador"
      ? (campo[2].innerHTML = `<button title="Editar" class="btn btn-primary btn-sm m-1" onclick="config_mod('edit', '${arq.id}','card')"
       style="border-radius: 50%; height: 35px; width: 35px;" title="Novo cliente"></button>
       <button title="Apagar" class="btn btn-danger btn-sm m-1" onclick="config_mod('del', '${arq.id}','card')"
       style="border-radius: 50%; height: 35px; width: 35px;" title="Novo cliente"></button>`)
      : "";

    let tr = document.createElement("tr");

    tr.appendChild(campo[0]);
    tr.appendChild(campo[1]);
    tr.appendChild(campo[2]);

    tbody.appendChild(tr);

    table.appendChild(tbody);
  });

  pai.appendChild(h6);
  pai.appendChild(table);
}

async function showBanksTab(ramo, cargo) {
  const pai = document.querySelector("#bancos");

  let h6 = document.createElement("h5");
  h6.classList.add("h5");
  switch (ramo) {
    case "jj":
      h6.innerHTML = "Bancos JJ DigiPay";
      break;
    case "jb":
      h6.innerHTML = "Bancos JB Virtual";
      break;
    case "all":
      h6.innerHTML = "Todos Bancos";
      break;
    default:
      break;
  }

  var dados;

  if (ramo == "all") {
    dados = await firebase
      .firestore()
      .collection("jjb_banks")
      .where("order", "!=", 0)
      .where("ramo", "in", ["jj", "jb", "all"])
      .get()
      .then((snapshot) => {
        const operations = {
          data: snapshot.docs.map((doc) => doc.data()),
          id: snapshot.docs.map((doc) => doc.id),
        };
        // console.log("Exp", operations);
        return operations;
      });
  } else {
    dados = await firebase
      .firestore()
      .collection("jjb_banks")
      .where("order", "!=", 0)
      .where("ramo", "in", [ramo, "all"])
      .get()
      .then((snapshot) => {
        const operations = {
          data: snapshot.docs.map((doc) => doc.data()),
          id: snapshot.docs.map((doc) => doc.id),
        };
        // console.log("Exp", operations);
        return operations;
      });
  }
  console.log(dados.data);

  let th = [];
  for (let i = 0; i < 3; i++) {
    th[i] = document.createElement("th");
    th[i].setAttribute("scope", "col");
  }

  th[0].innerHTML = "Banco";
  th[1].innerHTML = "Metodo";
  th[2].setAttribute("colspan", "2");
  cargo == "Administrador"
    ? (th[2].innerHTML = `<button title="Editar" class="btn btn-success btn-sm m-1" onclick="config_mod('new', '${dados.id}','banks')"
  style="border-radius: 50%; height: 35px; width: 35px;" title="Criar novo"></button>`)
    : "";

  let trH = document.createElement("tr");

  trH.appendChild(th[0]);
  trH.appendChild(th[1]);
  trH.appendChild(th[2]);

  let thead = document.createElement("thead");
  thead.appendChild(trH);

  let table = document.createElement("table");
  table.classList.add("table");

  table.appendChild(thead);

  let tbody = document.createElement("tbody");

  dados.data.forEach((arq, index) => {
    let campo = [];
    for (let i = 0; i < 3; i++) {
      campo[i] = document.createElement("td");
    }
    campo[0].innerHTML = arq.nome;
    campo[1].innerHTML = arq.method == "in" ? "Entrada" : "Saída";
    cargo == "Administrador"
      ? (campo[2].innerHTML = `<button title="Editar" class="btn btn-primary btn-sm m-1" onclick="config_mod('edit', '${dados.id[index]}','banks')"
       style="border-radius: 50%; height: 35px; width: 35px;"></button>
       <button title="Apagar" class="btn btn-danger btn-sm m-1" onclick="config_mod('del', '${dados.id[index]}','banks')"
       style="border-radius: 50%; height: 35px; width: 35px;"></button>`)
      : "";

    let tr = document.createElement("tr");

    tr.appendChild(campo[0]);
    tr.appendChild(campo[1]);
    tr.appendChild(campo[2]);

    tbody.appendChild(tr);

    table.appendChild(tbody);
  });

  pai.appendChild(h6);
  pai.appendChild(table);
}

async function config_mod(mode, id, target) {
  const body = document.querySelector("#body-edit-del");
  const label = document.querySelector("#edit-delLabel");
  const btnModal = document.getElementById("btnModal-edit-del");
  let footer = document.getElementById("footer-ed-del");

  const db = await firebase
    .firestore()
    .collection(`jjb_${target}`)
    .doc(id)
    .get()
    .then((snapshot) => snapshot.data());

  footer.innerHTML = "";
  body.innerHTML = "";
  label.innerHTML = "";

  // console.log('tipo',db.type);
  if (mode == "edit") {
    label.innerHTML = "Editar";

    let btnFechar = document.createElement("button");
    btnFechar.setAttribute("type", "button");
    btnFechar.setAttribute("class", "btn btn-secondary m-1");
    btnFechar.setAttribute("data-bs-dismiss", `modal`);
    btnFechar.setAttribute("id", db.type + "-fechar");
    btnFechar.innerHTML = "Cancelar";

    let btnConfirm = document.createElement("button");
    btnConfirm.setAttribute("type", "button");
    btnConfirm.setAttribute("class", "btn btn-primary m-1");
    btnConfirm.setAttribute("value", `${id}`);
    btnConfirm.setAttribute("onclick", `${target}Update(this.value)`);

    btnConfirm.innerHTML = "Confirmar";

    let divRow = document.createElement("div");
    divRow.classList.add("row");

    let divCol = [];
    let labelForm = [];

    let input = document.createElement("input");
    input.classList.add("form-control");

    for (let i = 0; i < 2; i++) {
      divCol[i] = document.createElement("div");
      divCol[i].classList.add("col");

      labelForm[i] = document.createElement("label");
      labelForm[i].classList.add("form-label");
    }

    if (target == "banks") {
      let select = document.createElement("select");
      let option = document.createElement("option");
      let option2 = document.createElement("option");

      option.innerHTML = "Entrada";
      option.value = "in";

      option2.innerHTML = "Saída";
      option.value = "out";

      select.classList.add("form-select");
      select.appendChild(option);
      select.appendChild(option2);

      db.method == "in"
        ? option.setAttribute("selected", "")
        : option2.setAttribute("selected", "");

      labelForm[0].innerHTML = "Banco";
      labelForm[1].innerHTML = "Metódo";

      input.value = db.nome;

      divCol[1].appendChild(labelForm[1]);
      divCol[1].appendChild(select);
    }

    if (target == "card") {
      labelForm[0].innerHTML = "Descrição";
      labelForm[1].innerHTML = "Câmbio";

      let inputV = document.createElement("input");
      inputV.classList.add("form-control");

      inputV.value = db.cambio;
      inputV.setAttribute("id", "inp-Card-valor-up");
      input.value = db.type;
      input.setAttribute("id", "inp-Card-desc-up");

      divCol[1].appendChild(labelForm[1]);
      divCol[1].appendChild(inputV);
    }

    divCol[0].appendChild(labelForm[0]);
    divCol[0].appendChild(input);

    divRow.appendChild(divCol[0]);
    divRow.appendChild(divCol[1]);

    body.appendChild(divRow);
    footer.classList.add("modal-footer");
    footer.appendChild(btnFechar);
    footer.appendChild(btnConfirm);

    console.log(id, "editado");
  }

  if (mode == "del") {
    let nome = target == "banks" ? `Banco ${db.nome}` : `Cartão ${db.type}`;
    footer.classList.remove("modal-footer");
    label.innerHTML = `Deseja realmente apagar ${nome}?`;

    let btnFechar = document.createElement("button");
    btnFechar.setAttribute("type", "button");
    btnFechar.setAttribute("class", "btn btn-secondary m-1");
    btnFechar.setAttribute("data-bs-dismiss", `modal`);
    btnFechar.innerHTML = "Não";

    let btnConfirm = document.createElement("button");
    btnConfirm.setAttribute("type", "button");
    btnConfirm.setAttribute("class", "btn btn-danger m-1 float-right");
    btnConfirm.setAttribute("value", `${id}`);
    btnConfirm.setAttribute("onclick", `${target}Delete(this.value)`);
    btnConfirm.innerHTML = "Sim";

    footer.classList.add("modal-footer");
    footer.appendChild(btnFechar);
    footer.appendChild(btnConfirm);

    console.log(id, "apagado");
  }

  if (mode == "new") {
    label.innerHTML = "Criar";

    let btnFechar = document.createElement("button");
    btnFechar.setAttribute("type", "button");
    btnFechar.setAttribute("class", "btn btn-secondary m-1");
    btnFechar.setAttribute("data-bs-dismiss", `modal`);
    // btnFechar.setAttribute("id", db.type + "-fechar");
    btnFechar.innerHTML = "Cancelar";

    let btnConfirm = document.createElement("button");
    btnConfirm.setAttribute("type", "button");
    btnConfirm.setAttribute("class", "btn btn-primary m-1");
    btnConfirm.innerHTML = "Enviar";
    btnConfirm.setAttribute("onclick", `${target}Create('${id}')`);

    let divRow = document.createElement("div");
    divRow.classList.add("row");

    let divCol = [];
    let labelForm = [];

    let input = document.createElement("input");
    input.classList.add("form-control");

    for (let i = 0; i < 2; i++) {
      divCol[i] = document.createElement("div");
      divCol[i].classList.add("col");

      labelForm[i] = document.createElement("label");
      labelForm[i].classList.add("form-label");
    }

    if (target == "banks") {
      let select = document.createElement("select");
      let option = document.createElement("option");
      let option2 = document.createElement("option");

      option.innerHTML = "Entrada";
      option.value = "in";

      option2.innerHTML = "Saída";
      option.value = "out";

      select.classList.add("form-select");
      select.appendChild(option);
      select.appendChild(option2);

      labelForm[0].innerHTML = "Banco";
      labelForm[1].innerHTML = "Metódo";

      divCol[1].appendChild(labelForm[1]);
      divCol[1].appendChild(select);
    }

    if (target == "card") {
      labelForm[0].innerHTML = "Descrição";
      labelForm[1].innerHTML = "Câmbio";

      let inputV = document.createElement("input");
      inputV.classList.add("form-control");

      inputV.setAttribute("id", "inp-Card-valor-ct");
      input.setAttribute("id", "inp-Card-desc-ct");

      divCol[1].appendChild(labelForm[1]);
      divCol[1].appendChild(inputV);
    }

    divCol[0].appendChild(labelForm[0]);
    divCol[0].appendChild(input);

    divRow.appendChild(divCol[0]);
    divRow.appendChild(divCol[1]);

    body.appendChild(divRow);
    footer.classList.add("modal-footer");
    footer.appendChild(btnFechar);
    footer.appendChild(btnConfirm);

    console.log("criar novo");
  }
  btnModal.click();
}

async function terminarDia() {
  const operations = await showOperations("today", User.uid);
  console.log(operations.length == 0);
  if (operations.length == 0) {
    console.log("maluco");
  } else if (operations.length != 0) {
    let btn = document.getElementById("btnModal-fimDay");
    let footer = document.getElementById("footer-fimDay");
    footer.classList.remove("modal-footer");
    footer.innerHTML = "";

    let button = document.createElement("button");
    button.setAttribute("onclick", "calcularDia()");
    button.setAttribute("class", "btn btn-primary");
    button.innerHTML = "Enviar";

    let btnFechar = document.createElement("button");
    btnFechar.setAttribute("type", "button");
    btnFechar.setAttribute("id", "fechar-fimDay");
    btnFechar.setAttribute("class", "btn btn-secondary m-1");
    btnFechar.setAttribute("data-bs-dismiss", `modal`);
    btnFechar.innerHTML = "Fechar";

    footer.classList.add("modal-footer");
    footer.appendChild(btnFechar);
    document.getElementById("cambioAtual").addEventListener("change", (e) => {
      if (e.target.value > 100) {
        footer.appendChild(button);
      } else {
        footer.children.length > 0
          ? (footer.classList.remove("modal-footer"),
            footer.removeChild(btnFechar),
            footer.removeChild(button))
          : footer.classList.remove("modal-footer");
      }
      // console.log(e.target.value);
    });

    btn.click();
  }
}

async function calcularDia() {
  let cambilAtual = document.getElementById("cambioAtual").value;
  document.getElementById("fechar-fimDay").click();

  console.log(cambilAtual);

  const dataOp = await firebase
    .firestore()
    .collection("jjb_op")
    .where("data", "==", reg_Diario.data)
    .where("user", "==", User.uid)
    .get()
    .then((snapshot) => {
      const operations = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(operations);
      return operations;
    });

  dataOp.forEach(async (doc, index) => {
    reg_Diario.totalDl += doc.valorDl;
    reg_Diario.totalKz += doc.valorKz;
    reg_Diario.numClientes++;
    reg_Diario.ops[index] = doc.id;
  });
  reg_Diario.lucro = reg_Diario.totalKz - reg_Diario.totalDl * cambilAtual;
  reg_Diario.user = User.uid;
  // console.log(reg_Diario);

  firebase
    .firestore()
    .collection("jjb_reg_dia")
    .add(reg_Diario)
    .then(() => {
      alertar("Dia de Trabalho registado", "success");
      setTimeout(() => {
        alertar("Poderá consultar o registo no menu 'Contas'", "success");
      }, 1000);
      setTimeout(() => {
        Reload();
      }, 2200);
    });
}

// Config.............................
async function cardUpdate(id) {
  const card = {
    cambio: document.getElementById("inp-Card-valor-up").value,
    type: document.getElementById("inp-Card-desc-up").value,
  };

  let btnFechar = document.getElementById(card.type + "-fechar");
  console.log(btnFechar);

  const cardDb = await firebase
    .firestore()
    .collection("jjb_card")
    .doc(id)
    .get()
    .then((snapshot) => {
      // const cards = snapshot.docs.map((doc) => doc.data());
      // console.log(snapshot);
      return snapshot.data();
    });

  if (card.cambio != cardDb.cambio || card.type != cardDb.type) {
    firebase
      .firestore()
      .collection("jjb_card")
      .doc(id)
      .update(card)
      .then((snapshot) => {
        btnFechar.click();
        Reload();
      })
      .catch((err) => {
        console.log("Erro ao atualizar", err);
        btnFechar.click();
      });
    // console.log(cardDb);
    // console.log(card);
  }
}

async function cardCreate(ramoN) {
  const card = {
    cambio: document.getElementById("inp-Card-valor-ct").value,
    order: "",
    ramo: ramoN,
    type: document.getElementById("inp-Card-desc-ct").value,
  };

  // let btnFechar = document.getElementById(card.type + "-fechar");
  // console.log(btnFechar);

  const maxOrder = await firebase
    .firestore()
    .collection("jjb_card")
    .orderBy("order", "desc")
    .get()
    .then((snapshot) => {
      const cards = snapshot.docs.map((doc) => doc.data());
      // console.log(snapshot);
      return parseInt(cards[0].order);
    });

  card.order = maxOrder + 1;
  console.log(maxOrder);

  if (card.cambio != "" || card.type != "") {
    firebase
      .firestore()
      .collection("jjb_card")
      .add(card)
      .then((snapshot) => {
        // btnFechar.click();
        Reload();
      })
      .catch((err) => {
        console.log("Erro ao atualizar", err);
        // btnFechar.click();
      });
    // console.log(cardDb);
    // console.log(card);
  }
}

function cardDelete(id) {
  firebase
    .firestore()
    .collection("jjb_card")
    .doc(id)
    .delete()
    .then((snapshot) => {
      // btnFechar.click();
      Reload();
    });
}

// Firebase
//
//
//
//
// Firebase initialization
function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDb2e4DpNdaYF9QrO1DIBrzLpzNRANKNaM",
    authDomain: "jjb-virtual.firebaseapp.com",
    projectId: "jjb-virtual",
    storageBucket: "jjb-virtual.appspot.com",
    messagingSenderId: "615811618989",
    appId: "1:615811618989:web:613d2b3c065e0cbab14e24",
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// firebase.storage()

function imagem() {
  console.log(Client.bi.img);
}

// document.getElementById("bi-img").addEventListener('change', (event) => {
//   console.log(event.target)
// })
// ----------------------------- Firebase auth

function logOut() {
  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.location.href.includes("cadastro.html"))
          navigate("login.html");
        else navigate("auth/login.html");
      });
  }
}

function login() {
  //Pegar valores do formulario
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);
  //validar se nenhum dos campos está nulo
  if (email && password) {
    //Faz a requisição de login, passando o email e password como parametros
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //Caso a requisição seja bem sucedida

        // firebase.firestore().collection('users').where('uid','==',)
        alertar("Login efetuado com sucesso!", "success");

        document.getElementById("password").value = "";
        document.getElementById("email").value = "";

        // setTimeout(() => {
        //   navigate("../home.html");
        // }, [1000]);
      })
      .catch((error) => {
        //Caso a requisição dê erro

        //Reseta campo do formulario
        document.getElementById("password").value = "";

        //Chamada da função validaAuth
        validaAuth(error.code);
      });
  } else {
    //se email nulo mostra o allerta
    email ? "" : alertar("O campo email é obrigatório", "warning");
    //se password nula mostra o allerta
    password ? "" : alertar("O campo palavra passe é obrigatório", "warning");
  }
}

async function cadastrar() {
  const new_User = {
    nome: document.getElementById("nome").value,
    cargo: document.getElementById("cargo").value,
    ramo: document.getElementById("ramo").value,
    uid: "",
  };

  email = document.getElementById("email").value;
  email_conf = document.getElementById("emailCf").value;
  password = "jjb2021_2022";

  if (email != email_conf) {
    alertar("A confirmação do email não confere", "danger");
  } else if (!nome || !cargo || !ramo || !email) {
    alertar("Preencha todos os campos", "warning");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((_new) => {
        loadingBtn("#cadastrar");
        new_User.uid = _new.user.uid;
        console.log(new_User);

        //
        firebase
          .firestore()
          .collection("users")
          .add(new_User)
          .then(() => {
            //

            alertar("conta criada com sucesso", "success");
            // console.log(_new.user.uid);
            setTimeout(() => {
              alertar(
                "Enviando mensagem para o email do proprietario...",
                "success"
              );
              recoverPassword(email);
            }, [2000]);
            setTimeout(() => {
              alertar(
                "A sua sessão será terminada. Apenas para evitar conflito de autenticação",
                "warning"
              );
            }, [4000]);
            setTimeout(() => {
              logOut();
            }, [8000]);
          });
      })
      .catch((error) => {
        validaAuth(error.code, "Registar");
      });
  }
}

function recoverPassword(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alertar(
        "Foi enviado para o email " +
          email +
          " um link para definir a password. Deve verifique o Spam",
        "success"
      );
    })
    .catch((error) => {
      validaAuth(error.code, "Entrar");
    });
}

//1. total diario, de todo mundo
//2. total mensal, de todo mundo*

//Canvas

function graphic(dados) {
  console.log(dados);
  let data = {
    labels: dados.data,
    datasets: [
      {
        label: "Lucro Mensal",
        data: dados.valor,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  let options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  let ctx = document.getElementById("line-chart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
}

//Filter
function createFilterBar() {
  let Pai = document.querySelector("#filterBar");

  let numFilter = 4;

  //
  let div = [];
  for (let i = 0; i <= numFilter; i++) {
    div[i] = document.createElement("div");
    div[i].classList.add("form-group", "col", "p-0");
  }

  let input = document.createElement("input");
  input.setAttribute("type", "date");
  input.setAttribute("id", "dateInputIn");
  input.classList.add("form-control");

  if (path.includes("contas.html")) {
    input.setAttribute("title", "De");

    let input2 = document.createElement("input");
    input2.setAttribute("type", "date");
    input2.setAttribute("title", "Até");
    input2.setAttribute("id", "dateInputOut");
    input2.classList.add("form-control");

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-secondary");
    button.setAttribute(
      "onclick",
      "getContas(User.cargo,dateInputIn.value,dateInputOut.value)"
    );
    button.innerHTML = "Filtrar";

    div[0].appendChild(input);
    div[1].appendChild(input2);
    div[2].appendChild(button);

    Pai.appendChild(div[0]);
    Pai.appendChild(div[1]);
    Pai.appendChild(div[2]);
  } else {
    div[0].appendChild(
      createSelect("clientOption", ["João", "Paulo", "Antonio"], "Cliente")
    );

    div[1].appendChild(
      createSelect(
        "cardOption",
        ["Facebook", "Google Ads", "Netflix"],
        "Cartão"
      )
    );
    div[2].appendChild(input);

    div[3].appendChild(
      createSelect(
        "responsableOption",
        ["Mateus", "Maria", "Jumar"],
        "Responsavel"
      )
    );

    Pai.appendChild(div[0]);
    Pai.appendChild(div[1]);
    Pai.appendChild(div[2]);
    Pai.appendChild(div[3]);
  }

  function createSelect(idSelect, opNameList, listOf) {
    let select = document.createElement("select");

    select.setAttribute("class", "form-control");
    select.setAttribute("id", idSelect);

    let op = document.createElement("option");
    op.setAttribute("selected", "");
    op.setAttribute("disabled", "");
    op.innerHTML = listOf;

    select.appendChild(op);

    for (let i = 0; i < opNameList.length; i++) {
      let op = document.createElement("option");
      op.setAttribute("value", opNameList[i]);
      op.innerHTML = opNameList[i];

      select.appendChild(op);
    }

    return select;
  }
}
