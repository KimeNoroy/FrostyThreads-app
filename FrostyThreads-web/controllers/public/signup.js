
// Constante para establecer el formulario de registrar cliente.
const SIGNUP_FORM = document.getElementById('signupForm');

document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para cargar y mostrar el encabezado y el pie del documento.
   loadTemplate();
});

// Método del evento para cuando se envía el formulario de registrar cliente.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'login.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

