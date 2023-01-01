let getTotalsByCategory = (categorias) => {
  let opTipoGanancia = filterByType("ganancia", operations);
  let opTipoGasto = filterByType("gasto", operations);
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
  let categGanancias = getTotalsByCategory(category);

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
    let categGastos = getTotalsByCategory(category);

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
  let categBalance = getTotalsByCategory(category);

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

const getTotalsByMonth = ()=>{
const array = [];

const totalsbyMonth = {
  mes:"",
  ganancia: 0,
  gasto: 0
}

for (const {fecha, tipo, monto} of operations) {

}

console.log(array);
}


getTotalsByMonth()

const showReports = () => {
  let mayorGanancia = categMayorGanancia();
  let mayorGasto = categMayorGasto();
  let mayorBalance = catMayorBalance();
  let arrayCategorias = getTotalsByCategory(category);

$contSummary.innerHTML =`<div class="columns is-mobile">
<div class="column has-text-weight-bold ">Categoría con mayor ganancia</div>
<div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorGanancia.nombre}</p></div>
<div class="column has-text-right">+$${mayorGanancia.ganancia}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor gasto</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorGasto.nombre}</p></div>
    <div class="column has-text-right">$${mayorGasto.gasto}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Categoría con mayor balance</div>
    <div class="column has-text-right"><p class="tag has-text-primary has-background-primary-light">${mayorBalance.nombre}</p></div>
    <div class="column has-text-right">$${mayorBalance.balance}</div>
</div>
<div class="columns is-mobile">
    <div class="column has-text-weight-bold ">Mes con mayor ganancia</div>
    <div class="column has-text-right"></div>
    <div class="column has-text-right"></div>
</div>
<div class="columns is-mobile mb-5">
    <div class="column has-text-weight-bold ">Mes con mayor gasto</div>
    <div class="column has-text-right"></div>
    <div class="column has-text-right"></div>
</div>`

  for (const {nombre, ganancia, gasto, balance} of arrayCategorias) {
    if (balance !== 0) {
    $contTotalByCategory.innerHTML += `<div class="columns is-mobile"><div class="column"><p>${nombre}</p></div>
    <div class="column"><p class="has-text-primary">+$${ganancia}</p></div>
    <div class="column"><p class="has-text-danger">-$${gasto}</p></div>
    <div class="column"><p>$${balance}</p></div></div>`
}
}
};

showReports();
