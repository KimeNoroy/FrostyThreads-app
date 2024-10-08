<?php
// Se incluye la clase del modelo.
require_once('../../models/data/provincia_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $provincia = new ProvinciaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $provincia->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$provincia->setProvincia($_POST['nombreProvincia'])
                ) {
                    $result['error'] = $provincia->getDataError();
                } elseif ($provincia->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'provincia creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la provincia';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $provincia->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readAllIds':
                if ($result['dataset'] = $provincia->readAllIds()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen provincias registrados';
                }
                break;
            case 'readOne':
                if (!$provincia->setId($_POST['idProvincia'])) {
                    $result['error'] = $provincia->getDataError();
                } elseif ($result['dataset'] = $provincia->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'provincia inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$provincia->setId($_POST['idProvincia']) or
                    !$provincia->setProvincia($_POST['nombreProvincia'])
                ) {
                    $result['error'] = $provincia->getDataError();
                } elseif ($provincia->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'provincia modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la provincia';
                }
                break;
            case 'deleteRow':
                if (
                    !$provincia->setId($_POST['idProvincia']) 
                ) {
                    $result['error'] = $provincia->getDataError();
                } elseif ($provincia->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'provincia eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la provincia';
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