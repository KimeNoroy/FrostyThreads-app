// Constante para completar la ruta de la API.
const PRENDA_API = 'services/admin/prenda.php';
const DESCUENTO_API = 'services/admin/descuento.php';
const CATEGORIA_API = 'services/admin/categoria.php';
const TALLA_API = 'services/admin/talla.php';
const MARCA_API = 'services/admin/marca.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRENDA = document.getElementById('idPrenda'),
    NOMBRE_MARCA = document.getElementById('nombrePrenda'),
    CATEGORIA_PRENDA = document.getElementById('idCategoriaPrenda'),
    PRECIO_PRENDA = document.getElementById('precioPrenda'),
    TALLA_PRENDA = document.getElementById('idTallaPrenda'),
    DETALLE_PRENDA = document.getElementById('detallePrenda'),
    MARCA_PRENDA = document.getElementById('idMarcaPrenda'),
    DESCUENTO_PRENDA =document.getElementById('idDescuentoPrenda'),
    CANTIDAD_PRENDA = document.getElementById('cantidadPrenda'),
    ESTADO_PRENDA = document.getElementById('estadoPrenda');


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = ID_PRENDA.value ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRENDA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRENDA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se establece un icono para el estado del producto.
            (row.estado_prenda == 1) ? icon = 'bi bi-eye-fill' : icon = 'bi bi-eye-slash-fill';
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/categorias/${row.prenda_img}" height="50"></td>
                    <td>${row.nombre_prenda}</td>
                    <td>${row.categoria}</td>
                    <td>${row.precio}</td>
                    <td>${row.talla}</td>
                    <td>${row.detalle_prenda}</td>
                    <td>${row.marca}</td>
                    <td>${row.descuento}</td>
                    <td>${row.cantidad}</td>
                    <td><i class="${icon}"></i></td>

                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_prenda})">
                        <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_prenda})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        <button type="button" class="btn btn-secundary" onclick="openComment(${row.id_prenda})">
                            <i class="bi bi-info-circle-fill"></i>
                        </button>
                    </td>
                </tr>
                
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

/*

Función para preparar el formulario al momento de insertar un registro.
Parámetros: ninguno.
Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Create clothes';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(DESCUENTO_API, 'readAll', 'idDescuentoPrenda');
    fillSelect(CATEGORIA_API, 'readAll', 'idCategoriaPrenda');
    fillSelect(TALLA_API, 'readAll', 'idTallaPrenda');
    fillSelect(MARCA_API, 'readAll', 'idMarcaPrenda');
}
/*

Función asíncrona para preparar el formulario al momento de actualizar un registro.
Parámetros: id (identificador del registro seleccionado).
Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idPrenda', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRENDA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Update clothes';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRENDA.value = ROW.id_prenda;
        NOMBRE_MARCA.value = ROW.nombre_prenda;
        PRECIO_PRENDA.value = ROW.precio;
        DETALLE_PRENDA.value = ROW.detalle_prenda;
        ESTADO_PRENDA.checked = (ROW.estado_prenda == 1? true: false);
        CANTIDAD_PRENDA.value = ROW.cantidad;
        fillSelect(MARCA_API, 'readAll', 'idMarcaPrenda',ROW.id_marca);
        fillSelect(DESCUENTO_API, 'readAll', 'idDescuentoPrenda',ROW.id_descuento);
        fillSelect(TALLA_API, 'readAll', 'idTallaPrenda',ROW.id_talla);
        fillSelect(CATEGORIA_API, 'readAll', 'idCategoriaPrenda',ROW.id_categoria);

    } else {
        sweetAlert(2, DATA.error, false);
    }
}
/*

Función asíncrona para eliminar un registro.
Parámetros: id (identificador del registro seleccionado).
Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la prenda permanentemente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idPrenda', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRENDA_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openComment = async (id) => {
    const RESPONSE = await confirmAction('¿Quieres ver el comentario?');
    console.log(RESPONSE); // Verifica si RESPONSE es true o false
    if (RESPONSE) {
        // Redirigir a la página 'comentario.html' con el ID de la prenda como parámetro de la URL
        window.location.href = `comentario.html?id=${id}`;
    }
}