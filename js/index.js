const contenedorTarjetas = document.getElementById("productos-container");

fetch("./js/libros.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement("div");
      card.classList = "tarjeta-producto";
      card.innerHTML = `
        <img src="./img/productos/${product.id}.jpg" alt="Libro ${product.nombre}">
        <h3>${product.nombre}</h3>
        <p class="precio">$${product.precio}</p>
        <button>Agregar al carrito</button>
      `;
      contenedorTarjetas.appendChild(card);
      card.getElementsByTagName("button")[0].addEventListener("click", () => agregarAlCarrito(product));
    });
  })
  
const librosError = "<span>No se pueden cargar los libros, intente más tarde</span>";

const obtenerLibros = async () => {
  let URL = "./js/libros.json";
  let renderizado = ``;

  try {
    let solicitud = await fetch(URL);
    let response = await solicitud.json();

    response.forEach(product => {
      renderizado += `
        <div class="tarjeta-producto">
          <img src="./img/productos/${product.id}.jpg" alt="Libro ${product.nombre}">
          <h3>${product.nombre}</h3>
          <p class="precio">$${product.precio}</p>
          <button>Agregar al carrito</button>
        </div>
      `;
    });

  } catch (err) {
    console.log("Error detectado", err);
    renderizado = librosError;
  }

  finally {
 document.body.innerHTML = renderizado
    }
};



