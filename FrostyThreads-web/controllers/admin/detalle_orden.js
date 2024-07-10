// Constante para completar la ruta de la API.
const DETALLE_ORDEN_API = 'services/admin/detalle_orden.php';
const PRENDA_API = 'services/admin/prenda.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
const ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal');
const MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm');
const ID_DETALLE_ORDEN = document.getElementById('idDetalleOrden');
const ID_ORDEN = document.getElementById('idOrdenDetalleOrden');
const FECHA = document.getElementById('fechaDetalleOrden');
const QUANTITY = document.getElementById('cantidadDetalleOrden');
const PRECIO_PRENDA = document.getElementById('precioOrden');

let aux = null;

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    const urlParams = new URLSearchParams(window.location.search);
    aux = urlParams.get('id');

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

function obtenerFechaActual() {
    const hoy = new Date();

    // Obtener el mes, el día y el año
    let mes = hoy.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
    let dia = hoy.getDate();
    const anio = hoy.getFullYear();

    // Asegurarnos de que el mes y el día tengan dos dígitos
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (dia < 10) {
        dia = '0' + dia;
    }

    // Formatear la fecha como mm/dd/yyyy
    const fechaFormateada = `${mes}-${dia}-${anio}`;
    return fechaFormateada;
}

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = ID_DETALLE_ORDEN.value ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    
    const urlParams = new URLSearchParams(window.location.search);
    const FORM = new FormData(SAVE_FORM);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DETALLE_ORDEN_API, action, FORM);
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
    const action = form ? 'searchRows' : 'readAllByOrder';
    // Petición para obtener los registros disponibles.
    if(form == null){
        form = new FormData();
        form.append('idOrden', aux);
    }

    const DATA = await fetchData(DETALLE_ORDEN_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.id_prenda}</td>
                    <td>${row.cantidad_prenda}</td>
                    <td>${row.cantidad_prenda*row.precio}</td>
                    <td>${row.precio_prenda}</td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_detalle_orden})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_detalle_orden})">
                            <i class="bi bi-trash-fill"></i>
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
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Add Order Detail';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(PRENDA_API, 'readAll', 'idPrendaDetalleOrden');
    ID_ORDEN.value = aux;
    FECHA.value = obtenerFechaActual();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDetalleOrden', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DETALLE_ORDEN_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Update Order Detail';
         // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DETALLE_ORDEN.value = ROW.id_detalle_orden;
        PRECIO_PRENDA.value = ROW.precio_prenda;
        fillSelect(PRENDA_API, 'readAll', 'idPrendaDetalleOrden',ROW.id_prenda);
        QUANTITY.value = ROW.cantidad_prenda;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Call the function to display a confirmation message, capturing the response in a constant.
    const RESPONSE = await confirmAction('Do you want to delete this order detail permanently?');
    // Check the response to the message.
    if (RESPONSE) {
        // Define an object constant with the data of the selected record.
        const FORM = new FormData();
        FORM.append('idDetalleOrden', id);
        // Request to delete the selected record.
        const DATA = await fetchData(DETALLE_ORDEN_API, 'deleteRow', FORM);
        // Check if the response is successful, otherwise display an exception message.
        if (DATA.status) {
            // Display a success message.
            await sweetAlert(1, DATA.message, true);
            // Reload the table to view the changes.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}