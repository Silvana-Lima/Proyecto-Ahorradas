let obtenerGastosYGananciasPorCateg = (operaciones, categorias) => {
  let opTipoGanancia = filterByType(operaciones, "ganancia");
  let opTipoGasto = filterByType(operaciones, "gasto");
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

  return nuevoArrayCategorias;
};

const categMayorGanancia = () => {
  let categGanancias = obtenerGastosYGananciasPorCateg(operations, category);

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
    let categGastos = obtenerGastosYGananciasPorCateg(operations, category);

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

const showReports = () => {
  let mayorGanancia = categMayorGanancia();
  let mayorGasto = categMayorGasto();

  $contSummary.innerHTML = `<div class="column is-two-thirds">
<p class="has-text-weight-bold mb-3">Categoría con mayor ganancia</p>
<p class="has-text-weight-bold mb-3">Categoría con mayor gasto</p>
<p class="has-text-weight-bold mb-3">Categoría con mayor balance</p>
<p class="has-text-weight-bold mb-3">Mes con mayor ganancia</p>
<p class="has-text-weight-bold mb-3">Mes con mayor gasto</p>
</div>
<div class="column has-text-right">
<p class="tag has-text-primary has-background-primary-light mb-3">${mayorGanancia.nombre}</p>
<p class="tag has-text-primary has-background-primary-light mb-3">${mayorGasto.nombre}</p>
<p class=""></p>
<p></p>
<p></p>
</div>
<div class="column has-text-right">
<p class="mb-3">+$${mayorGanancia.ganancia}</p>
<p class="mb-3">$${mayorGasto.gasto}</p>
<p class="mb-3"></p>
<p></p>
<p></p>
</div>`;
};

showReports();
