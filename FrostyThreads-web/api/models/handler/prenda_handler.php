<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class PrendaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $nombre = null;
    protected $id_categoria = null;
    protected $id_talla = null;
    protected $precio = null;
    protected $cantidad = null;
    protected $detalle = null;
    protected $id_marca = null;
    protected $img = null;
    protected $id_descuento = null;
    protected $estado = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/prendas/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_prenda, nombre_prenda, id_categoria, id_talla, precio, cantidad, detalle_prenda, id_marca, prenda_img, id_descuento, estado_prenda FROM tb_prendas        
                WHERE nombre_prenda LIKE ?
                ORDER BY id_prenda';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {

        $sql = 'INSERT INTO tb_prendas (nombre_prenda, id_categoria, id_talla, precio, cantidad, detalle_prenda, id_marca, prenda_img, id_descuento, estado_prenda) 
                VALUES (?,?,?,?,?,?,?,?,?,?)';
        $params = array($this->nombre, $this->id_categoria, $this->id_talla, $this->precio, $this->cantidad, $this->detalle, $this->id_marca, $this->img, $this->id_descuento, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT a.id_prenda, a.nombre_prenda, b.categoria, c.talla, a.precio, a.cantidad,
                a.detalle_prenda, d.marca, a.prenda_img, e.descuento, a.estado_prenda 
                FROM tb_prendas a, tb_categorias b, tb_tallas c, tb_marcas d, tb_descuentos e WHERE 
                a.id_categoria = b.id_categoria AND a.id_talla = c.id_talla AND a.id_marca = d.id_marca AND 
                a.id_descuento = e.id_descuento
                ORDER BY nombre_prenda';
        return Database::getRows($sql);
    }

    public function readAllByCategorie()
    {
        $sql = 'SELECT a.id_prenda, a.nombre_prenda, b.categoria, c.talla, a.precio, a.cantidad,
                a.detalle_prenda, d.marca, a.prenda_img, e.descuento, a.estado_prenda 
                FROM tb_prendas a, tb_categorias b, tb_tallas c, tb_marcas d, tb_descuentos e WHERE 
                a.id_categoria = b.id_categoria AND a.id_talla = c.id_talla AND a.id_marca = d.id_marca AND 
                a.id_descuento = e.id_descuento AND a.id_categoria = ? AND estado_prenda = true
                ORDER BY nombre_prenda';
        $params = array($this->id_categoria);
        return Database::getRows($sql,$params);
    }

    public function readAllByBrand()
    {
        $sql = 'SELECT a.id_prenda, a.nombre_prenda, b.categoria, c.talla, a.precio, a.cantidad,
                a.detalle_prenda, d.marca, a.prenda_img, e.descuento, a.estado_prenda 
                FROM tb_prendas a, tb_categorias b, tb_tallas c, tb_marcas d, tb_descuentos e WHERE 
                a.id_categoria = b.id_categoria AND a.id_talla = c.id_talla AND a.id_marca = d.id_marca AND 
                a.id_descuento = e.id_descuento AND a.id_marca = ? AND estado_prenda = true
                ORDER BY nombre_prenda';
        $params = array($this->id_marca);
        return Database::getRows($sql,$params);
    }

    public function readAllByDiscount()
    {
        $sql = 'SELECT a.id_prenda, a.nombre_prenda, b.categoria, c.talla, a.precio, a.cantidad,
                a.detalle_prenda, d.marca, a.prenda_img, e.descuento, a.estado_prenda 
                FROM tb_prendas a, tb_categorias b, tb_tallas c, tb_marcas d, tb_descuentos e WHERE 
                a.id_categoria = b.id_categoria AND a.id_talla = c.id_talla AND a.id_marca = d.id_marca AND 
                a.id_descuento = e.id_descuento AND a.id_descuento <> 1 AND estado_prenda = true
                ORDER BY nombre_prenda';
        return Database::getRows($sql);
    }

    

    public function readOne()
    {
        $sql = 'SELECT id_prenda, nombre_prenda, id_categoria, id_talla, precio, cantidad, detalle_prenda, id_marca, prenda_img, id_descuento, estado_prenda FROM tb_prendas
                WHERE id_prenda = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function getPrice()
    {
        $sql = 'SELECT precio FROM tb_prendas
                WHERE id_prenda = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function getComments(){
        $sql = 'SELECT c.id_comentario, c.detalle_comentario, c.calificacion_prenda, d.nombre_cliente, d.apellido_cliente 
                FROM tb_prendas a, tb_detalle_ordenes b, tb_comentarios c, tb_clientes d, tb_ordenes e
                WHERE a.id_prenda = b.id_prenda AND b.id_detalle_orden = c.id_detalle_orden 
                AND b.id_orden = e.id_orden AND e.id_cliente = d.id_cliente AND a.id_prenda = ? 
                AND c.estado_comentario = true';
        $params = array($this->id);
        return Database::getRows($sql,$params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_prendas 
                SET nombre_prenda = ?,
                id_categoria = ?, 
                id_talla = ?,
                precio = ?, 
                cantidad = ?, 
                detalle_prenda = ?, 
                id_marca = ?, 
                prenda_img = ?, 
                id_descuento = ?, 
                estado_prenda = ? 
                WHERE id_prenda = ?;
        ';
        $params = array($this->nombre, $this->id_categoria, $this->id_talla, $this->precio, $this->cantidad, $this->detalle, $this->id_marca, $this->img, $this->id_descuento, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT prenda_img
                FROM tb_prendas
                WHERE id_prenda = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readProductosPrenda()
    {
        $sql = 'SELECT id_prenda, prenda_img, nombre_prenda, precio, cantidad
                FROM tb_prendas
                INNER JOIN tb_categorias USING(id_categoria)
                WHERE id_categoria = ? AND estado_prenda = true
                ORDER BY nombre_prenda';
        $params = array($this->id_categoria);
        return Database::getRows($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_prendas
                WHERE id_prenda = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}

