// ****---- Variables ----****

const $newOperationDescription = $("#description");
const $newOperationAmount = $("#amount");
const $newOperationDate = $("#date");
const $newOperationSelectType = $("#new-operation-select-type");
const $btnAddNewOperation = $("#btn-add-new-operation");

const $totalGananciasBalance = $(".total-ganancias-balance");
const $totalGastosBalance = $(".total-gastos-balance");
const $totalBalance = $(".total-balance");

const $contWithoutResults = $(".cont-without-results");
const $contOperations = $(".cont-operations");
const $contTitleOperations = $(".cont-title-operations");


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
  id:"",
};

let moldebalance = {
  ganancia: 0,
  gasto: 0,
  total: 0,
};

// ****---- Functions ----****

let newBalance = {};
let getBalance = (operations) => {
  newBalance = { ...moldebalance };
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

  return newBalance;
};

getBalance(operations);

const showBalance = (newBalance) => {
  $totalGananciasBalance.innerText = `+$${newBalance.ganancia}`;
  $totalGastosBalance.innerText = `-$${newBalance.gasto}`;
  $totalBalance.innerText = `$${newBalance.total}`;
};

showBalance(newBalance);

const cleanerNewOperation = () => {
  $newOperationDescription.value = "";
  $newOperationAmount.value = 0;
  $newOperationSelectType.value = "gasto";
  $newOperationSelectCategory.value = "Comida";
  $newOperationDate.value = "";
};

const removeOperation = (id)=>{
  
  console.log(id);
 
}

const showOperations = (operations) => {
  $contOperations.innerHTML = "";
  for (const { descripcion, monto, categoria, fecha, id } of operations) {
    $contOperations.innerHTML += `<div class="columns">
                  <div class="column">
                    <p class="item-operations-description">${descripcion}</p>
                  </div>
                  <div class="column">
                    <p class="tag item-operations-category has-text-primary has-background-primary-light">${categoria}</p>
                  </div>
                  <div class="column">
                    <p class="item-operations-date">${fecha}</p>
                  </div>
                  <div class="column">
                    <p class="item-operations-amount has-text-weight-bold">$${monto}</p>
                  </div>
                  <div class="column">
                    <a href="" class="editar mr-3">Editar</a>
                    <button class="eliminar" onclick="removeOperation(${id})" id="btn-delete-operation">Eliminar</button>
                  </div>
                </div>`;

    }
      
};

if (operations.length > 0) {
  $contOperations.classList.remove("is-hidden");
  $contTitleOperations.classList.remove("is-hidden");
  $contWithoutResults.classList.add("is-hidden");
  showOperations(operations);
}

// ****---- Events ----****

$btnAddNewOperation.addEventListener("click", () => {
  const data = { ...operacionIngresada };

  data.descripcion = $newOperationDescription.value;
  data.monto = Number($newOperationAmount.value);
  data.tipo = $newOperationSelectType.value;
  data.categoria = $newOperationSelectCategory.value;
  data.fecha = $newOperationDate.value;
  data.id = uuid.v1();

  operations.push(data);
  localStorage.setItem("datosIngresados", JSON.stringify(operations));

  getBalance(operations);
  showBalance(newBalance);
  cleanerNewOperation();
  showOperations(operations);
  $sectionNewOperation.classList.add("is-hidden");
  $sectionBalance.classList.remove("is-hidden");
  $contOperations.classList.remove("is-hidden");
  $contWithoutResults.classList.add("is-hidden");
});
