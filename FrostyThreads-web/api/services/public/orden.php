<?php
// Se incluye la clase del modelo.
require_once('../../models/data/orden_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $orden = new OrdenData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $orden->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            // Acción para agregar un producto al carrito de compras.
            case 'createDetail':
                $_POST = Validator::validateForm($_POST);
                if(!$orden->setFecha($_POST['fechaPrenda']) or
                   !$orden->setEstado('pendant')){
                    $result['error'] = $orden->getDataError();
                }
                else if (!$orden->startOrder()) {
                    $result['error'] = 'Ocurrió un problema al iniciar el pedido';
                } elseif (
                    !$orden->setIdPrenda($_POST['idPrenda']) or
                    !$orden->setCantidad($_POST['cantidadPrenda']) 
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->createDetail($_POST['precioPrenda'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al agregar el producto';
                }
                break;
            case 'getTotal':
                if ($result['dataset'] = $orden->getTotal()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen ordenes registradas';
                }
                break;
            case 'getTotalByOrder':
                if (!$orden->setId($_POST['idOrden'])) {
                    $result['error'] = 'There is no cloths in the shopping cart';
                } elseif ($result['dataset'] = $orden->getTotalByOrder()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen ordenes registradas';
                }
                break;
            case 'readActiveOrders':
                if (!$orden->getOrder()) {
                    $result['error'] = 'There is no cloths in the shopping cart';
                } elseif ($result['dataset'] = $orden->readDetail()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No results';
                }
                break;
    
            case 'readAllByCostumer':
                if (
                    !$orden->setIdCliente($_SESSION['idCliente'])
                ) {
                    $result['error'] = $orden->getDataError();
                }
                else if ($result['dataset'] = $orden->readAllByCustomer()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen ordenes registradas';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$orden->setId($_POST['idOrden']) or
                    !$orden->setIdDomicilio($_POST['idDomicilio']) or
                    !$orden->setEstado($_POST['estadoOrden']) or
                    !$orden->setFecha($_POST['fechaOrden'])
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'orden modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la orden';
                }
                break;
            case 'finishOrder':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$orden->setId($_SESSION['idOrden']) or
                    !$orden->setDireccion($_POST['idDireccion']) or
                    !$orden->setEstado('received')
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->finishOrder()) {
                    $_SESSION['idOrden'] = null;
                    $result['status'] = 1;
                    $result['message'] = 'orden modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la orden';
                }
                break;
            case 'deleteRow':
                if (
                    !$orden->setId($_POST['idOrden']) 
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'orden eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la orden';
                }
                break;
            case 'deleteActualOrder':
                if (
                    !$orden->setId($_SESSION['idOrden']) 
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'orden eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la orden';
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