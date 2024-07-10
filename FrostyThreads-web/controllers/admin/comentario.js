// Constante para completar la ruta de la API.
const COMENTARIO_API = 'services/admin/comentario.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('data'),
    ROWS_FOUND = document.getElementById('rowsFound'),
    ID_PRENDA = null;
// Método del evento para cuando el documento ha cargado.

let aux = null; 


document.addEventListener('DOMContentLoaded', (id_prenda) => {
    //Seteamos el ID de la prenda
    
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


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    
    let action = 'readProductsComments'; // Por defecto, lee todos los comentarios
    
    // Crear un FormData con el ID de la prenda
    const formData = new FormData();
    formData.append('idProducto', aux);
    
    const DATA = await fetchData(COMENTARIO_API, action, formData); // Usar formData en lugar de FORM_ID_PRODUCTO
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.detalle_comentario}</td>
                    <td>${row.calificacion_prenda}</td>
                    <td>${row.estado_comentario == 0? 'Disabled':'Enabled'}</td>   
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_comentario})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openUpdate = async (id) => {
    const RESPONSE = await confirmAction('¿You want to change the state?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idComentario', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(COMENTARIO_API, 'changeState', FORM);
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