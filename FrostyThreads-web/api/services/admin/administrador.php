<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administrador_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrador = new AdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setNombre($_POST['nombreAdministrador']) or
                    !$administrador->setApellido($_POST['apellidoAdministrador']) or
                    !$administrador->setEmail($_POST['emailAdministrador']) or
                    !$administrador->setClave($_POST['claveAdministrador']) or
                    !$administrador->setIdTipoAdministrador($_POST['idTipoAdministrador'])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator created succesfuly';
                } else {
                    $result['error'] = 'There was a problem while creating the administrator';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$administrador->setId($_POST['idAdministrador'])) {
                    $result['error'] = 'Administrator not found';
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Administrator not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setId($_POST['idAdministrador']) or
                    !$administrador->setNombre($_POST['nombreAdministrador']) or
                    !$administrador->setApellido($_POST['apellidoAdministrador']) or
                    !$administrador->setEmail($_POST['emailAdministrador']) or
                    !$administrador->setIdTipoAdministrador($_POST['idTipoAdministrador'])
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the administrator';
                }
                break;
            case 'deleteRow':
                if ($_POST['idAdministrador'] == $_SESSION['idAdministrador']) {
                    $result['error'] = 'You cant delete yourself';
                } elseif (!$administrador->setId($_POST['idAdministrador'])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrator deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the administrator';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Log out succesfuly';
                } else {
                    $result['error'] = 'There was a problem while loging out';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $administrador->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'There was a problem while reading the profile';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setNombre($_POST['nombreAdministrador']) or
                    !$administrador->setApellido($_POST['apellidoAdministrador']) or
                    !$administrador->setEmail($_POST['emailAdministrador']))
                 {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Profile updated succesfuly';
                    $_SESSION['emailAdministrador'] = $_POST['emailAdministrador'];
                } else {
                    $result['error'] = 'There was a problem while updating the profile';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$administrador->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Actual password is wrong';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Password confirmation is wrong';
                } elseif (!$administrador->setClave($_POST['claveNueva'])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Password updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while changing the password';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['emailAdministrador'])) {
                    $result['status'] = 1;
                    $result['email'] = $_SESSION['emailAdministrador'];
                } else {
                    $result['error'] = 'Email de administrador indefinido';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST); 
                if ($administrador->checkUser($_POST['email'], $_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Log in successed';
                } else {
                    $result['error'] = 'Invalid credentials';
                    $result['status'] = 0;
                }
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}