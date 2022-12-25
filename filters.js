// ****---- Functions ----****

const filterByEarnings = (operations) =>  typeEarnings = operations.filter((operation) => operation.tipo === "ganancia");

const filterByExpenses = (operations) => typeEspenses = operations.filter((operation) => operation.tipo === "gasto");

// ****---- Events ----****

$selectType.addEventListener("change", (event) => {
  const selection = event.target.value;

  switch (selection) {
    case "todos":
      showOperations(operations);
      break;
    case "ganancia":
      showOperations(filterByEarnings(operations));
      break;
    case "gasto":
      showOperations(filterByExpenses(operations));
      break;
  }
});

$selectCategory.addEventListener("change", (event) => {
  let categorySelected = [];

  if (event.target.value === "todas") {
    categorySelected = [...operations];
  } else {
    categorySelected = operations.filter(
      (operation) => operation.categoria === event.target.value
    );
  }
  showOperations(categorySelected);
});

$inputFilterDate.addEventListener(("change"), (event)=>{
  const date = event.target.value;
  console.log(date);
})