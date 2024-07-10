<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class MarcaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $marca = null;
    protected $img = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_marca, marca, marca_img FROM tb_marcas
                WHERE marca LIKE ?
                ORDER BY marca';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_marcas (marca,marca_img) VALUES (?,?);
        ';
        $params = array($this->marca, $this->img);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_marca, marca, marca_img FROM tb_marcas
                ORDER BY marca';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_marca, marca, marca_img FROM tb_marcas
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_marcas 
                SET marca = ?,
                    marca_img = ?
                WHERE id_marca = ?;
        
        ';
        $params = array($this->marca, $this->img, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_marcas
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}