// Definición de productos en formato JSON
const productosJSON = '[{"nombre": "Cuencos", "precio": 3500}, {"nombre": "Platos", "precio": 1500}, {"nombre": "Macetas", "precio": 2000}, {"nombre": "Tazas Chinas", "precio": 2600}, {"nombre": "Platos", "precio": 1500}]';

// Analizar los productos desde JSON a objetos JavaScript
const productos = JSON.parse(productosJSON);

let carrito = [];

// Evento de clic en los botones de productos
document.getElementById("productos").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const productoIndex = parseInt(event.target.dataset.index);
    const productoSeleccionado = productos[productoIndex];
    carrito.push(productoSeleccionado);

    // Actualizar la vista del carrito y el total
    mostrarCarrito();
    calcularTotal();
    guardarCarritoEnLocalStorage();
  }
});

// Evento de cambio en el método de pago
document.getElementById("metodoPago").addEventListener("change", () => {
  const metodoPagoSeleccionado = document.getElementById("metodoPago").value;
  const tarjetaSelect = document.getElementById("tarjeta");

  // Limpiar el select de tarjetas
  tarjetaSelect.innerHTML = "";

  if (metodoPagoSeleccionado === "debito") {
    // Agregar opciones de tarjetas de débito
    const opcionesDebito = ["Visa Débito", "MasterCard Débito"];
    opcionesDebito.forEach((tarjeta) => {
      const option = document.createElement("option");
      option.value = tarjeta.toLowerCase().replace(/\s+/g, ""); // Eliminar espacios y convertir a minúsculas
      option.textContent = tarjeta;
      tarjetaSelect.appendChild(option);
    });
  } else if (metodoPagoSeleccionado === "credito") {
    // Agregar opciones de tarjetas de crédito
    const opcionesCredito = ["Visa Crédito", "MasterCard Crédito", "American Express"];
    opcionesCredito.forEach((tarjeta) => {
      const option = document.createElement("option");
      option.value = tarjeta.toLowerCase().replace(/\s+/g, ""); // Eliminar espacios y convertir a minúsculas
      option.textContent = tarjeta;
      tarjetaSelect.appendChild(option);
    });
  }
});

// Evento de clic en el botón "Vaciar Carrito"
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  carrito = []; // Vaciar el carrito
  mostrarCarrito();
  calcularTotal();
  guardarCarritoEnLocalStorage();
});

// Evento de clic en el botón "Finalizar Compra"
document.getElementById("finalizarCompra").addEventListener("click", () => {
  const metodoPagoSeleccionado = document.getElementById("metodoPago").value;
  const cuotasSeleccionadas = parseInt(document.getElementById("cuotas").value);
  const tarjetaSeleccionada = document.getElementById("tarjeta").value;
  const totalCompra = calcularTotal();
  const valorCuota = totalCompra / cuotasSeleccionadas;

  // Puedes mostrar el valor de la cuota en el mensaje de confirmación
  alert(`Has seleccionado pagar con ${metodoPagoSeleccionado}, en ${cuotasSeleccionadas} cuotas de $${valorCuota.toFixed(2)} cada una, usando la tarjeta ${tarjetaSeleccionada}. ¡Compra completada!`);
});

// Función para calcular el total de la compra
function calcularTotal() {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio;
  });
  document.getElementById("total").textContent = total.toFixed(2);
  return total;
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cargar carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();
    calcularTotal();
  }
}

// Mostrar productos en la página
function mostrarProductos() {
  const productosDiv = document.getElementById("productos");
  productosDiv.innerHTML = "";

  productos.forEach((producto, index) => {
    const boton = document.createElement("button");
    boton.textContent = `${producto.nombre} - $${producto.precio}`;
    boton.dataset.index = index;
    productosDiv.appendChild(boton);
  });
}

// Mostrar el carrito en la página
function mostrarCarrito() {
  const carritoUl = document.getElementById("carrito");
  carritoUl.innerHTML = "";

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    carritoUl.appendChild(li);
  });
}

// Llamar a la función de carga al cargar la página
cargarCarritoDesdeLocalStorage();

// Mostrar productos iniciales
mostrarProductos();