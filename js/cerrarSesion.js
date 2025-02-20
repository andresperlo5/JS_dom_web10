const botonCerrarSesion = document.getElementById("idCerrarSesion");

const cerrarSesion = (ev) => {
  ev.preventDefault();
  const usuariosLs = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuarioFind = usuariosLs.find((usuario) => usuario.login);

  usuarioFind.login = false;
  localStorage.setItem("usuarios", JSON.stringify(usuariosLs));

  setTimeout(() => {
    location.href = "../index.html";
  }, 1000);
};

botonCerrarSesion.addEventListener("click", cerrarSesion);
