<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/provincia_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PROVINCIA.
 */
class ProvinciaData extends ProvinciaHandler
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
            $this->data_error = 'Wrong province ID';
            return false;
        }
    }

    public function setProvincia($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The province name has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->provincia = $value;
            return true;
        } else {
            $this->data_error = 'The province name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}