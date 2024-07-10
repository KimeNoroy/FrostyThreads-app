<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/descuento_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla DESCUENTO.
 */
class DescuentoData extends DescuentoHandler
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
            $this->data_error = 'Wrong discount ID';
            return false;
        }
    }

    public function setDescuento($value)
    {
        if (!Validator::validateNaturalNumber($value) && !($value == 0)) {
            $this->data_error = 'The discount has to be a natural number';
            return false;
        } else{
            $this->descuento = $value;
            return true;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}