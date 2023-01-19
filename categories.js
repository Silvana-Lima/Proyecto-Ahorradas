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
  removeOperationsOfCategory(id);

  categories = categories.filter((category) => category.id !== id);

  updateCategories();
};

const editCategory = (id) => {
  hideElement($boxAddCategorie);
  showElement($boxEditCategorie);

  categorySelected = categories.find((category) => category.id === id);

  $inputEditCategory.value = categorySelected["nombre"];
};

const removeOperationsOfCategory = (id) => {
  operations = operations.filter((operation) => {
    categorySelected = categories.find((category) => category.id === id);

    return operation.categoria !== categorySelected.nombre;
  });

  generalUpdateOperations();
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

const updateCategories = () => {
  localStorage.setItem("categorias", JSON.stringify(categories));
  showCategory(categories);
};

// ****---- Events ----****

$btnAddCategory.addEventListener("click", (event) => {
  event.preventDefault();

  const newCategory = {
    nombre: $inputCategory.value,
    id: uuid.v1(),
  };

  categories.push(newCategory);

  updateCategories();

  $inputCategory.value = "";
});

$btnCancelEditCategory.addEventListener("click", (e) => {
  e.preventDefault();

  hideElement($boxEditCategorie);
  showElement($boxAddCategorie);
});

$formEditCategorie.addEventListener("submit", (e) => {
  e.preventDefault();

  hideElement($boxEditCategorie);
  showElement($boxAddCategorie);

  categories = categories.map((category) => {
    if (category.id === categorySelected.id) {
      category.nombre = $inputEditCategory.value;
    }

    return category;
  });

  updateCategories();

  categorySelected = null;
});
