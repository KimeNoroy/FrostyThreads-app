<?php
// Se incluye la clase del modelo.
require_once('../../models/data/comentario_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $comentario = new ComentarioData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador']) || true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$comentario->setDetalle($_POST['detalleComentario']) or
                    !$comentario->setCalificacion($_POST['calificacionComentario']) or
                    !$comentario->setEstado($_POST['estadoComentario']) or
                    !$comentario->setIdDetalleOrden($_POST['idDetalleOrdenComentario'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comment created succesfuly';
                } else {
                    $result['error'] = 'There was a problem while creating the comment';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $comentario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                } else {
                    $result['error'] = 'No results';
                }
                break;
            case 'readOne':
                if (!$comentario->setId($_POST['idComentario'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($result['dataset'] = $comentario->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comment not found';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$comentario->setId($_POST['idComentario']) or
                    !$comentario->setDetalle($_POST['detalleComentario']) or
                    !$comentario->setCalificacion($_POST['calificacionComentario']) or
                    !$comentario->setEstado($_POST['estadoComentario']) or
                    !$comentario->setIdDetalleOrden($_POST['idDetalleOrdenComentario'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comment updated succesfuly';
                } else {
                    $result['error'] = 'There was a problem while updating the comment';
                }
                break;
            case 'deleteRow':
                if (
                    !$comentario->setId($_POST['idComentario'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comment deleted succesfuly';
                } else {
                    $result['error'] = 'There was a problem while deleting the comment';
                }
                break;

            case 'readProductsComments':
                if (!$comentario->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($result['dataset'] = $comentario->readProductsComment()) {
                    $result['message'] = 'Exists ' . count($result['dataset']) . ' results';
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comment not found';
                }
                break;
            //cambiar el estado del comentario
            case 'changeState':
                if (!$comentario->setId($_POST['idComentario'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($result['dataset'] = $comentario->changeState()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comment not found';
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
