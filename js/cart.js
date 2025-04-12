const contenedorTarjetas = document.getElementById("cart-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");


function crearTarjetasProductosCarrito() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  if (productos && productos.length > 0) {
      productos.forEach((producto) => {
          const nuevoLibro = document.createElement("div");
          nuevoLibro.classList = "tarjeta-producto";
          nuevoLibro.innerHTML = `
          <img src="./img/productos/${producto.id}.jpg" alt="Libro 1">
          <h3>${producto.nombre}</h3>
          <span>$${producto.precio}</span>
          <div>
          <button>-</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button>+</button>
          </div>
          `;
          contenedorTarjetas.appendChild(nuevoLibro);
          nuevoLibro
              .getElementsByTagName("button")[0]
              .addEventListener("click", (e) => {
                  const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                  cantidadElement.innerText = restarAlCarrito(producto);
                  crearTarjetasProductosCarrito();
                  actualizarTotales();
              });
          nuevoLibro
              .getElementsByTagName("button")[1]
              .addEventListener("click", (e) => {
                  const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
                  cantidadElement.innerText = agregarAlCarrito(producto);
                  actualizarTotales();
              });
      });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasProductosCarrito();

function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById('comprar').addEventListener('click', function() {
  Swal.fire({
    title: "¡Compra exitosa!",
    icon: "success",
    draggable: false
  });
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  let resumenCompra = '¡Gracias por confiar en nosotros!<br><br>Resumen de tu compra:<br><br>'; 
  let total = 0;
  const resumenElement = document.getElementById('resumen');


  if (productos && productos.length > 0) {
      productos.forEach(producto => {
          resumenCompra += `Libro:${producto.nombre}<br> Autor:${producto.autor}<br> Editorial:${producto.editorial}<br> Precio: $${producto.precio} (Cantidad: ${producto.cantidad})<br><br>`;
          total += producto.precio * producto.cantidad; 
      });
      resumenCompra += `Total: $${total}<br><br>`;
      
      resumenElement.innerHTML = resumenCompra; 
    

     
      resumenElement.classList.remove("escondido");

      totalesContainer.classList.add("escondido");
      
  
      contenedorTarjetas.innerHTML = ""; 
      cantidadElement.innerText = 0; 
      precioElement.innerText = 0; 
      
      
      const volverBoton = document.createElement('button')
      volverBoton.innerText = 'Volver al Inicio';
      volverBoton.onclick = function() {
          window.location.href = './index.html'; 
      };
      resumenElement.appendChild(volverBoton); 
  } else {
      resumenElement.innerText = 'El carrito está vacío.';
      resumenElement.classList.remove("escondido");
  }

  reiniciarCarrito();
});


document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem(keyLocalstorage));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}
