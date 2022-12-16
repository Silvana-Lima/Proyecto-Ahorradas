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

//console.log(operations);

let operacionIngresada = {
  descripcion: "",
  monto: 0,
  tipo: "",
  categoria: "",
  fecha: ""
}

// ****---- Events ----****


  $btnAddNewOperation.addEventListener("click", ()=>{

    const data = {...operacionIngresada};

    data.descripcion = $newOperationDescription.value;
    data.monto = Number($newOperationAmount.value);
    data.tipo =  $newOperationSelectType.value;
    data.categoria = $newOperationSelectCategory.value;
    data.fecha = $newOperationDate.value;

    operations.push(data);
    localStorage.setItem("datosIngresados", JSON.stringify(operations))

})

//console.log(operations);









