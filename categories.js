// ****---- Variables ----****

let categoriesLocalStorage = JSON.parse(localStorage.getItem("categorias"));

let categories = categoriesLocalStorage || [{
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

$btnAddCategory.addEventListener("click", (event)=>{
    event.preventDefault()

    const newCategory = {
        nombre: $inputCategory.value,
        id: uuid.v1()
    };

    categories.push(newCategory);

    localStorage.setItem("categorias", JSON.stringify(categories));
    showCategory(categories);
})

 
 const removeCategory = (id) => {
   // event.preventDefault()
    //categories = (id) => categories.filter((category) => category.id !== id);
  console.log(id);
  };

const editCategory = (id)=>{
   
 
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
        <div class="column"><button class="button is-ghost mr-3" onclick="function(){editCategory(${id})}">Editar</button> <button class="button is-ghost btn-category-delete" onclick="function(){removeCategory(${id})}">Eliminar</button></div></div>`
    }
}

showCategory(categories); 

