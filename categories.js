const $btnAddCategory = $("#btn-add-category");
const $inputCategory = $(".input-category")
console.log($inputCategory);

let categoriesLocalStorage = JSON.parse(localStorage.getItem("categorias"));

let category = categoriesLocalStorage || [{
    nombre: "Comida",
    id:"comida"
},
{
    nombre: "Servicios",
    id:"servicios"
},
{
    nombre: "Salidas",
    id: "salidas"
},
{
    nombre: "Educación",
    id:"educacion"
},
{
    nombre: "Transporte",
    id:"transporte"
},
{
    nombre: "Trabajo",
    id:"trabajo"
},
];

let enteredCategory = {
    nombre: "",
    id:""
}

$btnAddCategory.addEventListener("click", (event)=>{
    event.preventDefault()
    const newCategory = {...enteredCategory};

    newCategory.nombre = $inputCategory.value;
    newCategory.id = uuid.v1();

    category.push(newCategory);

    localStorage.setItem("categorias", JSON.stringify(category))
})



console.log(category);

