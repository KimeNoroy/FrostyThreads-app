<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/comentario_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla COMENTARIO.
 */
class ComentarioData extends ComentarioHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null; 
    
    /*
     *  Métodos para validar y asignar valores de los atributos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'Wrong comment ID';
            return false;
        }
    }

    public function setIdProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idProducto = $value;
            return true;
        } else {
            $this->data_error = 'Wrong product ID';
            return false;
        }
    }

    public function setDetalle($value, $min = 2, $max = 255)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->detalle = $value;
            return true;
        } else {
            $this->data_error = 'The description has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setCalificacion($value)
    {
        if (!Validator::validateMoney($value)) {
            $this->data_error = 'The qualification cant be negative';
            return false;
        } else{
            $this->calificacion = $value;
            return true;
        } 
    }

    public function setEstado($value)
    {
        if (!Validator::validateBoolean($value)) {
            $this->data_error = 'Invalid state';
            return false;
        } else{
            $this->estado = $value;
            return true;
        } 
    }

    public function setIdDetalleOrden($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_detalle_orden = $value;
            return true;
        } else {
            $this->data_error = 'Wrong order detail ID';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}