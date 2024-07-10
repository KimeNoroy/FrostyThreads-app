<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/categoria_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaData extends CategoriaHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null; 
    private $filename = null;
    
    /*
     *  Métodos para validar y asignar valores de los atributos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'Wrong category ID';
            return false;
        }
    }

    public function setCategoria($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'The category name has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->categoria = $value;
            return true;
        } else {
            $this->data_error = 'The category name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    
    public function setDescripcion($value, $min = 2, $max = 255)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'The descripcion name has to be a alphabetic value';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'The descripcion name has to be in the range ' . $min . ' to ' . $max;
            return false;
        }
    }

    public function setImg($file, $filename = null)
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

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['categoria_img'];
            return true;
        } else {
            $this->data_error = 'Category not found';
            return false;
        }
    }

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}