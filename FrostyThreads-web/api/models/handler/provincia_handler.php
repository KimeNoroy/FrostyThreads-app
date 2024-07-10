<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class ProvinciaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $provincia = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_provincia, provincia FROM tb_provincias        
                WHERE provincia LIKE ?
                ORDER BY provincia';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_provincias (provincia) VALUES (?);
        ';
        $params = array($this->provincia);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_provincia, provincia FROM tb_provincias
                ORDER BY provincia';
        return Database::getRows($sql);
    }

    public function readAllIds()
    {
        $sql = 'SELECT id_provincia FROM tb_provincias';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_provincia, provincia FROM tb_provincias WHERE id_provincia = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_provincias 
                SET provincia = ?
                WHERE id_provincia = ?;
        
        ';
        $params = array($this->provincia, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_provincias
                WHERE id_provincia = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}