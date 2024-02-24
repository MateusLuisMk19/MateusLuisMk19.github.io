document.addEventListener("DOMContentLoaded", async () => {
  // console.log("inicio");
  _FIRE.initFirebase();

  _aux.checkChangeState();

  _html.elemento(
    "form",
    ["class"],
    ["d-flex mb-3"],
    "conteudo",
    `<input class="form-control inp" type="search" placeholder="Pesquisar" 
    aria-label="Pesquisar">`
  );

  html_Comp.bandeja();


  async function makeUrl(type,another){
    let url = "https://www.alphavantage.co/query?function="
    let api = await Store.getDoc("apikey","Wekw4qc0hi1OnzOTMxj3")

    switch (type) {
      case "cambio":
        return url+`CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=${api.key}`
        break;
    
      default:
        break;
    }
  }
  fetch(
    makeUrl("cambio")
  )
    .then((response) => response.json())
    .then((data) => {
      // faça algo com os dados retornados
      console.log(data);
    })
    .catch((error) => {
      // trate erros de requisição
    });
});
