<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/talla_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla TALLA.
 */
class TallaData extends TallaHandler
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
            $this->data_error = 'Wrong size ID';
            return false;
        }
    }

    public function setTalla($value)
    {
        $this->talla = $value;
        return true;
    }

    public function setIdTipoTalla($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_tipo_talla = $value;
            return true;
        } else {
            $this->data_error = 'Wrong size type ID';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}