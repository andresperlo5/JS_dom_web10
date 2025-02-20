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
const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!productosLs.length) {
  obtenerProductosApi();
}

const inputUsuario = document.getElementById("idInputUsuario");
const inputEmail = document.getElementById("idInputEmail");
const inputContrasenia = document.getElementById("idInputContrasenia");
const inputRepContrasenia = document.getElementById("idInputRepContrasenia");
const inputCheck = document.getElementById("idInputCheck");
const botonRegistro = document.getElementById("idBotonRegistro");
const divErrorUsuario = document.getElementById("idDivErrorUsuario");

const inputUsuarioIs = document.getElementById("idInputUsuarioIniciarSesion");
const inputContraseniaIs = document.getElementById(
  "idInputContraseniaIniciarSesion"
);
const botonInicioDeSesion = document.getElementById("idBotonIniciarSesion");
divErrorUsuario.classList.add("d-none");

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
         <h5 class="card-title text-truncate">${
           producto?.titulo || producto?.title
         }</h5>
          <p class="card-text text-truncate">
          ${producto?.descripcion || producto?.description}
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

const registroUsuario = (ev) => {
  ev.preventDefault();

  if (!inputUsuario.value) {
    inputUsuario.classList.add("is-invalid");
    divErrorUsuario.classList.remove("d-none");
  } else if (!inputEmail.value) {
    alert("Campo Email vacio");
  }

  if (
    inputUsuario.value &&
    inputEmail.value &&
    inputContrasenia.value &&
    inputRepContrasenia.value &&
    inputCheck.checked
  ) {
    const usuarioExiste = usuariosLs.find(
      (usuario) => usuario.nombreUsuario === inputUsuario.value.toLowerCase()
    );

    const emailExiste = usuariosLs.find(
      (usuario) => usuario.emailUsuario === inputEmail.value.toLowerCase()
    );

    if (usuarioExiste || emailExiste) {
      alert("Este usuario o email no esta disponible");
      return;
    }

    /*     if (emailExiste) {
      alert("Este email no esta disponible");
      return;
    } */

    /*     const validarFormatoEmail = new RegExp(
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    );

    console.log(validarFormatoEmail.test(inputEmail.value)); */

    if (inputContrasenia.value === inputRepContrasenia.value) {
      const nuevoUsuario = {
        id: usuariosLs[usuariosLs.length - 1]?.id + 1 || 1,
        nombreUsuario: inputUsuario.value.toLowerCase(),
        emailUsuario: inputEmail.value.toLowerCase(),
        contraniaUsuario: inputContrasenia.value,
        rol: "usuario",
        login: false,
        status: "enabled",
      };

      usuariosLs.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

      inputUsuario.value = "";
      inputEmail.value = "";
      inputContrasenia.value = "";
      inputRepContrasenia.value = "";
      inputCheck.checked = false;

      //location.reload();
    } else {
      alert("Las contraseñas no son iguales");
    }
  }
};

const validarInputUsuario = (ev) => {
  if (ev.target.value) {
    inputUsuario.classList.remove("is-invalid");
    divErrorUsuario.classList.add("d-none");
  } else {
    inputUsuario.classList.add("is-invalid");
    divErrorUsuario.classList.remove("d-none");
  }
};

const iniciarSesionUsuario = (ev) => {
  ev.preventDefault();
  const usuarioExiste = usuariosLs.find(
    (usuario) => usuario.nombreUsuario === inputUsuarioIs.value
  );
  if (usuarioExiste) {
    if (usuarioExiste.contraniaUsuario === inputContraseniaIs.value) {
      usuarioExiste.login = true;
      localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

      if (usuarioExiste.rol === "usuario") {
        setTimeout(() => {
          location.href = "../paginas/usuario.html";
        }, 1000);
      } else {
        setTimeout(() => {
          location.href = "../paginas/admin.html";
        }, 1000);
      }
    } else {
      alert("Usuario y/o contraseña no coinciden. CONTRASEÑA");
    }
  } else {
    alert("Usuario y/o contraseña no coinciden. USUARIO");
  }
};

botonRegistro.addEventListener("click", registroUsuario);
inputUsuario.addEventListener("input", validarInputUsuario);
botonInicioDeSesion.addEventListener("click", iniciarSesionUsuario);
