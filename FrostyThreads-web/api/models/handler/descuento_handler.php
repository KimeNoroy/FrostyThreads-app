<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class DescuentoHandler
{
    //campos de la tabla

    protected $id = null;
    protected $descuento = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    public function createRow()
    {
        $sql = 'INSERT INTO tb_descuentos(descuento)
                VALUES(?)';
        $params = array($this->descuento);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_descuento, descuento
                FROM tb_descuentos
                ORDER BY descuento';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_descuento, descuento
                FROM tb_descuentos
                WHERE id_descuento = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_descuentos
                SET descuento = ?
                WHERE id_descuento = ?';
        $params = array($this->descuento, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_descuentos
                WHERE id_descuento = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}