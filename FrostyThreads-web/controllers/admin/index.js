//declaracion de variables constantes

const EMAIL = document.getElementById("emailTxt");
const PASS = document.getElementById("passwordTxt");

const LOGINBTN = document.getElementById("btnLogin");

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
     // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'land_page.html';
    } 
});



// Método del evento para cuando se envía el formulario de inicio de sesión.
LOGINBTN.addEventListener('click', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData();

    FORM.append("email", EMAIL.value);
    FORM.append("clave", PASS.value);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'land_page.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});