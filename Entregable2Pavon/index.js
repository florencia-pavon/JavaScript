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


function agregarAlCarrito(producto){
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (carrito.length > 0) {
    imprimirCarritoHTML(carrito);
  }
}

function mostrarTortasHTML(tortas) {
  const contenedor = document.getElementById("carouselTortas");

  const indicadores = document.createElement("ol");
  indicadores.classList.add("carousel-indicators");
  contenedor.appendChild(indicadores);

  const inner = document.createElement("div");
  inner.classList.add("carousel-inner");
  contenedor.appendChild(inner);

  tortas.forEach((torta, index) => {
    const indicador = document.createElement("li");
    indicador.setAttribute("data-target", "#carouselTortas");
    indicador.setAttribute("data-slide-to", index);
    if (index === 0) indicador.classList.add("active");
    indicadores.appendChild(indicador);

    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    item.innerHTML = `
        <img src="${torta.imagen}" class="d-block w-100" alt="${torta.nombre}"/>
        <div class="carousel-caption">
            <h3>${torta.nombre}</h3>
            <p>$${torta.precio}</p>
            <label for="cantidad">Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad-${torta.nombre}"
                  min="1"
                  required
                />
            <button id="${torta.nombre}">Agregar al carrito</button>
        </div>
        `;


    inner.appendChild(item);
    const boton = document.getElementById(`${torta.nombre}`);
    boton.addEventListener("click", ()=> {
      const cantidadInput = document.getElementById(`cantidad-${torta.nombre}`);
      torta.cantidad = parseInt(cantidadInput.value, 10) || 1;
      agregarAlCarrito(torta);
    });
      
  });


}

mostrarTortasHTML(tortas);

