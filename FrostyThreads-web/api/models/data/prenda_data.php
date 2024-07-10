<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/prenda_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla PRENDA.
 */
class PrendaData extends PrendaHandler
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
            $this->data_error = 'Wrong cloth ID';
            return false;
        }
    }

    public function setIdCategoria($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_categoria = $value;
            return true;
        } else {
            $this->data_error = 'Wrong category ID';
            return false;
        }
    }

    public function setIdTalla($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_talla = $value;
            return true;
        } else {
            $this->data_error = 'Wrong size ID';
            return false;
        }
    }

    public function setFilename()
    {
        if ($data = $this->readFilename()) {
            $this->filename = $data['prenda_img'];
            return true;
        } else {
            $this->data_error = 'Cloth not found';
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

    public function setPrecio($value)
    {
        if ($value<0) {
            $this->data_error = 'The price cant be negative';
            return false;
        } else{
            $this->precio = $value;
            return true;
        } 
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

    public function setIdMarca($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_marca = $value;
            return true;
        } else {
            $this->data_error = 'Wrong brand ID';
            return false;
        }
    }

    public function setImg($file, $filename = null)
    {
        if (Validator::validateImageFile($file, 1000)) {
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

    public function setIdDescuento($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_descuento = $value;
            return true;
        } else {
            $this->data_error = 'Wrong discount ID';
            return false;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'Invalid state';
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