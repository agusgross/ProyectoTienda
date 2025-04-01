const contenedorTarjetas = document.getElementById("productos-container");


function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoLibro = document.createElement("div");
    nuevoLibro.classList = "tarjeta-producto"
    nuevoLibro.innerHTML = `
    <img src="./img/productos/${producto.id}.jpg" alt="Libro 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevoLibro);
    nuevoLibro.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}
crearTarjetasProductosInicio(libros);