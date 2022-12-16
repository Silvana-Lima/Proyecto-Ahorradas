// ****---- Variables ----****

const $newOperationDescription = $("#description");
const $newOperationAmount = $("#amount");
const $newOperationDate = $("#date");
const $newOperationSelectType = $("#new-operation-select-type");
const $newOperationSelectCategory = $("#new-operation-select-category");
const $btnAddNewOperation = $("#btn-add-new-operation");

//console.log($newOperationSelectCategory);

let operationsLocalStorage = JSON.parse(localStorage.getItem("datosIngresados"));

let operations = operationsLocalStorage || [];

console.log(operations);

let operacionIngresada = {
  descripcion: "",
  monto: 0,
  tipo: "",
  categoria: "",
  fecha: ""
}

// ****---- Events ----****


  $btnAddNewOperation.addEventListener("click", ()=>{

    const datos = {...operacionIngresada};

    datos.descripcion = $newOperationDescription.value;
    datos.monto = Number($newOperationAmount.value);
    datos.tipo =  $newOperationSelectType.value;
    datos.categoria = $newOperationSelectCategory.value;
    datos.fecha = $newOperationDate.value;

    operations.push(datos);
    localStorage.setItem("datosIngresados", JSON.stringify(operations));

})



console.log(operations);









