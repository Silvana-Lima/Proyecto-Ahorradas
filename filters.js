// ****---- Functions ----****

const filterByType = (filter, operations) => {

  let type = [];
  if (filter === "todos") {
    type = operations;
  } else {
    type = operations.filter((operation) => operation.tipo === filter)
  }
  return type;
};

const filterByCategory = (filter, operations) => {

  let category = [];
  if (filter === "todas") {
    category = operations;
  } else {
   category = operations.filter((operation) => operation.categoria === filter)
  }
  return category;

};

function convertToNewDate (dateString) {
  var arrayDate = dateString.split("-");
   var year = arrayDate[0];
   var month = arrayDate[1] - 1;
   var day = arrayDate[2];

  return new Date(year, month, day);
}

const filterByDate = (filter, operations)=> date = operations.filter((operation) => operation.fecha >= filter)

const filterByOrder = (filter, operations) => {
  let sortedOperations = [];
  switch (filter) {
    case "mas reciente":
      sortedOperations = operations.sort(
        (a, b) => convertToNewDate(b.fecha) - convertToNewDate(a.fecha)
      );
      break;

    case "menos reciente":
      sortedOperations = operations.sort(
        (a, b) => convertToNewDate(a.fecha) - convertToNewDate(b.fecha)
      );
      break;

    case "menor monto":
      sortedOperations = operations.sort((a, b) => a.monto - b.monto);
      break;

    case "mayor monto":
      sortedOperations = operations.sort((a, b) => b.monto - a.monto);
      break;

    case "a/z":
      sortedOperations = operations.sort(function(a, b){
        if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) { return -1; }
        if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) { return 1; }
        return 0;
    })
      break;

    case "z/a":
      sortedOperations = operations.sort(function(a, b){
        if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) { return 1; }
        if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) { return -1; }
        return 0;
    })
      break;
  }

  return sortedOperations;
};

let filterOperation = ()=>{
  let filteredOperations = [...operations];

  filteredOperations = filterByType($selectType.value, filteredOperations );
  filteredOperations = filterByCategory($selectCategory.value, filteredOperations);
  filteredOperations = filterByOrder($selectOrder.value, filteredOperations);
  filteredOperations = filterByDate($inputFilterDate.value, filteredOperations);
  
  return filteredOperations;
  }

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

$selectType.addEventListener("change", () => {
  showOperations(filterOperation());
  showBalance(getBalance(filterOperation()));
});

$selectCategory.addEventListener("change", () => {
 showOperations(filterOperation());
 showBalance(getBalance(filterOperation()));
});

$inputFilterDate.addEventListener("change", () => {
  showOperations(filterOperation());
  showBalance(getBalance(filterOperation()));
});

$selectOrder.addEventListener("change", () => {
  showOperations(filterOperation());
  showBalance(getBalance(filterOperation()));
});
