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
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setIdPrenda($_POST['idPrendaDetalleOrden']) or
                    !$detalleOrden->setIdOrden($_POST['idOrdenDetalleOrden']) or
                    !$detalleOrden->setCantidad($_POST['cantidadDetalleOrden']) or
                    !$detalleOrden->setPrecio($_POST['precioOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'detalle orden creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el detalle orden';
                }
                break;
            case 'readAllByOrder':
                if ($result['dataset'] = $detalleOrden->readAllByOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen detalle ordenes registrados';
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
            case 'addOne':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->addOne()) {
                    $result['status'] = 1;
                    $result['message'] = 'detalle orden modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el detalle orden';
                }
                break;
            case 'addMinus':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->addMinus()) {
                    $result['status'] = 1;
                    $result['message'] = 'detalle orden modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el detalle orden';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden']) or
                    !$detalleOrden->setIdPrenda($_POST['idPrendaDetalleOrden']) or
                    !$detalleOrden->setIdOrden($_POST['idOrdenDetalleOrden']) or
                    !$detalleOrden->setCantidad($_POST['cantidadDetalleOrden']) or
                    !$detalleOrden->setPrecio($_POST['precioOrden'])
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'detalle orden modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el detalle orden';
                }
                break;
            case 'deleteRow':
                if (
                    !$detalleOrden->setId($_POST['idDetalleOrden']) 
                ) {
                    $result['error'] = $detalleOrden->getDataError();
                } elseif ($detalleOrden->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'detalle orden eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el detalle orden';
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