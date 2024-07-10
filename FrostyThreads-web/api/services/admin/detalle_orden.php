<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detalle_orden_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalleOrden = new DetalleOrdenData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $detalleOrden->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setIdPrenda($_POST['idPrendaDetalleOrden']) or
                    !$detalleOrden->setIdOrden($_POST['idOrdenDetalleOrden']) or
                    !$detalleOrden->setCantidad($_POST['cantidadDetalleOrden']) or
                    !$detalleOrden->setFecha($_POST['fechaDetalleOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detail created succesfuly';
                } else {
                    $result['error'] = 'There was a problem while creating the detail';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $detalleOrden->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readAllByOrder':
                if (!$detalleOrden->setIdOrden($_POST['idOrden'])) {
                    $result['error'] = $detalleOrden->getDataError();
                }
                else if ($result['dataset'] = $detalleOrden->readAllByOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$detalleOrden->setId($_POST['idDetalleOrden'])) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($result['dataset'] = $detalleOrden->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detail not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden']) or
                    !$detalleOrden->setIdPrenda($_POST['idPrendaDetalleOrden']) or
                    !$detalleOrden->setIdOrden($_POST['idOrdenDetalleOrden']) or
                    !$detalleOrden->setCantidad($_POST['cantidadDetalleOrden']) or
                    !$detalleOrden->setFecha($_POST['fechaDetalleOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detail updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the detail';
                }
                break;
            case 'deleteRow':
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden']) 
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detail deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the detail';
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