// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/prenda.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
const PRODUCTOS = document.getElementById('prenda');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('id',PARAMS.get('id'));
    let action = null;

    let type = PARAMS.get('type');
    MAIN_TITLE.textContent = `${PARAMS.get('nombre')}`;
    switch (type){
        case "1":
            action = 'readAllByCategorie';
            break;
        case "2":
            action = 'readAllByBrand';
            break;
        case "3":
            action = 'readAllByDiscount';
            break;
        case "4":
            action = 'readAll';
            break;
        default:
            console.log("Hubo un error");
            break;
    }

    FORM.append('idCategoria', PARAMS.get('id'));
    // Petición para solicitar los productos de la categoría seleccionada.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/productos/${row.prenda_img}" class="card-img-top" alt="${row.nombre_prenda}">
                        <div class="card-body">
                            <h5 class="card-title">${row.nombre_prenda}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Precio (US$) ${row.precio}</li>
                            <li class="list-group-item">Existencias ${row.cantidad}</li>
                        </ul>
                        <div class="card-body text-center">
                            <a class="btn btn-primary" onclick="seeDetail(${row.id_prenda})">See detail</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
    }
});

const seeDetail = (value) => {
    localStorage.setItem('idPrenda',value);
    window.location.href = 'vista_previa.html';
}