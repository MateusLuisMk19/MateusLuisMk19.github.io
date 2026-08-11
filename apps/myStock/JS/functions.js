//Data
const dt = new Date();
const today = {
  dia: dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate() + "",
  mes:
    1 + dt.getUTCMonth() < 10
      ? "0" + (1 + dt.getUTCMonth())
      : "" + (1 + dt.getUTCMonth()),
  ano: dt.getFullYear(),

  date() {
    return this.ano + "-" + this.mes + "-" + this.dia;
  },
};

//Navegação
const Url = {
  path: window.location.href,
  params: new URLSearchParams(window.location.search),
};

//Territorio
const ativos = {
  ID: "",
  area: "",
  disponivel: false,
  num: "",
  num_casas: 0,
  observacao: "",
  referencias: [],
};

//-------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

const html_Comp = {
  navBar() {
    let color = "white";
    //Nav
    _html.elemento(
      "nav",
      ["class"],
      [`navbar navbar-expand-lg navbar-dark bg-dark p-0`],
      "nav" /* div com id #nav */,
      `
      <div class="container-fluid p-0 ">
        <a class="navbar-brand" ondblclick="html_Comp.authModal('show')"
          style="font-size:2.3rem; padding: 0px 8px 0px 8px;" href="#">
          <span id="my">my</span>Stock</a>
        <div class="p-2">
          <a class="btn btn-link" onclick="_Auth.logOut()" >Logout
          </a>
          
        </div>

      </div>`
    );
  },

  async bandeja() {
    _html.elemento("div", ["id"], ["bdj"], "conteudo");

    //pegar na firestore as info dos jogos
    //const territorios = await Store.getCollection("territorios");
    // console.log(gamesList);

    _html.elemento(
      "div",
      ["class", "id"],
      ["row justify-content-md-start", "linha"],
      "bdj"
    );
  },
};

//Criar um elemento html
const _html = {
  //Criar um elemento html com valor/Conteudo de texto
  //  nome -      string ""           //Nome do elemento a ser criado
  //  des_Attr -  String Array [""]   //Array com as descrições dos atributos (Ex. id, class, etc)
  //  v_Attrs -   String Array [""]   //Array com os valores dos atributos acima citados
  //      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "id" ! v_Attrs[0] == "myId"  )
  //  e_Pai -     string ""           //id do elemento pai para o elemento (apenas texto, sem #)
  //  txtHtml -   string ""           //texto que será inserido no corrpo do elemento
  //
  //Ex. criarElemento("h2", ["id","class"], ["titulo","conteudo"], "box1", "Como faze...")
  elemento(
    nome_tag,
    atributos_tag,
    valores_dos_atributos,
    elemento_Pai,
    innerText_tag
  ) {
    let PAI = document.querySelector(`#${elemento_Pai}`);
    let n_Attr = atributos_tag.length;
    let elemento = document.createElement(`${nome_tag}`);

    if (atributos_tag != "") {
      for (let e = 0; e < n_Attr; e++) {
        elemento.setAttribute(
          `${atributos_tag[e]}`,
          `${valores_dos_atributos[e]}`
        );
      }
    }

    if (innerText_tag) {
      elemento.innerHTML = innerText_tag;
    }
    // console.log("pai", PAI);
    PAI.appendChild(elemento);
  },

  //Cria a lista de navegação, os nomes identificadores das paginas no menu
  //  classUl -   string    [""]      //Classes para a tag Ul
  //  textLi -    array     [""]      //nomes dos li, os titulos que aparecerão na barra
  //  classA -    array     [""]      //classes para cada tag a correspondente aos nomes acima citados
  //  func -                          //função pro onclick (Enviar com "") Ex. "funcao(parametros)"
  //  e_Pai -     string    ""        //id do elemento pai para o elemento (apenas texto, sem #)
  //Ex. navbar_list("navbar-nav ",["Home", "Histórico"],[`nav-link active`, `nav-link disabled`],[" ", " "],"navbarCollapse")
  navbar_list(
    class_navbar,
    lista_de_menu,
    class_p_iten_da_lista,
    funcao_p_iten_da_lista,
    elemento_Pai
  ) {
    let Pai = document.querySelector(`#${elemento_Pai}`);
    let numLi = lista_de_menu.length;

    let ul = document.createElement("ul");
    ul.setAttribute("class", `${class_navbar}`);

    for (let e = 0; e < numLi; e++) {
      let li = document.createElement(`li`);
      li.setAttribute("class", `nav-item`);

      let a = document.createElement("a");
      a.setAttribute("class", `${class_p_iten_da_lista[e]}`);
      a.setAttribute("style", `cursor: pointer;`);
      a.setAttribute("onclick", funcao_p_iten_da_lista[e]);
      a.innerHTML = `${lista_de_menu[e]}`;

      li.appendChild(a);
      ul.appendChild(li);
    }

    Pai.appendChild(ul);
  },

  //Criar um elemento Form-Floating, imput e label dentro de uma div
  //  id          string ""           //id do imput e que vai pro campo "for" da Label
  //  des_Attr    String Array [""]   //Array com as descrições dos outros atributos (fora o id) (Ex. value, class, etc)
  //  v_Attrs     String Array [""]   //Array com os valores dos atributos acima citados
  //      NB: A descrição e o valor devem estar nas mesmas posições em seus respectivos Arrays (Ex. des_Attrs[0] == "type" ! v_Attrs[0] == "text"  )
  //  e_Pai       string ""           //id do elemento pai para a div (apenas texto, sem #)
  //  mb          number 0-5          //margem bottom
  //
  //Ex. criarElemento("input", ["type","class"], ["text","form-control"], "box1", 4)
  criarElementoFF(id, des_Attrs, v_Attrs, e_Pai, mb) {
    const PAI = document.querySelector(`#${e_Pai}`);
    let n_Attr = des_Attrs.length;

    let div = document.createElement(`div`);
    div.setAttribute("class", `form-floating mb-${mb}`);
    PAI.appendChild(div);

    let input = document.createElement(`input`);
    for (let e = 0; e < n_Attr; e++) {
      input.setAttribute(`${des_Attrs[e]}`, `${v_Attrs[e]}`);
    }
    input.setAttribute("id", `${id}`);
    div.appendChild(input);

    let label = document.createElement(`label`);
    label.setAttribute("for", `${id}`);
    label.innerHTML = v_Attrs[v_Attrs.length - 1];
    div.appendChild(label);
  },
};

const _Auth = {
  //Valida a autenticação
  //Recebendo os codigos de erro, traduzindo para portugues
  //E criando alertas
  //    code    string    //codigo de erro
  //    who     string    //se refere a pra quem será o alerta, o nome depois de "alert-"
  validaAuth(code) {
    switch (code) {
      case "auth/wrong-password":
        _aux.alertar("Palavra-passe errada!", "danger");
        console.log("Palavra-passe errada!");
        break;
      case "auth/invalid-email":
        _aux.alertar("Endereço de e-mail não válido!", "danger");
        console.log("Endereço de e-mail não válido!");
        break;
      case "auth/user-disabled":
        _aux.alertar("Este utilizador foi desabilitado.", "danger");
        console.log("Este utilizador foi desabilitado.");
        break;
      case "auth/user-not-found":
        _aux.alertar("Utilizador não encontrado.", "danger");
        console.log("Utilizador não encontrado.");
        break;
      case "auth/too-many-requests":
        _aux.alertar(
          "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos",
          "danger"
        );
        console.log(
          "Devida a atividades suspeitas, deverá tentar de novo em alguns minutos."
        );
        break;
      case "auth/email-already-in-use":
        _aux.alertar("Já existe uma conta neste email.", "warning");
        console.log("Já existe uma conta neste email.");
        break;
      case "auth/weak-password":
        _aux.alertar(
          "Sua palavra passe é muito fraca, tente outra por favor.",
          "warning"
        );
        console.log("Sua palavra passe é muito fraca, tente outra por favor.");
        break;
      case "auth/operation-not-allowed":
        _aux.alertar("A conta neste email foi desativada.", "warning");
        console.log("A conta neste email foi desativada.");
        break;
      default:
        break;
    }
  },

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        if (window.location.href.includes("index.html"))
          _aux.Navigate("login.html");
        else _aux.Navigate("login.html");
      });
  },

  login() {
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
          _aux.alertar("Login efetuado com sucesso!", "success");

          document.getElementById("password").value = "";
          document.getElementById("email").value = "";
        })
        .catch((error) => {
          //Caso a requisição dê erro

          //Reseta campo do formulario
          document.getElementById("password").value = "";

          //Chamada da função validaAuth
          this.validaAuth(error.code);
        });
    } else {
      //se email nulo mostra o allerta
      email ? "" : _aux.alertar("O campo email é obrigatório", "warning");
      //se password nula mostra o allerta
      password
        ? ""
        : _aux.alertar("O campo palavra passe é obrigatório", "warning");
    }
  },
};

const _FIRE = {
  //FireBase Initialization
  initFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyCSo393vw0As6p9ff_LR-xQVxIjwKUgnw0",
      authDomain: "mystocks-1217b.firebaseapp.com",
      projectId: "mystocks-1217b",
      storageBucket: "mystocks-1217b.appspot.com",
      messagingSenderId: "978382151874",
      appId: "1:978382151874:web:a5479c644b05d8f03b9b5b",
      experimentalForceLongPolling: true, // this line
      useFetchStreams: false, // and this line
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
  },

  authLogin() {
    // console.log("Login in");
    addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        // console.log("clicou");
        document.getElementById("entrar").click();
      }
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        _aux.Navigate("index.html");
      }
    });
  },
};

const Store = {
  //where ["uid","==","dkcnnnue77rhf7rh7"]
  async getCollection(collection, where, order) {
    const db = firebase.firestore();
    let dados = "";

    const dbRe = where
      ? db.collection(collection).where(where[0], where[1], where[2])
      : db.collection(collection);

    const dbRef = order ? dbRe.orderBy(order[0], order[1]) : dbRe;

    const data = await dbRef.get().then((userData) => {
      dados = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // console.log("dados", dados);
      // const dados = userData.docs.map((doc) => doc.data());
      let array = [];

      dados.forEach((dt) => {
        array.push(dt);
      });

      // console.log("array", array);

      return array;
    });

    return data;
  },

  async getDoc(collection, doc) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const DOC = await dbRef.get().then((docc) => {
      /*         let fich = {
          ...docc.data()
        };
        return fich;
 */
      // console.log(docc.data());
      return docc.data();
    });

    return DOC;
  },

  async getDocWhere(collection, where, who) {
    const db = firebase.firestore();
    let dados = "";

    const dbRef = where
      ? db.collection(collection).where(where[0], where[1], where[2])
      : db.collection(collection);

    const data = await dbRef.get().then((userData) => {
      dados = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return dados[0];
    });

    // console.log(data)
    if (who) {
      switch (who) {
        case "id":
          return data.id;
          break;
        case "name":
          return data.name;
          break;

        default:
          break;
      }
    }
    return data;
  },

  async updateDoc(collection, doc, data) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const updated = await dbRef.update(data).then(() => {
      return true;
    });

    return updated;
  },

  async addDoc(collection, data) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection);

    await dbRef.add(data).then(() => {
      console.log(data);
      return true;
    });
  },

  async deleteDoc(collection, doc) {
    const db = firebase.firestore();

    const dbRef = db.collection(collection).doc(doc);

    const isDel = await dbRef.delete().then(() => {
      return true;
    });

    return isDel;
  },
};

const _aux = {
  Reload() {
    window.location.reload(false);
  },

  async Navigate(url) {
    let last = "";
    let urlx = "";

    if (!window.location.href.includes("/html")) {
      urlx = "/index.html";
    } else {
      urlx = _aux.sliceTxt(window.location.href, "/html");
    }

    setTimeout(() => {
      window.location.href = url;
      // console.log("Mudado");
    }, 200);
  },

  toCaptalize(string) {
    let newString = "";
    let stUpper = string.toLocaleUpperCase();

    for (var i = 0; i < string.length; i++) {
      i == 0 ? (newString += stUpper[i]) : (newString += string[i]);
    }
    // console.log(newString);
    return newString;
  },

  async checkChangeState() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (!user && !Url.path.includes("login.html")) {
        if (Url.path.includes("index.html")) _aux.Navigate("login.html");
        else _aux.Navigate("login.html");
      }
      if (Url.path.includes("login.html")) _FIRE.authLogin();
      else {
        html_Comp.navBar();
      }
    });
  },

  //Cria os alestas dentro de divs
  //  meessage    string      //mensagem que aparecerá no alerta
  //  type        string      //tipo de alerta
  //                            success - para alertas de sucesso
  //                            warning - para alertas de aviso
  //                            danger - para alertas de erro
  alertar(message, type) {
    let Pai = document.querySelector(`#alert`);

    // console.log(Pai);
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
  },
};

// ^////////////////////////////////////////////////////////////////////////////////////////////////////////////
