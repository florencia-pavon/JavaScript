class Producto {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = Number(precio);
    this.imagen = imagen;
    this.cantidad = 0;
  }

}

tortas = [];
cookies = [];


tortas.push(
  new Producto("marquise", 20500, "./multimedia/tortas/marquise.jpg"),
  new Producto("lemon", 17500, "./multimedia/tortas/lemon.jpg"),
  new Producto("rogel", 18500, "./multimedia/tortas/rogel.jpg"),
  new Producto("cheescake", 18000, "./multimedia/tortas/cheescake.jpg"),
  new Producto("cabsha", 20500, "./multimedia/tortas/cabsha.jpg"),
  new Producto("pavlova", 22000, "./multimedia/tortas/pavlova.jpg")
);

cookies.push(
  new Producto("carrot", 2500, "./multimedia/cookies/carrot.jpg"),
  new Producto("brownie", 2000, "./multimedia/cookies/brownie.jpg"),
  new Producto("canela", 2000, "./multimedia/cookies/canela.jpg"),
  new Producto("chip", 2000, "./multimedia/cookies/chip.jpg"),
  new Producto("red", 3000, "./multimedia/cookies/red.jpg"),
  new Producto("pistacho", 3000, "./multimedia/cookies/pistacho.jpg")
);


function eliminarDelCarrito(nombreProducto){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  imprimirCarritoHTML();
}

function calcularTotal(){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  return carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
}

function imprimirCarritoHTML(){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  const contenedor = document.getElementById("contenedor-carrito");
  let tabla = contenedor.querySelector("table");
  if (!tabla) {
    tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped");
    tabla.innerHTML = `
    <thead>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
    </thead>
  `;
  contenedor.appendChild(tabla);
  }

  const tbody = tabla.querySelector("tbody") || document.createElement("tbody");
  tabla.appendChild(tbody);
  tbody.innerHTML = "";
  
  carrito.forEach((producto, index) =>{
    const fila = document.createElement("tr");

    fila.innerHTML = `
          <th>${index+1}</th>
          <th>${producto.nombre}</th>
          <th>${producto.precio}</th>
          <th>${producto.cantidad}</th>
          <th>${producto.cantidad*producto.precio}</th>
          <th><button id="eliminar" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
          </th>
    `;

    tbody.appendChild(fila);
    const botonEliminar = fila.querySelector("#eliminar");
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.nombre)
    });
  });

  tbody.innerHTML += `
    <tr>
      <th colspan="4">Total</th>
      <th>${calcularTotal()}</th>
    </tr>
  `;
}

function agregarAlCarrito(producto){
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoExistente = carrito.find(p => p.nombre === producto.nombre);
  if(productoExistente){
    productoExistente.cantidad += producto.cantidad;
  }
  else{
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (carrito.length > 0) {
    imprimirCarritoHTML();
  }
}

function mostrarProductosHTML(productos, idContenedor) {
  const contenedor = document.getElementById(idContenedor);

  const indicadores = document.createElement("ol");
  indicadores.classList.add("carousel-indicators");
  contenedor.appendChild(indicadores);

  const inner = document.createElement("div");
  inner.classList.add("carousel-inner");
  contenedor.appendChild(inner);

  productos.forEach((producto, index) => {
    const indicador = document.createElement("li");
    indicador.setAttribute("data-target", `#${idContenedor}`);
    indicador.setAttribute("data-slide-to", index);
    if (index === 0) indicador.classList.add("active");
    indicadores.appendChild(indicador);

    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    item.innerHTML = `
        <img src="${producto.imagen}" class="d-block w-100" alt="${producto.nombre}"/>
        <div class="carousel-caption">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <label for="cantidad">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad-${producto.nombre}"
                  min="1"
                  required
                />
            <button id="${producto.nombre}">Agregar al carrito</button>
        </div>
        `;


    inner.appendChild(item);
    const boton = document.getElementById(`${producto.nombre}`);
    boton.addEventListener("click", ()=> {
      const cantidadInput = document.getElementById(`cantidad-${producto.nombre}`);
      producto.cantidad = parseInt(cantidadInput.value, 10) || 1;
      agregarAlCarrito(producto);
    });
      
  });
}

mostrarProductosHTML(tortas, "carouselTortas");
mostrarProductosHTML(cookies, "carouselCookies");


