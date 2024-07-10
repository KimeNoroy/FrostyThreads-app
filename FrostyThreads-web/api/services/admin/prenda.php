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
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $prenda->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$prenda->setIdCategoria($_POST['idCategoriaPrenda']) or
                    !$prenda->setIdTalla($_POST['idTallaPrenda']) or
                    !$prenda->setPrecio($_POST['precioPrenda']) or
                    !$prenda->setNombre($_POST['nombrePrenda']) or
                    !$prenda->setCantidad($_POST['cantidadPrenda']) or
                    !$prenda->setDetalle($_POST['detallePrenda']) or
                    !$prenda->setIdMarca($_POST['idMarcaPrenda']) or
                    !$prenda->setIdDescuento($_POST['idDescuentoPrenda']) or
                    !$prenda->setEstado(isset($_POST['estadoPrenda']) ? 1 : 0) or
                    !$prenda->setImg($_FILES['imagenPrenda'])
                ) {
                    
                    $result['error'] = $prenda->getDataError();
                } elseif ($prenda->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cloth created succesfuly';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenPrenda'], $prenda::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'There was a problem while creating the cloth';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $prenda->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No clothes found';
                }
                break;
            case 'readOne':
                if (!$prenda->setId($_POST['idPrenda'])) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($result['dataset'] = $prenda->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cloth not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$prenda->setId($_POST['idPrenda']) or
                    !$prenda->setIdCategoria($_POST['idCategoriaPrenda']) or
                    !$prenda->setIdTalla($_POST['idTallaPrenda']) or
                    !$prenda->setPrecio($_POST['precioPrenda']) or
                    !$prenda->setNombre($_POST['nombrePrenda']) or
                    !$prenda->setCantidad($_POST['cantidadPrenda']) or
                    !$prenda->setDetalle($_POST['detallePrenda']) or
                    !$prenda->setIdMarca($_POST['idMarcaPrenda']) or
                    !$prenda->setIdDescuento($_POST['idDescuentoPrenda']) or
                    !$prenda->setEstado(isset($_POST['estadoPrenda']) ? 1 : 0) or
                    !$prenda->setImg($_FILES['imagenPrenda'], $prenda->getFilename())
                ) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($prenda->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cloth updated succesfuly';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenPrenda'], $prenda::RUTA_IMAGEN, $prenda->getFilename());
                } else {
                    $result['error'] = 'There was a problem while updating the cloth';
                }
                break;
            case 'deleteRow':
                if (
                    !$prenda->setId($_POST['idPrenda']) or
                    !$prenda->setFilename()
                ) {
                    $result['error'] = $prenda->getDataError();
                } elseif ($prenda->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cloth deleted succesfuly';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($prenda::RUTA_IMAGEN, $prenda->getFilename());
                } else {
                    $result['error'] = 'There was a problem while deleting the cloth';
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