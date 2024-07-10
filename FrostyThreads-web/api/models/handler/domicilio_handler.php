<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class DomicilioHandler
{
    //campos de la tabla

    protected $id = null;
    protected $id_provincia = null;
    protected $direccion = null;
    protected $id_cliente = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_domicilio, id_provincia, detalle_direccion, id_cliente FROM tb_domicilios
                WHERE detalle_direccion LIKE ? OR id_cliente LIKE ?';
        $params = array($value,$value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_domicilios (id_provincia, detalle_direccion, id_cliente) 
                VALUES (?,?,?)';
        $params = array($this->id_provincia, $this->direccion, $this->id_cliente);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.id_domicilio, a.id_provincia, c.provincia, a.detalle_direccion, a.id_cliente FROM tb_domicilios a, 
                tb_clientes b, tb_provincias c WHERE a.id_provincia = c.id_provincia AND a.id_cliente = b.id_cliente ';
        return Database::getRows($sql);
    }

    public function readAllByCostumer($value)
    {
        $sql = 'SELECT a.id_domicilio, a.id_provincia, c.provincia, a.detalle_direccion, a.id_cliente FROM tb_domicilios a, 
                tb_clientes b, tb_provincias c WHERE a.id_provincia = c.id_provincia AND a.id_cliente = b.id_cliente 
                AND a.id_cliente = ?';
        $params = array($value);
        return Database::getRows($sql,$params);
    }

    public function readAllId()
    {
        $sql = 'SELECT id_domicilio, detalle_direccion FROM tb_domicilios';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_domicilio, id_provincia, detalle_direccion, id_cliente FROM tb_domicilios
                WHERE id_domicilio = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_domicilios 
                SET id_provincia = ?, 
                detalle_direccion = ?, 
                id_cliente = ? 
                WHERE id_domicilio = ?;
        ';
        $params = array($this->id_provincia, $this->direccion, $this->id_cliente, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_domicilios
                WHERE id_domicilio = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}