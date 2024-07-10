<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class OrdenHandler
{
    //campos de la tabla

    protected $id = null;
    protected $id_cliente = null;
    protected $estado = null;
    protected $direccion = null;
    protected $fecha = null;
    protected $id_prenda = null;
    protected $cantidad = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_orden, id_cliente, estado_orden, direccion_orden, fecha_orden FROM tb_ordenes
                WHERE id_orden LIKE ? OR id_cliente LIKE ?
                ORDER BY id_orden';
        $params = array($value,$value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_ordenes (id_cliente, direccion_orden, estado_orden, fecha_orden)
                VALUES (?,?,?,?);
        ';
        $params = array($this->id_cliente, $this->direccion, $this->estado, $this->fecha);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_orden, id_cliente, direccion_orden, estado_orden, fecha_orden FROM tb_ordenes
                ORDER BY id_orden';
        return Database::getRows($sql);
    }

    public function getOrder()
    {
        $this->estado = 'pendant';
        $sql = 'SELECT id_orden
                FROM tb_ordenes
                WHERE estado_orden = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idOrden'] = $data['id_orden'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $this->estado = 'pendant';
            $sql = 'INSERT INTO tb_ordenes(id_cliente, estado_orden,fecha_orden)
                    VALUES(?,?,?)';
            $params = array($_SESSION['idCliente'],$this->estado, $this->fecha);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idOrden'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail($precio)
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO tb_detalle_ordenes(id_prenda, id_orden, cantidad_prenda, precio_prenda)
                VALUES(?, ?, ?, ?)';
        $params = array($this->id_prenda, $_SESSION['idOrden'], $this->cantidad, $precio);
        return Database::executeRow($sql, $params);
    }

    public function readAllByCustomer()
    {
        $sql = 'SELECT a.id_orden, b.id_cliente, a.direccion_orden, a.estado_orden, a.fecha_orden FROM tb_ordenes a, 
                tb_clientes b WHERE a.id_cliente = b.id_cliente AND 
                b.id_cliente = ?
                ORDER BY a.id_orden';
        $params = array($this->id_cliente);
        return Database::getRows($sql, $params);
    }

    public function getTotal(){
        $sql = 'SELECT SUM(b.precio_prenda*b.cantidad_prenda) as total FROM tb_ordenes a, tb_detalle_ordenes b WHERE a.id_orden = b.id_orden AND a.id_orden = ?';
        $params = array($_SESSION['idOrden']);
        return Database::getRows($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT id_orden, id_cliente, direccion_orden, estado_orden, fecha_orden FROM tb_ordenes
                WHERE id_orden = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readDetail(){
        $sql = 'SELECT c.nombre_prenda, b.cantidad_prenda, b.precio_prenda, c.prenda_img, b.id_detalle_orden, c.cantidad
        FROM tb_ordenes a, tb_detalle_ordenes b, tb_prendas c WHERE a.id_orden = b.id_orden 
        AND b.id_prenda = c.id_prenda AND a.id_orden = ?';

        $params = array($_SESSION['idOrden']);

        return Database::getRows($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_ordenes 
                SET id_cliente = ?,
                direccion_orden = ?, 
                estado_orden = ?,
                fecha_orden = ?
                WHERE id_orden = ?;
        ';
        $params = array($this->id_cliente, $this->direccion, $this->estado, $this->fecha, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function finishOrder()
    {
        $sql = 'UPDATE tb_ordenes 
                SET 
                direccion_orden = ?, 
                estado_orden = ?
                WHERE id_orden = ?;
        ';
        $params = array($this->direccion, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_ordenes
                WHERE id_orden = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}