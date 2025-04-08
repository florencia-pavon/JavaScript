
async function obtenerProductos() {
  try{
      const response = await fetch("http://127.0.0.1:5501/JavaScript/ProyectoFinalPavon/JSON/productos.json");
      const data = await response.json();
      mostrarProductosHTML(data.tortas, "carouselTortas");
      mostrarProductosHTML(data.cookies, "carouselCookies");
  }
  catch(error){
      console.error("Ups", error);
  }  
}
obtenerProductos();

function eliminarDelCarrito(nombreProducto){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  imprimirCarritoHTML();
}


function imprimirCarritoHTML(){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  const contenedor = document.getElementById("contenedor-carrito");
  let tabla = contenedor.querySelector("table");
  if (!tabla) {
    tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.innerHTML = `
    <thead>
        <tr>
          <th> <i class="bi bi-cart3"></i> </th>
          <th colspan="5" class="text-center">Carrito de Compras</th>
        </tr>
        <tr>
          <th>#</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Eliminar</th>
        </tr>
    </thead>
  `;
  contenedor.appendChild(tabla);
  }

  const tbody = tabla.querySelector("tbody") || document.createElement("tbody");
  tabla.appendChild(tbody);
  tbody.innerHTML = "";
  let total = 0;
  
  carrito.forEach((producto, index) =>{
    const fila = document.createElement("tr");
    let subtotal = producto.cantidad*producto.precio;
    
    total += subtotal;

    fila.innerHTML = `
          <th>${index+1}</th>
          <th>${producto.nombre}</th>
          <th>${producto.precio}</th>
          <th>${producto.cantidad}</th>
          <th>${subtotal}</th>
          <th ><button id="eliminar" class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
              </button>
          </th>
    `;

    tbody.appendChild(fila);
    const botonEliminar = fila.querySelector("#eliminar");
    botonEliminar.addEventListener("click", () => {
      Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminará el item del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarDelCarrito(producto.nombre)
          Swal.fire({
            title: "Eliminado",
            text: "Su item fue eliminado del carrito",
            icon: "success"
          });
        }
      });
    });
  });
  const filaVacia = document.createElement("tr");
  filaVacia.innerHTML = `
    <th colspan="6"></th>
  `;
  tbody.appendChild(filaVacia);
  const filaTotal = document.createElement("tr");
  filaTotal.innerHTML = `
    <th colspan="4" >TOTAL</th>
    <th>${total}</th>
  `;
  tbody.appendChild(filaTotal);
  const botonComprar = document.createElement("button");
  botonComprar.classList.add("btn", "btn-success", "my-3");
  botonComprar.textContent = "Comprar";
  filaTotal.appendChild(botonComprar);
  botonComprar.addEventListener("click", () => {
    Swal.fire({
      title: "Gracias por su compra!",
      icon: "success",
      draggable: true
    });
    localStorage.removeItem("carrito");
    imprimirCarritoHTML();
  });
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
        <div class="carousel-caption text-start d-flex flex-column align-items-center">
            <h3>${producto.nombre}</h3>
            <p class="description">$${producto.precio}</p>
            <div class="center-horizontal gap-2 my-2"> 
              <input
                  type="number"
                  placeholder="Cantidad"
                  class="form-control"
                  name="cantidad"
                  id="cantidad-${producto.nombre}"
                  min="1"
                  required
              />
            </div>
            <button id="${producto.nombre}" class="btn btn-light">Agregar al carrito</button>
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




