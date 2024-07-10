<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class TallaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $talla = null;
    protected $id_tipo_talla = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_talla, talla, id_tipo_talla FROM tb_tallas       
                WHERE talla LIKE ?
                ORDER BY talla';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_tallas (talla, id_tipo_talla) VALUES (?, ?)';
        $params = array($this->talla, $this->id_tipo_talla);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_talla, talla, id_tipo_talla FROM tb_tallas
                ORDER BY talla';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_talla, talla, id_tipo_talla FROM tb_tallas WHERE id_talla = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tallas 
                SET talla = ?, 
                id_tipo_talla = ? 
                WHERE id_talla = ?;
        ';
        $params = array($this->talla, $this->id_tipo_talla, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tallas
                WHERE id_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}