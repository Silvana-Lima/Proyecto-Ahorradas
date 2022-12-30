const $btnAddCategory = $("#btn-add-category");
const $inputCategory = $(".input-category");
const $newOperationSelectCategory = $("#new-operation-select-category");
const $contCategories = $(".cont-category");

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

    localStorage.setItem("categorias", JSON.stringify(category));
    showCategory(category);
})

const removeCategory = (id)=>{
    event.preventDefault();
     console.log(id);

  }

const showCategory = (categories)=>{
    $newOperationSelectCategory.innerHTML= "";
    $selectCategory.innerHTML=`<option value="todas">Todas</option>`;
    $contCategories.innerHTML="";

    for (const {nombre, id} of categories) {
        $newOperationSelectCategory.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`

        $selectCategory.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`

        $contCategories.innerHTML += `<div class="columns is-mobile columns-categories">
        <div class="column is-three-quarters-desktop is-half-mobile">${nombre}
        </div>
        <div class="column"><a href="" class="mr-3">Editar</a> <a href="" class="btn-category-delete" onclick="removeCategory(${id})">Eliminar</a></div></div>`
    }
}

showCategory(category);

