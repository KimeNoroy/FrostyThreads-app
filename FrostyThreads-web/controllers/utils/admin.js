

/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

  // Constante para completar la ruta de la API.
  const USER_API = 'services/admin/administrador.php';
  // Constante para establecer el elemento del contenido principal.
  const MAIN = document.querySelector('main');

MAIN.style.paddingTop = '105px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');

//template del navbar
const NAVBAR = `<nav class="navbar navbar-expand-lg text-white fixed-top">
<div class="container-fluid">
  <a class="navbar-brand" href="index.html"><img src="../../resources/img/logo.png" alt="logo" class="logo"></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span> 
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="prenda.html">Clothes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="cliente.html">Clients</a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="administrador.html">Admins</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="direccion.html">Addresses</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="categoria.html">Categories</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="talla.html">Sizes</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="tipo_talla.html">Size Types</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="descuento.html">Discounts</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="orden.html">Orders</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="marca.html">Brands</a>
      </li>
      <li class="nav-item">
        <a class="nav-link me-3 text-white" href="tipo_admin.html">Admin types</a>
      </li>
      <li class="nav-item">
        <a class="navbar-brand" href="land_page.html"><img src="../../resources/img/home.png" alt="logo" class="home"></a>
      </li>
      <li class="nav-item">
        <a class="navbar-brand"><img src="../../resources/img/log_out.png" alt="logo" class="home" onclick="logOut()"></a>
      </li>
    </ul>
  </div>
</div>
</nav>`;

const loadTemplate = async () => {
  // Petición para obtener en nombre del usuario que ha iniciado sesión.
  const DATA = await fetchData(USER_API, 'getUser');
  // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
  if (DATA.session || true) {
    // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status || true) {
      // Se agrega el encabezado de la página web antes del contenido principal.
      MAIN.insertAdjacentHTML('beforebegin', NAVBAR);

    } else {
      sweetAlert(3, DATA.error, false, 'index.html');
    }
  }
}


