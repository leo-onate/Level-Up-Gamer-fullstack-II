// Inicializar carrito si no existe
if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([]));
}

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Si ya existe, suma cantidad
    let existente = carrito.find(p => p.id === producto.id);
    if (existente) {
        existente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto añadido al carrito');
}

// Asignar evento a los botones
document.querySelectorAll('.btn-carrito').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.producto-card');
        const producto = {
            id: this.getAttribute('data-id'),
            nombre: card.querySelector('h3').textContent,
            descripcion: card.querySelector('p').textContent,
            imagen: card.querySelector('img').src,
            precio: parseInt(this.getAttribute('data-precio'))
        };
        agregarAlCarrito(producto);
    });
});

// Mostrar/Ocultar el carrito sidebar
const carritoSidebar = document.getElementById('carrito-sidebar');
const carritoLink = document.getElementById('carrito-link');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');

carritoLink.addEventListener('click', function(e) {
    e.preventDefault();
    mostrarCarritoSidebar();
});

cerrarCarritoBtn.addEventListener('click', function() {
    carritoSidebar.classList.remove('abierto');
});

// Función para mostrar el carrito y sus productos
function mostrarCarritoSidebar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');
    carritoItems.innerHTML = '';

    let total = 0;
    carrito.forEach(producto => {
        total += producto.cantidad * producto.precio;
        const item = document.createElement('div');
        item.className = 'carrito-item';
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="carrito-item-info">
                <div class="carrito-item-nombre">${producto.nombre}</div>
                <div class="carrito-item-precio">Precio: $${producto.precio}</div>
                <div class="carrito-item-cantidad">
                    <button class="restar-cantidad" data-id="${producto.id}">−</button>
                    <span>${producto.cantidad}</span>
                    <button class="sumar-cantidad" data-id="${producto.id}">+</button>
                </div>
            </div>
            <button class="carrito-item-eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        carritoItems.appendChild(item);
    });

    // Descuento para usuarios con "duoc" en el correo (ignorando mayúsculas)
    let descuento = 0;
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (
        usuarioLogueado &&
        usuarioLogueado.email &&
        usuarioLogueado.email.toLowerCase().includes('duoc')
    ) {
        descuento = Math.round(total * 0.20);
    }

    carritoTotal.innerHTML = descuento > 0
        ? `<span style="text-decoration:line-through;color:#ff4444;">$${total}</span> <span style="color:#00ff99;">$${total - descuento} (20% DCTO)</span>`
        : total;

    // Eventos para eliminar, sumar y restar cantidad
    document.querySelectorAll('.carrito-item-eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            eliminarDelCarrito(this.getAttribute('data-id'));
            mostrarCarritoSidebar();
        });
    });
    document.querySelectorAll('.sumar-cantidad').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(this.getAttribute('data-id'), 1);
            mostrarCarritoSidebar();
        });
    });
    document.querySelectorAll('.restar-cantidad').forEach(btn => {
        btn.addEventListener('click', function() {
            cambiarCantidad(this.getAttribute('data-id'), -1);
            mostrarCarritoSidebar();
        });
    });

    carritoSidebar.classList.add('abierto');
}

// Cambiar cantidad de producto
function cambiarCantidad(id, delta) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += delta;
        if (producto.cantidad < 1) {
            // Si la cantidad es menor a 1, eliminar el producto
            carrito = carrito.filter(p => p.id !== id);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}