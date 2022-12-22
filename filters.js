// ****---- Variables ----****

const $selectType = $("#filter-select-type");
const $selectCategory = $("#filter-select-category");

// ****---- Functions ----****

const filterByEarnings = (operations) => {
  typeEarnings = operations.filter(
    (operation) => operation.tipo === "ganancia"
  );

  return typeEarnings;
};

const filterByExpenses = (operations) => {
  typeEspenses = operations.filter((operation) => operation.tipo === "gasto");

  return typeEspenses;
};

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
