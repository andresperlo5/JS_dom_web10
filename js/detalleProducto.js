/* const id = location.search.split("?id=")[1];
const idParams = new URL(location.href).searchParams.get("id");
console.log(idParams); */
const idParams = new URLSearchParams(location.search).get("id");

const divDetalleProducto = document.getElementById("idDetalleProducto");

const productosLs = JSON.parse(localStorage.getItem("productos")) || [];

const productoClickeado = productosLs.find(
  (producto) => producto.id === Number(idParams)
);

divDetalleProducto.innerHTML = `
  <div>
    <img src="${
      productoClickeado?.imagen || productoClickeado?.image
    }" alt="" width='200'/>
  </div>
   <div>
     <h3>${productoClickeado?.titulo || productoClickeado?.title}</h3>
     <p>${productoClickeado?.descripcion || productoClickeado?.description}</p>
      <button class="btn btn-warning">Agregar Carrito</button>
      <button class="btn btn-danger">Agregar Favorito</button>
    </div>

`;
