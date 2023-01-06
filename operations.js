// ****---- Variables ----****

let operationsLocalStorage = JSON.parse(
  localStorage.getItem("datosIngresados")
);

let operations = operationsLocalStorage || [];

// ****---- Functions ----****

let getBalance = (operations) => {

  let newBalance = {  
    ganancia: 0,
    gasto: 0,
    total: 0
  };

  for (const operation of operations) {
    if (operation.tipo === "ganancia") {
      newBalance.ganancia += operation.monto;
    } else if (operation.tipo === "gasto") {
      newBalance.gasto += operation.monto;
    }
  }

  newBalance.total = newBalance.ganancia - newBalance.gasto;

  return newBalance;
};

const showBalance = (balance) => {
  $totalGananciasBalance.innerText = `+$${balance.ganancia}`;
  $totalGastosBalance.innerText = `-$${balance.gasto}`;
  $totalBalance.innerText = `$${balance.total}`;
};

const cleanerNewOperation = () => {
  $newOperationDescription.value = "";
  $newOperationAmount.value = 0;
  $newOperationSelectType.value = "gasto";
  $newOperationSelectCategory.value = "Comida";
};

const removeOperation = (id) => {
   operations = operations.filter((operation) => operation.id !== id);
   localStorage.setItem("datosIngresados", JSON.stringify(operations));

   showOperations(operations)
};

const showOperations = (operations) => {
  $contOperations.innerHTML = "";
  for (const { descripcion, monto, categoria, fecha, id } of operations) {
    // $contOperations.innerHTML += `<div class="columns is-mobile">
    //               <div class="column">
    //                 <p class="item-operations-description">${descripcion}</p>
    //               </div>
    //               <div class="column">
    //                 <p class="tag item-operations-category has-text-primary has-background-primary-light">${categoria}</p>
    //               </div>
    //               <div class="column">
    //                 <p class="item-operations-date is-hidden-mobile">${fecha}</p>
    //               </div>
    //               <div class="column">
    //                 <p class="item-operations-amount has-text-weight-bold">$${monto}</p>
    //               </div>
    //               <div class="column">
    //                 <button class="button is-ghost editar mr-3">Editar</button>
    //                 <button class="button is-ghost eliminar" onclick="function () {removeOperation(${id})}" id="btn-delete-operation">Eliminar</button>
    //               </div>
    //             </div> <hr class="is-hidden-desktop">`;

    let divColumns = document.createElement("div");
    divColumns.classList.add("columns");

    let divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumn.textContent = descripcion;
    divColumns.appendChild(divColumn);

    divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumn.classList.add("tag");
    divColumn.classList.add("has-text-primary");
    divColumn.classList.add("has-background-primary-light");
    divColumn.textContent = categoria;
    divColumns.appendChild(divColumn);

    divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumn.textContent = fecha;
    divColumns.appendChild(divColumn);

    divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumn.textContent = monto;
    divColumns.appendChild(divColumn);

    divColumn = document.createElement("div");
    divColumn.classList.add("column");
    divColumn.classList.add("is-flex");
    let button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("is-ghost");
    button.innerText = "eliminar";
    button.onclick = function () {
      removeOperation(id);
    };
    divColumn.appendChild(button)

    button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("is-ghost");
    button.innerText = "editar";
    button.onclick = function () {
      editOperation(id);
    };
    divColumn.appendChild(button)

    divColumns.appendChild(divColumn);
  
    $contOperations.appendChild(divColumns);
    }

};

if (operations.length > 0) {
  $contOperations.classList.remove("is-hidden");
  $contTitleOperations.classList.remove("is-hidden");
  $contWithoutResults.classList.add("is-hidden");
  showOperations(operations);
}

window.onload = function(){
  var date = new Date(); 
  var month = date.getMonth()+1; 
  var day = date.getDate(); 
  var year = date.getFullYear(); 
  if(day<10)
    day='0'+day; 
  if(month<10)
    month='0'+month 

  $newOperationInputDate.value=year+"-"+month+"-"+day;
}

// ****---- Events ----****

$formNewOperation.addEventListener("submit", (event) => {

  event.preventDefault()
  const data = { 
    descripcion: $newOperationDescription.value,
    monto: Number($newOperationAmount.value),
    tipo: $newOperationSelectType.value,
    categoria: $newOperationSelectCategory.value,
    fecha: $newOperationInputDate.value,
    id: uuid.v1()
   };

  operations.push(data);
  localStorage.setItem("datosIngresados", JSON.stringify(operations));

  showBalance(getBalance(operations));
  cleanerNewOperation();
  showOperations(operations);
  $sectionNewOperation.classList.add("is-hidden");
  $sectionBalance.classList.remove("is-hidden");
  $contOperations.classList.remove("is-hidden");
  $contWithoutResults.classList.add("is-hidden");
  $contTitleOperations.classList.remove("is-hidden");
});
