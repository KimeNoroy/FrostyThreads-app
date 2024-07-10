// Constante para completar la ruta de la API.
const PRENDA_API = 'services/public/prenda.php';
// Constante para completar la ruta de la API.
const ORDEN_API = 'services/public/orden.php';

const COMMENT_API = 'services/public/comentario.php';

// Variable para almacenar el ID de la prenda seleccionada.
var ID_PRENDA = null;
// Contador para la cantidad de la prenda seleccionada.
var CONTADOR = 1;
// Variable para almacenar las existencias disponibles de la prenda.
var EXISTENCIAS = null;

// Constantes para obtener los elementos que representan los detalles de la prenda.
const PRENDA_IMG = document.getElementById('imagenPrenda');
const PRENDA_NOMBRE = document.getElementById('nombrePrenda');
const PRENDA_DETALLE = document.getElementById('detallePrenda');
const PRENDA_CANTIDAD = document.getElementById('cantidadPrenda');
const PRENDA_PRECIO = document.getElementById('precioPrenda');
const STARS_CONTAINER = document.getElementById('startsContainer');
const DETALLE_COMENTARIO = document.getElementById('detalleComentario');
const SAVE_MODAL = new bootstrap.Modal('#saveModal');
const MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm')

const BTN_UP = document.getElementById('upBtn');
const BTN_DOWN = document.getElementById('downBtn');
const BTN_ADD = document.getElementById('addBtn');
const BTN_COMMENT = document.getElementById('addComment');

var STAR1 = null;
var STAR2 = null;
var STAR3 = null;
var STAR4 = null;
var STAR5 = null;

var Qualification = 0;
var Detalle_Orden = null;

const COMENTARIOS = document.getElementById('comentarios');

// Evento que se ejecuta cuando el documento ha cargado completamente.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    ID_PRENDA = localStorage.getItem('idPrenda');
    //cargar información de la prenda
    loadData();
    //cargar los comentarios
    loadComments();
});

const fillStarts = (value, where) =>{
    let cantidad = 5;
    document.getElementById(where).innerHTML = '';
    let contador = 0;
    for(; contador<value; contador++){
        document.getElementById(where).innerHTML+=`<i class="bi bi-star-fill"></i>`;
    }
    for(;contador<cantidad; contador++){
        document.getElementById(where).innerHTML+=`<i class="bi bi-star"></i>`;
    }
}

const fillStartsModal = (value, where) =>{
    let cantidad = 5;
    document.getElementById(where).innerHTML = '<p>Qualification: </p>';

    let contador = 0;
    for(; contador<value; contador++){
        document.getElementById(where).innerHTML+=`<i class="bi bi-star-fill" id="star${contador+1}"></i>`;
    }
    for(;contador<cantidad; contador++){
        document.getElementById(where).innerHTML+=`<i class="bi bi-star" id="star${contador+1}"></i>`;
    }
}

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);

    if(Qualification == 0){
        sweetAlert(2, 'You have to set a Qualification to post the comment', false);
    }
    else{
        FORM.append('calificacionComentario',Qualification);
        FORM.append('idDetalleOrdenComentario',Detalle_Orden);
        FORM.append('estadoComentario',false);
        // Petición para registrar un comentario.
        const DATA = await fetchData(COMMENT_API, 'createRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
        } 
    }
});

const getStarsIds = () =>{
    STAR1 = document.getElementById('star1');
    STAR2 = document.getElementById('star2');
    STAR3 = document.getElementById('star3');
    STAR4 = document.getElementById('star4');
    STAR5 = document.getElementById('star5');
    STAR1.addEventListener("click", (event) => {
        fillStartsModal(1,'starsContainer');
        getStarsIds();
        Qualification = 1;
    });
    
    STAR2.addEventListener("click", (event) => {
        fillStartsModal(2,'starsContainer');
        getStarsIds();
        Qualification = 2;
    });
    STAR3.addEventListener("click", (event) => {
        fillStartsModal(3,'starsContainer');
        getStarsIds();
        Qualification = 3;
    });
    STAR4.addEventListener("click", (event) => {
        fillStartsModal(4,'starsContainer');
        getStarsIds();
        Qualification = 4;
    });
    STAR5.addEventListener("click", (event) => {
        fillStartsModal(5,'starsContainer');
        getStarsIds();
        Qualification = 5;
    });
}

BTN_COMMENT.addEventListener('click', async (event) => {

    const FORM = new FormData();
    FORM.append('idPrenda', ID_PRENDA);

    const DATA = await fetchData(USER_API,'checkBuy',FORM);

    if(DATA.status){
        DATA.dataset.forEach(item => {
            Detalle_Orden = item.id_detalle_orden;
        });
        fillStartsModal(0,'starsContainer');
        getStarsIds();
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Add a comment';
        DETALLE_COMENTARIO.textContent= '';
    }
    else{
        sweetAlert(2, DATA.error, false);
    }
});

BTN_UP.addEventListener('click', async (event) => {
     // Verifica si la cantidad seleccionada es menor que las existencias disponibles.
    if(CONTADOR < EXISTENCIAS){
        CONTADOR++;
        PRENDA_CANTIDAD.innerText = CONTADOR;
    }
    else{
        sweetAlert(2, 'There are no more products', false);
    }
});
// Evento para decrementar la cantidad de la prenda seleccionada.
BTN_DOWN.addEventListener('click', async (event) => {
    // Verifica si la cantidad seleccionada es mayor que 1.
    if(CONTADOR>1){
        CONTADOR--;
        PRENDA_CANTIDAD.innerText = CONTADOR;
    }
});
// Evento para añadir la prenda al carrito de compras.
BTN_ADD.addEventListener('click', async (event) => {
    // Crea un objeto FormData y añade los datos de la prenda seleccionad
    const FORM = new FormData();
    FORM.append('idPrenda',ID_PRENDA);

    const DATA1 = await fetchData(PRENDA_API, 'getPrice', FORM);

    FORM.append('cantidadPrenda',parseInt(PRENDA_CANTIDAD.innerText));
    FORM.append('fechaPrenda',new Date().toISOString().slice(0, 10));
    FORM.append('precioPrenda', DATA1.dataset.precio);

     // Petición para añadir la prenda al carrito de compras.   
    const DATA = await fetchData(ORDEN_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'carrito.html');
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
    } else {
        sweetAlert(3, DATA.error, true, 'login.html');
    }
});
// Función para cargar los datos de la prenda seleccionada.
const loadData = async () => {
    // Crea un objeto FormData y añade el ID de la prenda.
    const FORM = new FormData();
    FORM.append('idPrenda',ID_PRENDA);
     // Petición para obtener los datos de la prenda desde la API.
    const DATA = await fetchData(PRENDA_API,'readOne',FORM);
    // Se comprueba si la respuesta es satisfactoria.
    if(DATA.status){
        ROW = DATA.dataset;
        PRENDA_IMG.innerHTML = '';
        PRENDA_NOMBRE.innerHTML = '';
        PRENDA_DETALLE.innerHTML = '';
        PRENDA_CANTIDAD.innerHTML = '1';

        PRENDA_IMG.innerHTML += `<img src="${SERVER_URL}images/productos/${ROW.prenda_img}" class="card-img-top" alt="...">`;
        PRENDA_NOMBRE.textContent = ROW.nombre_prenda;
        PRENDA_DETALLE.textContent = ROW.detalle_prenda;
        PRENDA_PRECIO.textContent = "$"+ROW.precio;
        EXISTENCIAS = ROW.cantidad;
    }   
}

const loadComments = async () => {
    // Crea un objeto FormData y añade el ID de la prenda.
    const FORM = new FormData();
    FORM.append('idPrenda',ID_PRENDA);
     // Petición para obtener los datos de la prenda desde la API.
    const DATA = await fetchData(PRENDA_API,'getComments',FORM);
    // Se comprueba si la respuesta es satisfactoria.
    if(DATA.status){
        let cont = 1;
        COMENTARIOS.innerHTML = '';
        DATA.dataset.forEach(row => {
            COMENTARIOS.innerHTML +=`

                <div class="row mt-5">
              <div class="row">
                <div class="comment text-start">
                  <div class="d-flex align-items-center">
                    <img src="../..//resources/img/woman1.png" alt="Imagen" class="user-img me-3">
                    <h3>${row.nombre_cliente+" "+row.apellido_cliente}</h3>
                  </div>
                  <div class="stars" id="starsContainer${cont}">
                  </div>
                  <p class="pt-2 mt-2">${row.detalle_comentario}</p>
                </div>
              </div>
            </div>

            `;
            fillStarts(row.calificacion_prenda,'starsContainer'+cont);
            cont++;
        });
    }   
}