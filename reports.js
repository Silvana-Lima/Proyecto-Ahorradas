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

const mesMayorGanancia = () => {
  let objMesMasGanancia = {
    mes: "",
    ganancia: 0,
  };
  for (const objeto of obtenerArrayMesesGanancia) {
    if (objeto.ganancia > objMesMasGanancia.ganancia) {
      objMesMasGanancia.mes = objeto.mes;
      objMesMasGanancia.ganancia = objeto.ganancia;
    }
  }

  return objMesMasGanancia;
};

const mesMayorGasto = ()=>{
  let objMesMasGasto = {
    mes: "",
    gasto: 0,
  };
  for (const objeto of obtenerArrayMesesGasto) {
    if (objeto.gasto > objMesMasGasto.gasto) {
      objMesMasGasto.mes = objeto.mes;
      objMesMasGasto.gasto = objeto.gasto;
    }
  }

  return objMesMasGasto;
}

const getTotalsByMonth = ()=>{
console.log(obtenerArrayMesesGanancia);
console.log(obtenerArrayMesesGasto);

  let totalesPorMes = obtenerArrayMesesGanancia.map((mes) => {
  const mesGasto = obtenerArrayMesesGasto.find(item => item.mes === mes.mes)
 
  return {...mes, gasto: mesGasto?.gasto || 0, balance: mes.ganancia - mesGasto?.gasto || mes.ganancia};
  
   } 
  );

  console.log(totalesPorMes );

  // let nuevoGastos = obtenerArrayMesesGasto.filter((mes)=>{
  // return obtenerArrayMesesGanancia.find(item => item.mes === mes.mes)

  // })
  
  // console.log(nuevoGastos);

  // totalesPorMes.push(nuevoGastos);

  // console.log(totalesPorMes);



  // const nose =  obtenerArrayMesesGasto.map((mes) => {
  //      const mesGanancia = obtenerArrayMesesGanancia.find(item => item.mes === mes.mes)
     
  //      return {...mes, ganancia: mesGanancia?.ganancia || 0, balance: mesGanancia?.ganancia - mes.gasto || mes.gasto};
  // } )

  // console.log(nose);

  let mesGastoFaltante = [];

  for (const i of obtenerArrayMesesGasto) {
    for (const x of totalesPorMes) {
      if (i.mes !== x.mes) {
        mesGastoFaltante.push(i);
      }
    }
  }
  console.log(mesGastoFaltante);


}

getTotalsByMonth()


const showReports = () => {
  let mayorGanancia = categMayorGanancia();
  let mayorGasto = categMayorGasto();
  let mayorBalance = catMayorBalance();
  let arrayCategorias = getTotalsByCategory(categories);
  let mesMasGanancia = mesMayorGanancia();
  let mesMasGasto = mesMayorGasto();

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
    <div class="column has-text-right"><p>${mesMasGanancia.mes}<p></div>
    <div class="column has-text-right has-text-primary has-text-weight-bold"><p>$${mesMasGanancia.ganancia}<p></div>
</div>
<div class="columns is-mobile mb-5">
    <div class="column has-text-weight-bold ">Mes con mayor gasto</div>
    <div class="column has-text-right"><p>${mesMasGasto.mes}<p></div>
    <div class="column has-text-right has-text-danger has-text-weight-bold"><p>$${mesMasGasto.gasto}<p></div>
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
};

showReports();
