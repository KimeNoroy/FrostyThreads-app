<?php
// Se incluye la clase del modelo.
require_once('../../models/data/descuento_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $descuento = new DescuentoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$descuento->setDescuento($_POST['cantidadDescuento']) 
                ) {
                    $result['error'] = $descuento->getDataError();
                } elseif ($descuento->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Discount created succesfuly';
                } else {
                    $result['error'] = 'There was a problem while creating the discount';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $descuento->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$descuento->setId($_POST['idDescuento'])) {
                    $result['error'] = $descuento->getDataError();
                } elseif ($result['dataset'] = $descuento->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Discount not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$descuento->setId($_POST['idDescuento']) or
                    !$descuento->setDescuento($_POST['cantidadDescuento'])
                ) {
                    $result['error'] = $descuento->getDataError();
                } elseif ($descuento->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Discount updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the discount';
                }
                break;
            case 'deleteRow':
                if (
                    !$descuento->setId($_POST['idDescuento']) 
                ) {
                    $result['error'] = $descuento->getDataError();
                } elseif ($descuento->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Discount deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the discount';
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