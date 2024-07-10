/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/public/cliente.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
MAIN.style.paddingTop = '150px';
MAIN.style.paddingBottom = '100px';
MAIN.classList.add('container');
// Se establece el título de la página web.
document.querySelector('title').textContent = 'Frosty - Store';
// Constante para establecer el elemento del título principal.
const MAIN_TITLE = document.getElementById('mainTitle');
/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
    if (DATA.session) {
        // Se verifica si la página web no es el inicio de sesión, de lo contrario se direcciona a la página web principal.
        if (!location.pathname.endsWith('login.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
            <nav class = "navbar navbar-expand-lg py-4 fixed-top navbar-custom">
            <div class = "container">
                <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "index.html">
                    <img src = "../../resources/img/logo_nav.png" alt = "site icon" width="30%">
                </a>
                <button class = "navbar-toggler border-0" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navMenu">
                    <span class = "navbar-toggler-icon"></span>
                </button>
            
                <div class = "collapse navbar-collapse order-lg-1" id = "navMenu">
                    <ul class = "navbar-nav mx-auto text-center">
                        <li class = "nav-item px-2 py-2">
                            <a class = "nav-link text-uppercase text-dark" href = "../public/index.html">home</a>
                        </li>
                        <li class = "nav-item px-2 py-2">
                        <a class="nav-link text-uppercase text-dark dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" data-bs-placement="bottom-start" aria-expanded="false">
                            shop
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="categorias.html">Categories</a>
                            <a class="dropdown-item" href="marcas.html">Brands</a>
                            <a class="dropdown-item" href="products.html?id=1&nombre=Discounts&type=3">Discounts</a>
                            <a class="dropdown-item" href="products.html?id=1&nombre=Catalog&type=4">Catalog</a>
                      </div>
                    </li>
                        <li class = "nav-item px-2 py-2">
                            <a class = "nav-link text-uppercase text-dark" href = "about.html">about</a>
                        </li>
                        <li class = "nav-item px-2 py-2">
                            <a class = "nav-link text-uppercase text-dark" href = "ordenes.html">Orders</a>
                        </li>
                        <li class = "nav-item px-2 py-2">
                            <a class = "nav-link text-uppercase text-dark" href = "direcciones.html">Addresses</a>
                        </li>
                    </ul>
                    <li type="none" class = "nav-item px-2 py-2">
                        <a href = "carrito.html"> <button type = "button" class = "btn position-relative ">
                            <i class = "fa fa-shopping-cart"><i class="bi bi-cart"></i></i>
                        </button> </a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Account: <b>${DATA.username}</b></a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="perfil.html">Edit Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="logOut()">Sign off</a></li>
                    </ul>
                </li>       
                </li>
                </div>
            </div>
            </nav>   
            `);
        } else {
            location.href = 'index.html';
        }
    } else {
        // Se agrega el encabezado de la página web antes del contenido principal.
        MAIN.insertAdjacentHTML('beforebegin', `
        <nav class = "navbar navbar-expand-lg py-4 fixed-top navbar-custom">
        <div class = "container">
            <a class = "navbar-brand d-flex justify-content-between align-items-center order-lg-0" href = "index.html">
                <img src = "../../resources/img/logo_nav.png" alt = "site icon" width="30%">
            </a>
            <button class = "navbar-toggler border-0" type = "button" data-bs-toggle = "collapse" data-bs-target = "#navMenu">
                <span class = "navbar-toggler-icon"></span>
            </button>
        
            <div class = "collapse navbar-collapse order-lg-1" id = "navMenu">
                <ul class = "navbar-nav mx-auto text-center">
                    <li class = "nav-item px-2 py-2">
                        <a class = "nav-link text-uppercase text-dark" href = "../public/index.html">home</a>
                    </li>
                    <li class = "nav-item px-2 py-2">
                        <a class="nav-link text-uppercase text-dark dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" data-bs-placement="bottom-start" aria-expanded="false">
                            shop
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="categorias.html">Categories</a>
                            <a class="dropdown-item" href="marcas.html">Brands</a>
                            <a class="dropdown-item" href="products.html?id=1&nombre=Discounts&type=3">Discounts</a>
                            <a class="dropdown-item" href="products.html?id=1&nombre=Catalog&type=4">Catalog</a>
                      </div>
                    </li>
                    <li class = "nav-item px-2 py-2">
                        <a class = "nav-link text-uppercase text-dark" href = "about.html">about</a>
                    </li>
                </ul>
                <li type="none" class = "nav-item px-2 py-2">
                    <a href = "signup.html">
                        <button type="button" class="btn btn-outline-dark btn position-relative">REGISTER
                        <i class = "fa fa-search"></i>
                        </button>
                    </a>
                </li>
                <li type="none" class = "nav-item px-2 py-2">
                    <a href = "login.html">
                        <button type="button" class="btn btn-outline-primary btn position-relative">LOGIN
                        <i class = "fa fa-heart"></i>
                        </button>
                    </a>
                </li>
            </div>
        </div>
        </nav>        
        `);
    }
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
       <footer>
<div class="container">
    <div class="row">
        <div class="col-lg-3 col-sm-6">
            <div class="single-box">
                <img class="foo" src="../../resources/img/logo_nav.png" alt="" width="40%">
                <h2 class="justify-content-center ">Frosty Threads</h2>

                <h2 class="justify-content-center pt-5">Social Media</h2>
            
            <div class="card-area">
                    <i class="bi bi-facebook"></i>
                     <!-- Enlace a Instagram -->
                    <a href="https://www.instagram.com/fros.tythreads" target="_blank">
                        <i class="bi bi-instagram"></i>
                    </a>
                    <i class="bi bi-twitter-x"></i>

            </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-6">
            <div class="single-box">
                <h2 class="text">SHOP</h2>
            <ul>
                <li><a href="#">Products</a></li>
                <li><a href="#">Discounts</a></li>
            </ul>
            </div>                    
        </div>
        <div class="col-lg-3 col-sm-6">
            <div class="single-box">
                <h2 class="text">COMPANY</h2>
            <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div>                    
        </div>
        <div class="col-lg-3 col-sm-6">
            <div class="single-box">
                <h2 class="text">Stay up to date</h2>
                <div class="input-group mb-3 pt-3">
                    <input type="text" class="form-control" placeholder="Enter your Email" aria-label="Enter your Email ..." aria-describedby="basic-addon2">
                    <button type="button" class="btn btn-outline-light">Light</button>
                </div>
            </div>
        </div>
    </div>
</div>
</footer>
    `);
}


