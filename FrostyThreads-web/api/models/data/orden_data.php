<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/orden_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ORDEN.
 */
class OrdenData extends OrdenHandler
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
            $this->data_error = 'Wrong order ID';
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_cliente = $value;
            return true;
        } else {
            $this->data_error = 'Wrong address ID';
            return false;
        }
    }

    public function setDireccion($value, $min = 2, $max = 255)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->direccion = $value;
            
            return true;
        } else {
            $this->data_error = 'The address has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setEstado($value)
    {
        $this->estado = $value;   
        return true; 
    }

    public function setFecha($value){
        $this->fecha = strval($value);
        return true;
    }

    public function setCantidad($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cantidad = $value;
            return true;
        } else {
            $this->data_error = 'The quantity has to be a natural number';
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

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}