// ****---- Variables ----****

const $newOperationDescription = $("#description");
const $newOperationAmount = $("#amount");
const $newOperationDate = $("#date");
const $newOperationSelectType = $("#new-operation-select-type");
const $newOperationSelectCategory = $("#new-operation-select-category");
const $btnAddNewOperation = $("#btn-add-new-operation");

const $totalGananciasBalance = $(".total-ganancias-balance");
const $totalGastosBalance = $(".total-gastos-balance");
const $totalBalance = $(".total-balance")
const $selectType = $("#select-type");
const $selectCategory = $("#select-category")

let operationsLocalStorage = JSON.parse(
  localStorage.getItem("datosIngresados")
);

let operations = operationsLocalStorage || [];

let operacionIngresada = {
  descripcion: "",
  monto: 0,
  tipo: "",
  categoria: "",
  fecha: "",
};

let moldebalance = {
  ganancia: 0,
  gasto: 0,
  total: 0
}

// ****---- Functions ----****

let newBalance = {};
let getBalance = (operations)=>{
  newBalance = {...moldebalance};
  let ganancia = 0;
  let gasto = 0;

    for (const operation of operations) {
 
    if (operation.tipo === "ganancia") {
      ganancia += operation.monto;
    } else if (operation.tipo === "gasto") {
      gasto += operation.monto;
    }
  }

  newBalance.ganancia = ganancia;
  newBalance.gasto = gasto;
  newBalance.total = ganancia - gasto;

  return newBalance
};

getBalance(operations)

const showBalance = (newBalance)=>{
  $totalGananciasBalance.innerText = `+$${newBalance.ganancia}`;
  $totalGastosBalance.innerText = `-$${newBalance.gasto}`;
  $totalBalance.innerText = `$${newBalance.total}`;
  
}

showBalance(newBalance)

const cleanerNewOperation =()=>{
  $newOperationDescription.value = "";
  $newOperationAmount.value = 0 ;
  $newOperationSelectType.value = "gasto";
  $newOperationSelectCategory.value = "todas";
  $newOperationDate.value= "";


}

// ****---- Events ----****

$btnAddNewOperation.addEventListener("click", () => {
  const data = { ...operacionIngresada };

  data.descripcion = $newOperationDescription.value;
  data.monto = Number($newOperationAmount.value);
  data.tipo = $newOperationSelectType.value;
  data.categoria = $newOperationSelectCategory.value;
  data.fecha = $newOperationDate.value;

  operations.push(data);
  localStorage.setItem("datosIngresados", JSON.stringify(operations));

  getBalance(operations);
  showBalance(newBalance);
  $sectionNewOperation.classList.add("is-hidden")
  $sectionBalance.classList.remove("is-hidden")
  cleanerNewOperation();

  
});





