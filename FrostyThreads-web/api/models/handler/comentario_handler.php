<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class ComentarioHandler
{
    //campos de la tabla

    protected $id = null;
    protected $detalle = null;
    protected $calificacion = null;
    protected $estado = null;
    protected $id_detalle_orden = null;
    protected $idProducto = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    public function createRow()
    {
        $sql = 'INSERT INTO tb_comentarios(detalle_comentario, calificacion_prenda, estado_comentario, id_detalle_orden)
                VALUES(?, ?, ?, ?)';
        $params = array($this->detalle, $this->calificacion, $this->estado, $this->id_detalle_orden);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_comentario, detalle_comentario, calificacion_prenda, estado_comentario, id_detalle_orden FROM tb_comentarios';
        return Database::getRows($sql);
    }

    public function readAllByProduct()
    {
        $sql = 'SELECT a.id_comentario, a.detalle_comentario, a.calificacion_prenda, a.estado_comentario, a.id_detalle_orden FROM tb_comentarios a,
                tb_detalle_ordenes b, tb_prendas c 
                WHERE a.id_detalle_orden = b.id_detalle_orden AND c.id_prenda = b.id_prenda AND b.id_prenda = ?
                ';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }
    

    public function readOne()
    {
        $sql = 'SELECT c.id_comentario, c.detalle_comentario, c.calificacion_prenda, c.estado_comentario
        FROM tb_comentarios c
        JOIN tb_detalle_ordenes do ON c.id_detalle_orden = do.id_detalle_orden
        JOIN tb_prendas p ON do.id_prenda = p.id_prenda
        WHERE c.id_comentario = ?;';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_comentarios 
            SET detalle_comentario = ?, 
            calificacion_prenda = ?, 
            estado_comentario = ? 
            WHERE id_comentario = ?;
        ';
        $params = array($this->detalle, $this->calificacion, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function changeState()
    {
        $sql = 'UPDATE tb_comentarios 
            SET  estado_comentario = !(estado_comentario) 
            WHERE id_comentario = ?;
        ';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_comentarios
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductsComment(){
        $sql = 'SELECT c.*, p.*, do.cantidad_prenda, o.fecha_orden, cl.nombre_cliente, cl.apellido_cliente
                FROM tb_comentarios c
                JOIN tb_detalle_ordenes do ON c.id_detalle_orden = do.id_detalle_orden
                JOIN tb_prendas p ON do.id_prenda = p.id_prenda
                JOIN tb_ordenes o ON o.id_orden = do.id_orden
                JOIN tb_clientes cl ON o.id_cliente = cl.id_cliente 
                WHERE p.id_prenda = ?';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }

    public function readCommentsByCloth()
    {
        $sql = 'SELECT c.*, p.*, do.cantidad_prenda, o.fecha_orden, cl.nombre_cliente, cl.apellido_cliente
                FROM tb_comentarios c
                JOIN tb_detalle_ordenes do ON c.id_detalle_orden = do.id_detalle_orden
                JOIN tb_prendas p ON do.id_prenda = p.id_prenda
                JOIN tb_ordenes o ON o.id_orden = do.id_orden
                JOIN tb_clientes cl ON o.id_cliente = cl.id_cliente 
                WHERE p.id_prenda = ? AND c.estado_comentario = true;';
        $params = array($this->idProducto);
        return Database::getRows($sql, $params);
    }
}