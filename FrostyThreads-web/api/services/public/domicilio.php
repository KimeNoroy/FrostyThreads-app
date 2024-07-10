<?php
// Se incluye la clase del modelo.
require_once('../../models/data/domicilio_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $domicilio = new DomicilioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente']) || true) {
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $domicilio->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$domicilio->setIdProvincia($_POST['provinciaDomicilio']) or
                    !$domicilio->setDireccion($_POST['direccionDomicilio']) or
                    !$domicilio->setIdCliente($_SESSION['idCliente'])
                ) {
                    $result['error'] = $domicilio->getDataError();
                } elseif ($domicilio->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'domicilio creado correctamente';
                } else {
                    $result['error'] = 'ocurrio un problema al al crear el domicilio';
                }
                break;
            case 'readAllByCustomer':
                if ($result['dataset'] = $domicilio->readAllByCostumer($_SESSION['idCliente'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen domicilios registrados';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$domicilio->setId($_POST['idDomicilio']) or
                    !$domicilio->setIdProvincia($_POST['provinciaDomicilio']) or
                    !$domicilio->setDireccion($_POST['direccionDomicilio']) or
                    !$domicilio->setIdCliente($_SESSION['idCliente'])
                ) {
                    $result['error'] = $domicilio->getDataError();
                } elseif ($domicilio->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'domicilio modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el domicilio';
                }
                break;
            case 'readOne':
                if (!$domicilio->setId($_POST['idDomicilio'])) {
                    $result['error'] = $domicilio->getDataError();
                } elseif ($result['dataset'] = $domicilio->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Address not found';
                }
                break;
            case 'deleteRow':
                if (
                    !$domicilio->setId($_POST['idDomicilio']) 
                ) {
                    $result['error'] = $domicilio->getDataError();
                } elseif ($domicilio->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'domicilio eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el domicilio';
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