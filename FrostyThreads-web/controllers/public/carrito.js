// Constante para la URL del servicio donde se gestionan las órdenes de compra.
const ORDER_URL = 'services/public/orden.php';
const DETALLE_API = 'services/public/detalle_orden.php'

const CART = document.getElementById('carrito');
// Constante para obtener el elemento del DOM que muestra el total de la compra.
const TOTAL = document.getElementById('total');
const SAVE_MODAL =  new bootstrap.Modal('#saveModal');

const MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm');

const BOTON_CONFIRMAR = document.getElementById('confirmar');


// Evento que se ejecuta cuando el documento ha cargado completamente.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    getTotal();

    fillCart();
});

const getTotal = async () => {
    const DATA = await fetchData(ORDER_URL, 'getTotal');

    DATA.dataset.forEach(async item =>{
        if(item.total == null) {
            TOTAL.innerText = "Total: $0";
            await fetchData(ORDER_URL, 'DeleteActualOrder');
            
        }
        else TOTAL.innerText = "Total: $"+item.total;
    });
}


const fillCart = async () => {
    CART.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ORDER_URL, 'readActiveOrders');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CART.innerHTML += `
                <div class="row d-flex justify-content-start">
                    <div class="col-1"><img src="${SERVER_URL}images/categorias/${row.prenda_img}" alt="${row.nombre_prenda}" width = 100px height=auto></div>
                    
                    <div class="col-1 p-4"><p>${row.nombre_prenda}</p></div>
                    <div class="col-1 p-4">
                        <div class="col-1"><button class="btn-flecha" onclick="addUp(${row.id_detalle_orden},${row.cantidad},${row.cantidad_prenda},${row.precio_prenda})">↑</button></div>
                        <div class="col-1"><span class="cantidad" id="cantidad${row.id_detalle_orden}">${row.cantidad_prenda}</span></div>
                        <div class="col-1"><button class="btn-flecha" onclick="addDown(${row.id_detalle_orden},${row.cantidad},${row.cantidad_prenda},${row.precio_prenda})">↓</button></div>
                    </div>
                    <div class="col-9 d-flex justify-content-end">
                        <span class="span-precio px-4" id="precio${row.id_detalle_orden}">$${row.cantidad_prenda*row.precio_prenda}</span>
                        <div height="50px" width="auto"><button class="btn-basura" onclick="deleteDetail(${row.id_detalle_orden})">🗑️</button></div>
                    </div>
                </div>
            `;
        });
    } else {
           // Muestra una alerta con el mensaje de error.
        sweetAlert(4, DATA.error, true);
    }
}

const addUp = async (id, top, actual, price) =>{
    if(top-1==-1){
        sweetAlert(2, 'There are no more products', false);
    }
    else{
        const FORM = new FormData();
        FORM.append('idDetalleOrden',id);
        const DATA = await fetchData(DETALLE_API, 'addOne', FORM);
        if(DATA.status){
            document.getElementById('cantidad'+id).innerText = actual+1;
            document.getElementById('precio'+id).innerText = "$"+price*(actual+1);
            getTotal();
            fillCart();
        }
    }
}

const addDown = async (id, top, actual, price) =>{
    if(actual-1 > 0){
        const FORM = new FormData();
        FORM.append('idDetalleOrden',id);
        const DATA = await fetchData(DETALLE_API, 'addMinus', FORM);
        if(DATA.status){
            document.getElementById('cantidad'+id).innerText = actual-1;
            document.getElementById('precio'+id).innerText = "$"+price*(actual-1);
            getTotal();
            fillCart();
        }
    }
}

const deleteDetail = async (id) =>{
     // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
     const RESPONSE = await confirmAction('¿You want to remove the producto from your shopping cart?');
     // Se verifica la respuesta del mensaje.
     if (RESPONSE) {
         // Se define una constante tipo objeto con los datos del registro seleccionado.
         const FORM = new FormData();
         FORM.append('idDetalleOrden', id);
         // Petición para eliminar el registro seleccionado.
         const DATA = await fetchData(DETALLE_API, 'deleteRow', FORM);
         // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
         if (DATA.status) {
             // Se muestra un mensaje de éxito.
             await sweetAlert(1, DATA.message, true);
             // Se carga nuevamente la tabla para visualizar los cambios.
             getTotal();
             fillCart();
         } else{
             sweetAlert(2, DATA.error, false);
         }
     }
}

BOTON_CONFIRMAR.addEventListener('click', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = '¿Where to send your order?';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(USER_API, 'getAddresses', 'idDireccion',undefined,1,1);

});

// Método del evento para cuando se envía el formulario de cambiar cantidad de producto.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para actualizar la cantidad de producto.
    const DATA = await fetchData(ORDER_URL, 'finishOrder', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se actualiza la tabla para visualizar los cambios.
        getTotal();
        fillCart();
        // Se cierra la caja de diálogo del formulario.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
