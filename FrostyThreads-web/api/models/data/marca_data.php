<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/marca_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla MARCA.
 */
class MarcaData extends MarcaHandler
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
            $this->data_error = 'Wrong Brand ID';
            return false;
        }
    }

    public function setMarca($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The brand name has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->marca = $value;
            return true;
        } else {
            $this->data_error = 'The brand name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setimgMarca($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 100)) {
            $this->img = Validator::getFilename();
            return true;
        } elseif (Validator::getFileError()) {
            $this->data_error = Validator::getFileError();
            return false;
        } elseif ($filename) {
            $this->img = $filename;
            return true;
        } else {
            $this->img = 'default.png';
            return true;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}