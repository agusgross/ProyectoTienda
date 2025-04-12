const cuentaCarritoElement = document.getElementById("cuenta-carrito");
const keyLocalstorage = "libros"

function agregarAlCarrito(producto){

  Toastify({
    text: "Producto agregado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: " #ee6130",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
    onClick: function(){} // Callback after click
  }).showToast();

  let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  let cantidadProductoFinal;

  if(!memoria || memoria.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem(keyLocalstorage,JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {

    const indiceProducto = memoria.findIndex(libro => libro.id === producto.id)
    const nuevaMemoria = memoria;
 
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
     
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem(keyLocalstorage,JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

function restarAlCarrito(producto){
  Toastify({
    text: "Producto eliminado",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: " #ee6130",
      borderRadius: "2rem",
      textTransform: "uppercase",
      fontSize: ".75rem"
    },
    offset: {
        x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
    onClick: function(){} // Callback after click
  }).showToast();
  let memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  if(!memoria) return console.warn("Error restando al carrito: Carrito no encontrado en memoria")
  let cantidadProductoFinal = 0;
  const indiceProducto = memoria.findIndex(libro => libro.id === producto.id)
  let nuevaMemoria = memoria;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem(keyLocalstorage,JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoria = JSON.parse(localStorage.getItem(keyLocalstorage));
  if(memoria && memoria.length > 0){
    cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}


function reiniciarCarrito(){
  localStorage.removeItem(keyLocalstorage);
  actualizarNumeroCarrito();
}



actualizarNumeroCarrito();

