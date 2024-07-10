// Constante para completar la ruta de la API.
const MARCA_API = 'services/public/marca.php';
// Constante para establecer el contenedor de categorías.
const MARCAS = document.getElementById('marcas');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    // Petición para obtener las categorías disponibles.
    const DATA = await fetchData(MARCA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de categorías.
        MARCAS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se establece la página web de destino con los parámetros.
            let url = `products.html?id=${row.id_marca}&nombre=${row.marca}&type=${2}`;
            // Se crean y concatenan las tarjetas con los datos de cada categoría.
            MARCAS.innerHTML += `
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/categorias/${row.marca_img}" class="card-img-top" alt="${row.marca}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${row.marca}</h5>
                            <a href="${url}" class="btn btn-primary">See products</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
    }
});