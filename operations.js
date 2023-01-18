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
   
   generalUpdateOperations();

   if (operations.length === 0) {
    $contOperations.classList.add("is-hidden");
    $contWithoutResults.classList.remove("is-hidden");
  }
};

let operationSelected; 

const editOperation = (id) => {
  $sectionBalance.classList.add("is-hidden");
  $sectionEditOperatioin.classList.remove("is-hidden");

  operationSelected = operations.find((operation) => operation.id === id);

  $inputEditDescription.value = operationSelected["descripcion"];
  $inputEditAmount.value = operationSelected["monto"];
  $selectTypeEdit.value = operationSelected["tipo"];
  $inputEditDate.value = operationSelected["fecha"];
  $inputEditCategoryOperation.value = operationSelected["categoria"];
};


const showOperations = (operations) => {
  $contOperations.innerHTML = "";

  const divContainer = document.createElement("div");

  divContainer.innerHTML = `
  <div class="columns is-hidden-mobile cont-title-operations mt-5 mb-3">
   <div class="column">
     <h6 class="title is-6">Descripción</h6>
   </div>
   <div class="column">
     <h6 class="title is-6">Categoría</h6>
   </div>
   <div class="column">
     <h6 class="title is-6">Fecha</h6>
   </div>
   <div class="column">
     <h6 class="title is-6">Monto</h6>
   </div>
   <div class="column">
     <h6 class="title is-6">Acciones</h6>
   </div>
 </div>`;

  for (const { descripcion, monto, categoria, fecha, tipo, id } of operations) {
    divContainer.innerHTML += `<div class="columns is-mobile is-multiline">
                  <div class="column is-two-fifths-mobile">
                    <p class="item-operations-description">${descripcion}</p>
                  </div>
                  <div class="column is-three-fifths-mobile has-text-right-mobile">
                    <p class="tag item-operations-category has-text-primary has-background-primary-light">${categoria}</p>
                  </div>
                  <div class="column is-hidden-mobile">
                    <p class="item-operations-date">${fecha}</p>
                  </div>
                  <div class="column is-two-fifths-mobile">
                    <p class="item-operations-amount has-text-weight-bold ${tipo == "ganancia" ? "has-text-primary" : "has-text-danger"}">$${monto}</p>
                  </div>
                  <div class="column is-three-fifths-mobile has-text-right-mobile">
                    <button class="button is-ghost is-small btn-operation-edit" id="${id}">Editar</button>
                    <button class="button is-ghost is-small btn-operation-delete"  id="${id}">Eliminar</button>
                  </div>
                </div> <hr class="is-hidden-desktop">`;

    const buttonsDelete = divContainer.querySelectorAll(
      ".btn-operation-delete"
    );

    for (const button of buttonsDelete) {
      button.onclick = () => {
        removeOperation(button.id);
      };
    }

    const buttonsEdit = divContainer.querySelectorAll(".btn-operation-edit");

    for (const button of buttonsEdit) {
      button.onclick = () => {
        editOperation(button.id);
      };
    }

    $contOperations.append(divContainer);
  }
};

const generalUpdateOperations = () => {
  localStorage.setItem("datosIngresados", JSON.stringify(operations));
  showOperations(operations);
  showBalance(getBalance(operations));
};

// ****---- Function to add current date in "formulary new operation" ----****

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

  generalUpdateOperations();

  cleanerNewOperation();

  changeScreen($$sections, $sectionBalance);
  $contOperations.classList.remove("is-hidden");
  $contWithoutResults.classList.add("is-hidden");
});

$btnCancelEditOperation.addEventListener("click", ()=>{
  changeScreen($$sections, $sectionBalance);
})

$formEditOperation.addEventListener("submit", (e)=>{
  e.preventDefault();

  operations = operations.map((operation)=>{
    if (operation.id === operationSelected.id){

    operation.descripcion = $inputEditDescription.value;
    operation.monto = Number($inputEditAmount.value);
    operation.tipo = $selectTypeEdit.value;
    operation.fecha = $inputEditDate.value;
    operation.categoria = $inputEditCategoryOperation.value;

    }
    return operation; 
  })

generalUpdateOperations();
changeScreen($$sections, $sectionBalance);

operationSelected = null;
});

$btnCancelNewOperation.addEventListener("click", (e)=>{
  e.preventDefault();
  changeScreen($$sections, $sectionBalance);
})