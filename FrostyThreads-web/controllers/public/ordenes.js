// Constante para completar la ruta de la API.
const ORDEN_API = 'services/public/orden.php';
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async () => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    action = 'readAllByCostumer';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ORDEN_API, action);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.id_orden}</td>
                    <td>${row.direccion_orden}</td>
                    <td>${row.estado_orden}</td>
                    <td>${row.fecha_orden}</td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openDetail = async (id) => {
    const RESPONSE = await confirmAction('¿Do you want to see the details?');
    if (RESPONSE) {
        // Redirigir a la página 'comentario.html' con el ID de la prenda como parámetro de la URL
        window.location.href = `detalle_orden.html?id=${id}`;
    }
}