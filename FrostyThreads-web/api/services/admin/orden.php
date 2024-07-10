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
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $orden->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$orden->setIdCliente($_POST['idCliente']) or
                    !$orden->setEstado($_POST['estadoOrden']) or
                    !$orden->setDireccion($_POST['direccionOrden']) or
                    !$orden->setFecha($_POST['fechaOrden'])
                    )
                 {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Order created succesfuly';
                } else {
                    $result['error'] = 'There was a problem while creating the order';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $orden->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readAllByCustomer':
                if(!$orden->setIdCliente($_POST['idCliente'])){
                    $result['error'] = $orden->getDataError();
                }
                else if ($result['dataset'] = $orden->readAllByCustomer()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$orden->setId($_POST['idOrden'])) {
                    $result['error'] = $orden->getDataError();
                } elseif ($result['dataset'] = $orden->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Order not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$orden->setId($_POST['idOrden']) or
                    !$orden->setIdCliente($_POST['idCliente']) or
                    !$orden->setEstado($_POST['estadoOrden'] or
                    !$orden->setFecha($_POST['fechaOrden']) or
                    !$orden->setDireccion($_POST['direccionOrden']))
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Order updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the order';
                }
                break;
            case 'deleteRow':
                if (
                    !$orden->setId($_POST['idOrden']) 
                ) {
                    $result['error'] = $orden->getDataError();
                } elseif ($orden->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Order deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the order';
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