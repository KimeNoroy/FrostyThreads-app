<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/detalle_orden_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla DETALLE ORDEN.
 */
class DetalleOrdenData extends DetalleOrdenHandler
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
            $this->data_error = 'Wrong order detail ID';
            return false;
        }
    }

    public function setIdPrenda($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_prenda = $value;
            return true;
        } else {
            $this->data_error = 'Wrong cloth ID';
            return false;
        }
    }

    public function setIdOrden($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_orden = $value;
            return true;
        } else {
            $this->data_error = 'Wrong order ID';
            return false;
        }
    }

    public function setCantidad($value)
    {
        if (!Validator::validateNaturalNumber($value)) {
            $this->data_error = 'The quantity has to be a natural number';
            return false;
        } else{
            $this->cantidad = $value;
            return true;
        }
    }

    public function setPrecio($value){
        if ($value<0) {
            $this->data_error = 'The price cant be negative';
            return false;
        } else{
            $this->precio_prenda = $value;
            return true;
        } 
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}