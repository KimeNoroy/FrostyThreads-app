<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class DetalleOrdenHandler
{
    //campos de la tabla

    protected $id = null;
    protected $id_prenda = null;
    protected $id_orden = null;
    protected $cantidad = null;
    protected $precio_prenda = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_detalle_orden, id_prenda, id_orden, cantidad_prenda, precio_prenda FROM tb_detalle_ordenes
                WHERE id_orden LIKE ? 
                ORDER BY id_prenda';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_detalle_ordenes (id_prenda, id_orden, cantidad_prenda, precio_prenda) 
                VALUES (?,?,?,?);
        ';
        $params = array($this->id_prenda, $this->id_orden, $this->cantidad, $this->precio_prenda);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.id_detalle_orden, a.id_prenda, c.nombre_prenda, a.id_orden, a.cantidad_prenda, a.precio_prenda FROM tb_detalle_ordenes a,
                tb_ordenes b, tb_prendas c WHERE a.id_orden = b.id_orden AND a.id_prenda = c.id_prenda';
        return Database::getRows($sql);
    }

    public function readAllByOrder()
    {
        $sql = 'SELECT a.id_detalle_orden, a.id_prenda, c.nombre_prenda, a.id_orden, a.cantidad_prenda, a.precio_prenda FROM tb_detalle_ordenes a,
                tb_ordenes b, tb_prendas c WHERE a.id_orden = b.id_orden AND a.id_prenda = c.id_prenda AND a.id_orden = ?';
        $params = array($this->id_orden);
        return Database::getRows($sql,$params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_detalle_orden, id_prenda, id_orden, cantidad_prenda, precio_prenda FROM tb_detalle_ordenes
                WHERE id_detalle_orden = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function addOne(){
        $sql = 'UPDATE tb_detalle_ordenes
                SET cantidad_prenda = cantidad_prenda+1
                WHERE id_detalle_orden = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function addMinus(){
        $sql = 'UPDATE tb_detalle_ordenes
                SET cantidad_prenda = cantidad_prenda-1
                WHERE id_detalle_orden = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_detalle_ordenes 
                SET id_prenda = ?, 
                id_orden = ?, 
                cantidad_prenda = ?, 
                precio_prenda = ? 
                WHERE id_detalle_orden = ?;
        ';
        $params = array($this->id_prenda, $this->id_orden, $this->cantidad, $this->precio_prenda, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_detalle_ordenes
                WHERE id_detalle_orden = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}