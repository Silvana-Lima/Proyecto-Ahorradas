// ****---- Functions ----****
console.log(operations);
const filterByType = (operations, filter) => {

  let type = [];
  if (filter === "todos") {
    type = operations;
  } else {
    type = operations.filter((operation) => operation.tipo === filter)
  }
  return type;
};

const filterByCategory = (operations, filter) => {

  let category = [];
  if (filter === "todas") {
    category = operations;
  } else {
   category = operations.filter((operation) => operation.categoria === filter)
  }
  return category;

};

function convertirFecha (fechaString) {
  var fechaND = fechaString.split("-");
   var anio = fechaND[0];
   var mes = fechaND[1] - 1;
   var dia = fechaND[2];

  return new Date(anio, mes, dia);
}

const filterByDate = (operations, filter)=> date = operations.filter((operation) => operation.fecha >= filter)

const filterByOrder = (operations, filter) => {
  let arrayOrdenado = [];
  switch (filter) {
    case "mas reciente":
      arrayOrdenado = operations.sort(
        (a, b) => convertirFecha(b.fecha) - convertirFecha(a.fecha)
      );
      break;

    case "menos reciente":
      arrayOrdenado = operations.sort(
        (a, b) => convertirFecha(a.fecha) - convertirFecha(b.fecha)
      );
      break;

    case "menor monto":
      arrayOrdenado = operations.sort((a, b) => a.monto - b.monto);
      break;

    case "mayor monto":
      arrayOrdenado = operations.sort((a, b) => b.monto - a.monto);
      break;

    case "a/z":
      arrayOrdenado = operations.sort((a, b) => a.descripcion - b.descripcion); //error
      break;

    case "z/a":
      arrayOrdenado = operations.sort((a, b) => b.descripcion - a.descripcion); //error
      break;
  }

  return arrayOrdenado;
};
// ****---- Events ----****

$btnHideFilters.addEventListener("click", (event)=>{
  event.preventDefault()
  $formFilters.classList.toggle("is-hidden");

  if ($btnHideFilters.innerText.includes("Ocultar")) {
    $btnHideFilters.innerText = "Mostrar filtros"
  } else if ($btnHideFilters.innerText.includes("Mostrar")){
    $btnHideFilters.innerText = "Ocultar filtros"
  }
})

$selectType.addEventListener("change", (event) => {
  const selection = event.target.value;

  showOperations(filterByType(operations, selection));
});

$selectCategory.addEventListener("change", (event) => {
  const selection = event.target.value;

  showOperations(filterByCategory(operations, selection));
});

$inputFilterDate.addEventListener("change", (event) => {
  const selection = event.target.value;
  console.log(selection);
  showOperations(filterByDate(operations, selection));
});

$selectOrder.addEventListener("change", (event) => {
  const selection = event.target.value;
  console.log(selection);

  showOperations(filterByOrder(operations, selection));
});
