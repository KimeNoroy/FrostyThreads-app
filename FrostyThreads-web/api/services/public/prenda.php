<?php
// Se incluye la clase del modelo.
require_once('../../models/data/prenda_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $prenda = new PrendaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readProductosPrenda':
                if (!$prenda->setIdCategoria($_POST['idCategoria'])) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($result['dataset'] = $prenda->readProductosPrenda()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen productos para mostrar';
                }
                break;
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $prenda->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $prenda->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen prendas registradas';
                }
                break;
            case 'readAllByCategorie':
                if (!$prenda->setIdCategoria($_POST['id'])) {
                    $result['error'] = $prenda->getDataError();
                }
                else if ($result['dataset'] = $prenda->readAllByCategorie()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen prendas registradas';
                }
                break;
            case 'readAllByBrand':
                if (!$prenda->setIdMarca($_POST['id'])) {
                    $result['error'] = $prenda->getDataError();
                }
                else if ($result['dataset'] = $prenda->readAllByBrand()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen prendas registradas';
                }
                break;
            case 'readAllByDiscount':
                if ($result['dataset'] = $prenda->readAllByDiscount()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen prendas registradas';
                }
                break;
            case 'readOne':
                if (!$prenda->setId($_POST['idPrenda'])) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($result['dataset'] = $prenda->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'prenda inexistente';
                }
                break;
            case 'getPrice':
                if (!$prenda->setId($_POST['idPrenda'])) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($result['dataset'] = $prenda->getPrice()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'prenda inexistente';
                }
                break;
            case 'getComments':
                if (!$prenda->setId($_POST['idPrenda'])) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($result['dataset'] = $prenda->getComments()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'error';
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
    print(json_encode('Recurso no disponible'));
}