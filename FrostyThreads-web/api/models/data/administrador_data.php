<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/administrador_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ADMINISTRADOR.
 */
class AdministradorData extends AdministradorHandler
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
            $this->data_error = 'Wrong Administrator ID';
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The name has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'The name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setApellido($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The surname has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellido = $value;
            return true;
        } else {
            $this->data_error = 'The surname has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setEmail($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'Invalid email';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->email = $value;
            return true;
        } else {
            $this->data_error = 'The email has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }

    public function setIdTipoAdministrador($value, $min = 2, $max = 50)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_tipo_administrador = $value;
            return true;
        } else {
            $this->data_error = 'Wrong Administrator type ID';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
}