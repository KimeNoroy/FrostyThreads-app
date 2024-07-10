<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class TipoTallaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $tipo = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_tipo_talla, tipo_talla FROM tb_tipos_tallas       
                WHERE tipo_talla LIKE ?
                ORDER BY tipo_talla';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_tallas (tipo_talla) VALUES (?);
        ';
        $params = array($this->tipo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_tipo_talla, tipo_talla FROM tb_tipos_tallas 
                ORDER BY tipo_talla';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_tipo_talla, tipo_talla FROM tb_tipos_tallas  WHERE id_tipo_talla = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_tallas 
                SET tipo_talla = ? 
                WHERE id_tipo_talla = ?;
        ';
        $params = array($this->tipo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_tallas
                WHERE id_tipo_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}