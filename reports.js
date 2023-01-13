// ****---- Variables ----****

let opTipoGanancia = filterByType("ganancia", operations);
let opTipoGasto = filterByType("gasto", operations);

const mesesConGanancia = opTipoGanancia.reduce((c, {fecha, monto} )=>{
  if(c.hasOwnProperty(fecha.slice(0, 7))){
      c[fecha.slice(0, 7)] += monto;
  }else{
      c[fecha.slice(0, 7)] = monto;
  }
  return c;
},{});

const obtenerArrayMesesGanancia = Object.keys(mesesConGanancia).map(e=>{
  const o = {};
  o.mes = e;
  o.ganancia = mesesConGanancia[e];
  o.gasto = 0;
  o.balance = o.ganancia - o.gasto;
  return o
})

const mesesConGasto = opTipoGasto.reduce((c, {fecha, monto} )=>{
  if(c.hasOwnProperty(fecha.slice(0, 7))){
      c[fecha.slice(0, 7)] += monto;
  }else{
      c[fecha.slice(0, 7)] = monto;
  }
  return c;
},{});

const obtenerArrayMesesGasto = Object.keys(mesesConGasto).map(e=>{
  const o = {};
  o.mes = e;
  o.ganancia = 0;
  o.gasto = mesesConGasto[e];
  o.balance = o.ganancia - o.gasto;
  return o
})

// ****---- Functions ----****

let getTotalsByCategory = (categorias) => {

  let nuevoArrayCategorias = [...categorias];

  for (const categoria of nuevoArrayCategorias) {
    categoria.ganancia = 0;

    for (const operacion of opTipoGanancia) {
      if (operacion.categoria === categoria.nombre) {
        categoria.ganancia += operacion.monto;
      }
    }
  }

  for (const categoria of nuevoArrayCategorias) {
    categoria.gasto = 0;

    for (const operacion of opTipoGasto) {
      if (operacion.categoria === categoria.nombre) {
        categoria.gasto += operacion.monto;
      }
    }
  }

  for (const categoria of nuevoArrayCategorias) {
    categoria.balance = categoria.ganancia - categoria.gasto;

  }

  return nuevoArrayCategorias;
};

const categMayorGanancia = () => {
  let categGanancias = getTotalsByCategory(categories);

  let categoriaMayorGanancia = {
    nombre: "",
    ganancia: 0,
  };

  for (const categoria of categGanancias) {
    if (categoria.ganancia > categoriaMayorGanancia.ganancia) {
      categoriaMayorGanancia.nombre = categoria.nombre;
      categoriaMayorGanancia.ganancia = categoria.ganancia;
    }
  }

  return categoriaMayorGanancia;
};

const categMayorGasto = ()=>{
    let categGastos = getTotalsByCategory(categories);

  let categoriaMayorGasto = {
    nombre: "",
    gasto: 0,
  };

  for (const categoria of categGastos) {
    if (categoria.gasto > categoriaMayorGasto.gasto) {
      categoriaMayorGasto.nombre = categoria.nombre;
      categoriaMayorGasto.gasto = categoria.gasto;
    }
  }

  return categoriaMayorGasto;
}

const catMayorBalance = ()=>{
  let categBalance = getTotalsByCategory(categories);

  let categoriaMayorBalance = {
    nombre: "",
    balance: 0,
  };

  for (const categoria of categBalance) {
    if (categoria.balance > categoriaMayorBalance.balance) {
      categoriaMayorBalance.nombre = categoria.nombre;
      categoriaMayorBalance.balance = categoria.balance;
    }
  }

  return categoriaMayorBalance;
}

const getTotalsByMonth = () => {
  const totalMeses = operations.reduce((acc, operacion) => {
    fecha = convertirFecha(operacion.fecha);

    const fechaFormateada = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    if (!acc[fechaFormateada]) {
      acc[fechaFormateada] = {
        ganancia: 0,
        gasto: 0,
        balance: 0,
      };
    }

    acc[fechaFormateada][operacion.tipo] += operacion.monto;
    acc[fechaFormateada]["balance"] =
      acc[fechaFormateada]["ganancia"] - acc[fechaFormateada]["gasto"];

    return acc;
  }, {});

  return totalMeses;
};

getTotalsByMonth();


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

const highestProfitMonth = () => {

  let objHighestProfitMonth = getHigherAmount(getTotalsByMonth(),"ganancia");

  return objHighestProfitMonth;
};

const highestSpendingMonth = ()=>{
  let objHighestSpendingMonth = getHigherAmount(getTotalsByMonth(),"gasto");;


  return objHighestSpendingMonth;
}



const showReports = () => {
  let mayorGanancia = categMayorGanancia();
  let mayorGasto = categMayorGasto();
  let mayorBalance = catMayorBalance();
  let arrayCategorias = getTotalsByCategory(categories);
  let mesMasGanancia = highestProfitMonth();
  let mesMasGasto = highestSpendingMonth();
  let totalesPorMes = getTotalsByMonth();

$contSummary.innerHTML =`<div class="columns is-mobile">
<div class="column has-text-weight-bold ">Categoría con mayor ganancia</div>
<div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorGanancia.nombre}</p></div>
<div class="column has-text-right has-text-primary has-text-weight-bold">+$${mayorGanancia.ganancia}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor gasto</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorGasto.nombre}</p></div>
    <div class="column has-text-right has-text-danger has-text-weight-bold">$${mayorGasto.gasto}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor balance</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorBalance.nombre}</p></div>
    <div class="column has-text-right has-text-weight-bold">$${mayorBalance.balance}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Mes con mayor ganancia</div>
    <div class="column has-text-right"><p>${mesMasGanancia.filter}<p></div>
    <div class="column has-text-right has-text-primary has-text-weight-bold"><p>$${mesMasGanancia.amount}<p></div>
</div>
<div class="columns is-mobile mb-5">
    <div class="column has-text-weight-bold ">Mes con mayor gasto</div>
    <div class="column has-text-right"><p>${mesMasGasto.filter}<p></div>
    <div class="column has-text-right has-text-danger has-text-weight-bold"><p>$${mesMasGasto.amount}<p></div>
</div>`

  for (const {nombre, ganancia, gasto, balance} of arrayCategorias) {
    if (balance !== 0) {
    $contTotalByCategory.innerHTML += `<div class="columns is-mobile">
    <div class="column"><p>${nombre}</p></div>
    <div class="column has-text-right"><p class="has-text-primary">+$${ganancia}</p></div>
    <div class="column has-text-right"><p class="has-text-danger">-$${gasto}</p></div>
    <div class="column has-text-right"><p>$${balance}</p></div>
    </div>`
}
}

const fechas = Object.keys(totalesPorMes);

for (const fecha of fechas) {
  $contTotalByMonth.innerHTML += `<div class="columns is-mobile">
  <div class="column"><p>${fecha}</p></div>
  <div class="column has-text-right"><p class="has-text-primary">+$${totalesPorMes[fecha]["ganancia"]}</p></div>
  <div class="column has-text-right"><p class="has-text-danger">-$${totalesPorMes[fecha]["gasto"]}</p></div>
  <div class="column has-text-right"><p>$${totalesPorMes[fecha]["ganancia"]-totalesPorMes[fecha]["gasto"]}</p></div>
  </div>`
}
};

showReports();
