<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $cliente->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setEmail($_POST['emailCliente']) or
                    !$cliente->setClave($_POST['claveCliente']) or
                    !$cliente->setEstado(isset($_POST['estadoCliente']) ? 1 : 0)
                ) {
                    $result['error'] = $cliente->getDataError();
                    
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Client created succesfuly';
                } else {
                    print("here");
                    $result['error'] = 'There was a problem while creating the client';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $cliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readAllIds':
                if ($result['dataset'] = $cliente->readAllIds()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$cliente->setId($_POST['idCliente'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($result['dataset'] = $cliente->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Client not found';
                }
                break;
                case 'changePassword':
                    $_POST = Validator::validateForm($_POST);
                    if (!$cliente->checkPassword($_POST['claveActual'])) {
                        $result['error'] = 'Wrong password';
                    } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                        $result['error'] = 'The password fields doesnt match';
                    } elseif (!$cliente->setClave($_POST['claveNueva'])) {
                        $result['error'] = $administrador->getDataError();
                    } elseif ($cliente->changePassword()) {
                        $result['status'] = 1;
                        $result['message'] = 'Password changed succesfuly';
                    } else {
                        $result['error'] = 'There was a problem while changing the password';
                    }
                    break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setId($_POST['idCliente']) or
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setEmail($_POST['emailCliente']) or
                    !$cliente->setEstado(isset($_POST['estadoCliente']) ? 1 : 0)
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Client updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the client';
                }
                break;
            case 'deleteRow':
                if (
                    !$cliente->setId($_POST['idCliente']) 
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Client deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the client';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}