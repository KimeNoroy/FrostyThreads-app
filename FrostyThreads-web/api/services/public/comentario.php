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
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readAllByProduct':
                if(!$comentario->setIdProducto(['idPrenda'])){
                    $result['error'] = $comentario->getDataError();
                }
                else if ($result['dataset'] = $comentario->readCommentsByCloth()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen comentarios registrados';
                }
                break;
            case 'deleteRow':
                if (
                    !$comentario->setId($_POST['idComentario']) 
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'comentario eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el comentario';
                }
                break;
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