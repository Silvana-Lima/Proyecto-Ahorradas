// ****---- Variables ----****

let categoriesLocalStorage = JSON.parse(localStorage.getItem("categorias"));

let categories = categoriesLocalStorage || [
  {
    nombre: "Comida",
    id: "comida",
  },
  {
    nombre: "Servicios",
    id: "servicios",
  },
  {
    nombre: "Salidas",
    id: "salidas",
  },
  {
    nombre: "Educación",
    id: "educacion",
  },
  {
    nombre: "Transporte",
    id: "transporte",
  },
  {
    nombre: "Trabajo",
    id: "trabajo",
  },
];

let categorySelected;

// ****---- Functions ----****

const removeCategory = (id) => {
  categories = categories.filter((category) => category.id !== id);

  localStorage.setItem("categorias", JSON.stringify(categories));
  showCategory(categories);
};

const editCategory = (id) => {
    event.preventDefault();

    $boxAddCategorie.classList.add("is-hidden");
    $boxEditCategorie.classList.remove("is-hidden");

    categorySelected = categories.find((category) => category.id === id);

    $inputEditCategory.value = categorySelected["nombre"];
};

const showCategory = (categories) => {
  $newOperationSelectCategory.innerHTML = "";
  $selectCategory.innerHTML = `<option value="todas">Todas</option>`;

  const divContainer = document.createElement("div");

  $contCategories.innerHTML = "";

  for (const { nombre, id } of categories) {
    $newOperationSelectCategory.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;
    $inputEditCategoryOperation.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;

    $selectCategory.innerHTML += `<option value="${nombre}" id="${id}">${nombre}</option>`;

    divContainer.innerHTML += `<div class="columns is-mobile columns-categories">
         <div class="column">
         <p>${nombre}</p>
         </div>
         <div class="column has-text-right is-three-fifths-mobile">
         <button class="button is-ghost is-small btn-category-edit" id="${id}">Editar</button>
         <button class="button is-ghost is-small btn-category-delete" id="${id}">Eliminar</button>
         </div>
         </div>`;
  }

  const buttonsDelete = divContainer.querySelectorAll(".btn-category-delete");

  for (const button of buttonsDelete) {
    button.onclick = () => {
      removeCategory(button.id);
    };
  }

  const buttonsEdit = divContainer.querySelectorAll(".btn-category-edit");

  for (const button of buttonsEdit) {
    button.onclick = () => {
      editCategory(button.id);
    };
  }


  $contCategories.append(divContainer);
};

showCategory(categories);

// ****---- Events ----****

$btnAddCategory.addEventListener("click", (event) => {
    event.preventDefault();
  
    const newCategory = {
      nombre: $inputCategory.value,
      id: uuid.v1(),
    };
  
    categories.push(newCategory);
  
    localStorage.setItem("categorias", JSON.stringify(categories));
    showCategory(categories);

    $inputCategory.value = "";
  });

  $btnCancelEditCategory.addEventListener("click", (e)=>{
    e.preventDefault();

    $boxAddCategorie.classList.remove("is-hidden");
    $boxEditCategorie.classList.add("is-hidden");
  });

  $formEditCategorie.addEventListener("submit", (e)=>{
    e.preventDefault();

    $boxAddCategorie.classList.remove("is-hidden");
    $boxEditCategorie.classList.add("is-hidden");

    categories = categories.map((category)=>{
       if (category.id === categorySelected.id) {
        category.nombre = $inputEditCategory.value;
       }

       return category;
    })

    localStorage.setItem("categorias", JSON.stringify(categories));
    showCategory(categories);

    categorySelected = null;

  })
