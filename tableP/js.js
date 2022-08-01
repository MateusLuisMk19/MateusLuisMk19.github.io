var NamePt = [
  {
    atomicNumber: "1",
    name: "Hidrogênio",
  },
  {
    atomicNumber: "2",
    name: "Hélio",
  },
  {
    atomicNumber: "3",
    name: "Lítio",
  },
  {
    atomicNumber: "4",
    name: "Berílio",
  },
  {
    atomicNumber: "5",
    name: "Boro",
  },
  {
    atomicNumber: "6",
    name: "Carbono",
  },
  {
    atomicNumber: "7",
    name: "Nitrogênio",
  },
  {
    atomicNumber: "8",
    name: "Oxigênio",
  },
  {
    atomicNumber: "9",
    name: "Flúor",
  },
  {
    atomicNumber: "10",
    name: "Neônio",
  },
  {
    atomicNumber: "11",
    name: "Sódio",
  },
  {
    atomicNumber: "12",
    name: "Magnésio",
  },
  {
    atomicNumber: "13",
    name: "Alumínio",
  },
  {
    atomicNumber: "14",
    name: "Silício",
  },
  {
    atomicNumber: "15",
    name: "Fosforo",
  },
  {
    atomicNumber: "16",
    name: "Enxofre",
  },
  {
    atomicNumber: "17",
    name: "Cloro",
  },
  {
    atomicNumber: "18",
    name: "Argônio",
  },
  {
    atomicNumber: "19",
    name: "Potássio",
  },
  {
    atomicNumber: "20",
    name: "Cálcio",
  },
];

NamePt.map(function (item) {
  //get element by class
  var element = document.getElementsByClassName("name " + item.atomicNumber);

  element.map(function (elem) {
    elem.innerHTML = item.name;
  });

  console.log(item.atomicNumber);
  console.log(item.name);
});
