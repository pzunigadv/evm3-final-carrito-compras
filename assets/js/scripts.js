// script.js

// Creacion de la clase Producto
class Producto {
    constructor(idproducto, nombre, precio, stock, imagen) {
		this.idproducto = idproducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
		this.imagen = imagen;
    }
}

// Creacion de algunos productos
let productos = [
	//Producto(idproducto, nombre, precio, stock, imagen)
    new Producto("1", "Leche", 1000, 10,"./assets/img/leche.jpg"),
    new Producto("2", "Pan de Molde", 2000, 10,"./assets/img/pandemolde.jpg"),
    new Producto("3","Queso", 1200, 10,"./assets/img/queso.jpg"),
    new Producto("4","Mermelada", 890, 10,"./assets/img/mermelada.jpg"),
    new Producto("5","azucar", 2000, 15,"./assets/img/azucar.jpg"),
    new Producto("6","Mantequilla", 1290, 10,"./assets/img/mantequilla.jpg")
];

// Mostramos los productos en la página utilizando funcion flecha Nota: Tambien se puede hacer de otra manera la funcion
const mostrarProductos = () => {
    const productosDiv = document.getElementById("listadoproductos");
    productos.forEach((producto, index) => {
        let productoDiv = document.createElement("div");
        productoDiv.classList.add("col-md-4", "mb-4");
        productoDiv.innerHTML = `
            <div class="card">
			<img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
					<ul class="list-unstyled mt-3 mb-4">
						<li>Precio: $${producto.precio.toLocaleString('es-CL')}</li>
					</ul>
                    <button class="w-100 btn btn-lg btn-primary" onclick="agregarAlCarrito(${index})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosDiv.appendChild(productoDiv);
    });
};

// Creacion de la clase Carrito
class Carrito {
    constructor() {
        this.productos = []; // Array productos
		this.cantidad = 0; // inicializamos cantidad
		this.precioTotal = 0; // inicializamos precio total
    }
	
    agregarProducto(producto) {
		//Verificamos Stock
        if (producto.stock > 0) { 
            this.productos.push(producto);
            producto.stock--;
        } else {
            alert(`${producto.nombre} no tiene stock disponible.`);
        }
		this.cantidad++;
		this.precioTotal += producto.precio;
    } 

   
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

  


    mostrarDetalles() {
        const detalleCarrito = document.getElementById("detalleCarrito");
        detalleCarrito.innerHTML = "";
    
        // Crear un objeto auxiliar para agrupar productos repetidos
        const productosAgrupados = {};
    
        // Agrupar productos por nombre y calcular cantidad y precio total
        this.productos.forEach(producto => {
            if (productosAgrupados[producto.nombre]) {
                productosAgrupados[producto.nombre].cantidad += 1;
                productosAgrupados[producto.nombre].precioTotal += producto.precio;
            } else {
                productosAgrupados[producto.nombre] = {
                    cantidad: 1,
                    precioTotal: producto.precio
                };
            }
        });
    
        // Mostrar los productos agrupados en el modal
        for (const nombreProducto in productosAgrupados) {
            const item = document.createElement("li");
            const { cantidad, precioTotal } = productosAgrupados[nombreProducto];
            item.textContent = `${cantidad} x ${nombreProducto} - $${precioTotal.toLocaleString('es-CL')}`;
            detalleCarrito.appendChild(item);
        }
    
        // Mostrar el total de la compra
        document.getElementById("totalCompra").textContent = `Total: $${this.calcularTotal().toLocaleString('es-CL')}`;
        $('#carritoModal').modal('show');
    }     
     
    // Método para vaciar el carrito
    finalizarCompra() {
        document.getElementById("total").textContent = `$${this.calcularTotal().toLocaleString('es-CL')}`;
        $('#pagoFinalizado').modal('show');
        this.productos = [];
        this.cantidad = 0;
        this.precioTotal = 0;
        this.mostrarDetalles();
        
    }
}



// Instanciamos el carrito
const carrito = new Carrito();

// Función para agregar productos al carrito
const agregarAlCarrito = (index) => {
    carrito.agregarProducto(productos[index]);
    carrito.mostrarDetalles();

};



// Función para finalizar la compra
const finalizarCompra = () => {
    carrito.finalizarCompra();
    $('#carritoModal').modal('hide'); // cerrar modal
    
};


// Inicializamos la página mostrando los productos
mostrarProductos();

