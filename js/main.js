let carrito = {
    items: []
};
let total = 0;

const librosDisponibles = [
 {
    id: 1,
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    editorial: "Santillana",
    precio: 10,
    stock: 5,
},

 {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    editorial: "Planeta",
    precio: 15,
    stock: 7,
},

{
    id: 3,
    titulo: "Dune",
    autor: "Frank Herbert",
    editorial: "Nova",
    precio: 12,
    stock: 13,
},

 {
    id: 4,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    editorial: "Debolsillo",
    precio: 8,
    stock: 2,
},

];

const carritoAlmacenado = JSON.parse(localStorage.getItem('carrito'));
if (carritoAlmacenado) {
    carrito = carritoAlmacenado;
    total = carrito.items.reduce((sum, item) => sum + (item.cantidad * item.precio), 0);
}

mostrarCarrito();

function mostrarLibrosDisponibles() {
    const contenedorLibros = document.getElementById("librosDisponibles");
    contenedorLibros.innerHTML = "";
    librosDisponibles.forEach(libro => {
        const divLibro = document.createElement("div");
        divLibro.className = "libro";
        divLibro.innerHTML = `
            <p>${libro.titulo} - ${libro.autor} - $${libro.precio} (Stock: ${libro.stock})</p>
            <button onclick="agregarAlCarrito(${libro.id})">Agregar al Carrito</button>
        `;
        contenedorLibros.appendChild(divLibro);
    });
}

function verificarStock(libroId) {
    const libro = librosDisponibles.find(libro => libro.id === libroId);
    return libro && libro.stock > 0;
}


function agregarAlCarrito(libroId) {
    if (verificarStock(libroId)) {
        const libro = librosDisponibles.find(libro => libro.id === libroId);
        const itemEnCarrito = carrito.items.find(item => item.id === libro.id);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.items.push({ id: libro.id, producto: libro.titulo, cantidad: 1, precio: libro.precio });
        }
        total += libro.precio;
        libro.stock--;
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        mostrarCarrito();
    } else {
        mostrarMensaje("No hay stock disponible para este libro.");
    }
}


function mostrarCarrito() {
    const contenidoCarrito = document.getElementById("contenidoCarrito");
    contenidoCarrito.innerHTML = "";
    carrito.items.forEach(item => {
        const divItem = document.createElement("div");
        divItem.innerHTML = `${item.producto} - ${item.cantidad} x $${item.precio} = $${item.cantidad * item.precio}`;
        contenidoCarrito.appendChild(divItem);
    });
    document.getElementById("totalCarrito").textContent = `Total: $${total}`;
}

function mostrarMensaje(mensaje) {
    const contenedorMensajes = document.createElement("div");
    contenedorMensajes.textContent = mensaje;
    document.body.appendChild(contenedorMensajes);
}

document.getElementById("finalizarCompra").addEventListener("click", function() {
    if (carrito.items.length > 0) {
        mostrarMensaje(`¡Gracias por su compra! El total es: $${total}`);
        carrito = { items: [] };
        total = 0;
        
        localStorage.removeItem('carrito');
        
        mostrarCarrito();
    } else {
        mostrarMensaje("El carrito está vacío. No se puede finalizar la compra.");
    }
});

mostrarLibrosDisponibles();