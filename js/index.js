const productos = [
  {
    id: 1,
    imagen:
      "https://acdn.mitiendanube.com/stores/829/696/products/a1321-b0bbc79fad5fc66c8f16643738650442-480-0.jpg",
    titulo: "Samsung A13",
    descripcion: "Celular 1",
  },
  {
    id: 2,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbWRx_b-AVGRcmEGVHfzKqFkz4xgVez00itQ&s",
    titulo: "Samsung M33",
    descripcion: "Celular 2",
  },
  {
    id: 3,
    imagen:
      "https://i.ebayimg.com/thumbs/images/g/uM0AAOSwXoFlFgSZ/s-l1200.jpg",
    titulo: "Samsung A23",
    descripcion: "Celular 3",
  },
];

const obtenerProductosApi = async () => {
  try {
    const productoApi = await fetch("https://fakestoreapi.com/products");

    const data = await productoApi.json();

    const eleccion = prompt(
      "Empezar la aplicacion con: 1-Array personal 2- Array desde una API"
    );

    if (Number(eleccion) === 1) {
      localStorage.setItem("productos", JSON.stringify(productos));
    } else if (Number(eleccion) === 2) {
      localStorage.setItem("productos", JSON.stringify(data));
    } else {
      alert("opcion incorrecta");
    }
  } catch (error) {
    console.log(error);
  }
};

const productosLs = JSON.parse(localStorage.getItem("productos")) || [];

if (!productosLs.length) {
  obtenerProductosApi();
}

const filaProductos = document.getElementById("idRowProductos");

//MAP -
const res = productosLs.map(
  (producto) => `
 <div class="col-12 col-md-6 col-lg-4 my-3">
     <div class="card">
       <img
       src="${producto?.imagen || producto?.image}"
       class="card-img-top"
       alt="..."
       />
       <div class="card-body">
         <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">
          ${producto.descripcion}
          </p>
          <div class="text-center">
           <a href="../paginas/productos/detalle-producto.html?id=${
             producto.id
           }" class="btn btn-primary">Ver Mas</a>
          </div>
         </div>
        </div>
      </div>
`
);

filaProductos.innerHTML = res.join("");

/* productos.forEach((producto) => {
  const cardDivPadre = document.createElement("div");
  cardDivPadre.classList.add("col-12", "col-md-6", "col-lg-4", "my-3");

  const card = document.createElement("div");
  card.classList.add("card");

  const cardImg = document.createElement("img");
  cardImg.src = producto.imagen;
  cardImg.classList.add("card-img-top");
  cardImg.alt = producto?.alt;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = producto.titulo;

  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = producto.descripcion;

  const cardBoton = document.createElement("div");
  cardBoton.classList.add("text-center");

  const etiquetaADelBoton = document.createElement("a");
  etiquetaADelBoton.classList.add("btn", "btn-primary");
  etiquetaADelBoton.href = "#";
  etiquetaADelBoton.textContent = "Ver Mas";

  filaProductos.appendChild(cardDivPadre);
  cardDivPadre.appendChild(card);
  card.appendChild(cardImg);
  card.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardBoton);
  cardBoton.appendChild(etiquetaADelBoton);
});
 */
