// ****---- Functions ----****

let getTotalsByCategory = () => {

  const totalByCategory = operations.reduce((acc, operation) => {
    let operationCategory = operation.categoria;

    if (!acc[operationCategory]) {
      acc[operationCategory] = { ganancia: 0, gasto: 0, balance: 0 };
    }

    acc[operationCategory][operation.tipo] += operation.monto;
    acc[operationCategory]["balance"] =
      acc[operationCategory]["ganancia"] - acc[operationCategory]["gasto"];

    return acc;
  }, {});

   return totalByCategory;
};

const getTotalsByMonth = () => {
  const totalMonths = operations.reduce((acc, operation) => {
    date = convertToNewDate(operation.fecha);

    const formatDate = `${date.getMonth() + 1}/${date.getFullYear()}`;

    if (!acc[formatDate]) {
      acc[formatDate] = {
        ganancia: 0,
        gasto: 0,
        balance: 0,
      };
    }

    acc[formatDate][operation.tipo] += operation.monto;
    acc[formatDate]["balance"] =
      acc[formatDate]["ganancia"] - acc[formatDate]["gasto"];

    return acc;
  }, {});

  return totalMonths;
};

const getHigherAmount = (object, filter)=>{
let higherAmount = {
  filter: "",
  amount: 0
}

let objectToFilter = object;

const objectToIterate = Object.keys(objectToFilter);

for (const i of objectToIterate) {

  if (objectToFilter[i][filter] > higherAmount.amount) {
    higherAmount.filter = i;
    higherAmount.amount = objectToFilter[i][filter];
  }
}

return higherAmount;
}

const highestProfitCategory = () => {

  let resultObject = getHigherAmount(getTotalsByCategory(), "ganancia");

  return resultObject;
};

const highestSpendingCategory = ()=>{
  
  let resultObject = getHigherAmount(getTotalsByCategory(), "gasto");

  return resultObject;
}

const highestProfitBalance = ()=>{
  let resultObject = getHigherAmount(getTotalsByCategory(), "balance");

  return resultObject;
}

const highestProfitMonth = () => {

  let resultObject = getHigherAmount(getTotalsByMonth(),"ganancia");

  return resultObject;
};

const highestSpendingMonth = ()=>{
  let resultObject = getHigherAmount(getTotalsByMonth(),"gasto");;


  return resultObject;
}



const showReports = () => {
  let categoryPlusProfit = highestProfitCategory();
  let categoryPlusSpending = highestSpendingCategory();
  let categoryPlusBalance = highestProfitBalance();
  let totalsByCategory = getTotalsByCategory();
  let monthPlusProfit = highestProfitMonth();
  let monthPlusSpending = highestSpendingMonth();
  let totalsByMonth = getTotalsByMonth();

  $contTotalByCategory.innerHTML = "";
  $contTotalByMonth.innerHTML = "";

$contSummary.innerHTML =`<div class="columns is-mobile">
<div class="column has-text-weight-bold ">Categoría con mayor ganancia</div>
<div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${categoryPlusProfit.filter}</p></div>
<div class="column has-text-right has-text-primary has-text-weight-bold">+$${categoryPlusProfit.amount}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor gasto</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${categoryPlusSpending.filter}</p></div>
    <div class="column has-text-right has-text-danger has-text-weight-bold">$${categoryPlusSpending.amount}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor balance</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${categoryPlusBalance.filter}</p></div>
    <div class="column has-text-right has-text-weight-bold">$${categoryPlusBalance.amount}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Mes con mayor ganancia</div>
    <div class="column has-text-right"><p>${monthPlusProfit.filter}<p></div>
    <div class="column has-text-right has-text-primary has-text-weight-bold"><p>$${monthPlusProfit.amount}<p></div>
</div>
<div class="columns is-mobile mb-5">
    <div class="column has-text-weight-bold ">Mes con mayor gasto</div>
    <div class="column has-text-right"><p>${monthPlusSpending.filter}<p></div>
    <div class="column has-text-right has-text-danger has-text-weight-bold"><p>$${monthPlusSpending.amount}<p></div>
</div>`


const categorias = Object.keys(totalsByCategory)
  for (const  categoria of categorias) {
    
    $contTotalByCategory.innerHTML += `<div class="columns is-mobile">
    <div class="column"><p>${categoria}</p></div>
    <div class="column has-text-right"><p class="has-text-primary">+$${totalsByCategory[categoria]["ganancia"]}</p></div>
    <div class="column has-text-right"><p class="has-text-danger">-$${totalsByCategory[categoria]["gasto"]}</p></div>
    <div class="column has-text-right"><p>$${totalsByCategory[categoria]["ganancia"]-totalsByCategory[categoria]["gasto"]}</p></div>
    </div>`
}


const dates = Object.keys(totalsByMonth);

for (const date of dates) {
  $contTotalByMonth.innerHTML += `<div class="columns is-mobile">
  <div class="column"><p>${date}</p></div>
  <div class="column has-text-right"><p class="has-text-primary">+$${totalsByMonth[date]["ganancia"]}</p></div>
  <div class="column has-text-right"><p class="has-text-danger">-$${totalsByMonth[date]["gasto"]}</p></div>
  <div class="column has-text-right"><p>$${totalsByMonth[date]["ganancia"]-totalsByMonth[date]["gasto"]}</p></div>
  </div>`
}
};

// ***>>> Function to init app <<<*** //

const initApp = () => {
  if (operations.length > 0) {

    hideElement($contWithoutResults);
    showElement($contOperations);

    showOperations(operations);
  }

  showBalance(getBalance(operations));
  showCategory(categories);
};

initApp();