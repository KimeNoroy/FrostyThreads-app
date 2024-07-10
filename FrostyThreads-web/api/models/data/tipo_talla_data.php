<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/tipo_talla_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TIPO TALLA.
 */
class TipoTallaData extends TipoTallaHandler
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
            $this->data_error = 'Wrong size type ID';
            return false;
        }
    }

    public function setTipoTalla($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'The size type name has to be a alphanumeric value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'The size type name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}