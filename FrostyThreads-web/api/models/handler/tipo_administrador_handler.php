<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class TipoAdministradorHandler
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
        $sql = 'SELECT id_tipo_administrador, tipo_administrador FROM tb_tipos_administradores       
                WHERE tipo_administrador LIKE ?
                ORDER BY tipo_administrador';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_tipos_administradores (tipo_administrador) VALUES (?);
        ';
        $params = array($this->tipo);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_tipo_administrador, tipo_administrador FROM tb_tipos_administradores 
                ORDER BY tipo_administrador';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_tipo_administrador, tipo_administrador FROM tb_tipos_administradores  WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_tipos_administradores 
                SET tipo_administrador = ? 
                WHERE id_tipo_administrador = ?;
        ';
        $params = array($this->tipo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_tipos_administradores
                WHERE id_tipo_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}