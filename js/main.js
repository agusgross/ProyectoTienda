let carrito = [];
let total = 0;

// Libros disponibles
const libro1 = {
    id: 1,
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    editorial: "Santillana",
    precio: 10
};

const libro2 = {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    editorial: "Planeta",
    precio: 15
};

const libro3 = {
    id: 3,
    titulo: "La Odisea",
    autor: "Homero",
    editorial: "Prometeo",
    precio: 12
};

const libro4 = {
    id: 4,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    editorial: "Debolsillo",
    precio: 8
};



// Array de libros disponibles
const librosDisponibles = [libro1, libro2, libro3, libro4];

function mostrarLibrosDisponibles() {
    for (const libro of librosDisponibles) {
        console.log(`ID: ${libro.id} - Libro: ${libro.titulo}, Autor: ${libro.autor}, Precio: $${libro.precio}`);
    }
}

// Función para agregar un libro al carrito
function agregarAlCarrito(libroId) {
    for (const libro of librosDisponibles) {
      if (libro.id === libroId) {
        carrito.push(libro);
        total += libro.precio;
        console.log(`Agregado al carrito: ${libro.titulo}.`);
        return;
      }
    }
    console.log("Libro no encontrado.");
  }
  

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    if (!carrito[0]) { 
        console.log("El carrito está vacío.");
        return;
    }
    console.log("Contenido del carrito:");
    for (let i = 0; carrito[i]; i++) { 
        console.log(`- ${carrito[i].titulo}: $${carrito[i].precio}`);
    }
    console.log(`Total: $${total}`);
}

// Función para finalizar la compra
function finalizarCompra() {
    if (!carrito[0]) { 
        alert("El carrito está vacío. No se puede finalizar la compra.");
    } else {
        alert(`¡Gracias por su compra! El total es: $${total}`);
        carrito = []; 
        total = 0; 
        console.log("Carrito vaciado.");
    }
}

// Menu
let menu = 0;

while (menu !== 5) {
    menu = parseInt(prompt("Elige una opción: \n1 - Ver libros disponibles \n2 - Agregar libro al carrito \n3 - Mostrar carrito \n4 - Finalizar compra \n5 - Salir"));

    switch(menu) {
        case 1:
            mostrarLibrosDisponibles();
            break;
        case 2:
            let libroId = parseInt(prompt("Ingresa el ID del libro que deseas agregar (1-4):"));
            agregarAlCarrito(libroId);
            break;
        case 3:
            mostrarCarrito();
            break;
        case 4:
            finalizarCompra();
            break;
        case 5:
            console.log("Saliendo de la tienda...");
            break;
        default:
            alert("Opción incorrecta. Por favor, elige otra.");
            break;
    }
}