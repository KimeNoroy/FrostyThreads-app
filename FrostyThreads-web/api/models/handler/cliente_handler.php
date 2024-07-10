<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class ClienteHandler
{
    //campos de la tabla

    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $email = null;
    protected $clave = null;
    protected $estado = null;
    
    /*
     *  Métodos para gestionar la cuenta del cliente.
     */
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_cliente, email_cliente, clave_cliente, estado_cliente
                FROM tb_clientes
                WHERE  email_cliente = ?';
        $params = array($email);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_cliente'])) {
            $this ->id = $data['id_cliente'];
            $this->clave = $data['clave_cliente'];
            $this->email = $data['email_cliente'];
            $this->estado = $data['estado_cliente'];

            return true;
        } else {
            return false;
        }
    }
    
    public function checkPassword($password)
    {
        $sql = 'SELECT clave_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_cliente'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET clave_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->clave, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, email_cliente, estado_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($_SESSION['idCliente']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, email_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->email, $_SESSION['idCliente']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, email_cliente, estado_cliente
                FROM tb_clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function getAddresses(){
        $sql = 'SELECT b.id_domicilio, b.detalle_direccion FROM tb_clientes a, tb_domicilios b WHERE a.id_cliente = b.id_cliente AND a.id_cliente = ?';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

    public function checkBuy($prenda){
        $sql = 'SELECT b.id_detalle_orden FROM tb_clientes a, tb_detalle_ordenes b, tb_ordenes c, tb_prendas d 
                WHERE c.id_orden = b.id_orden AND c.id_cliente = a.id_cliente AND b.id_prenda = d.id_prenda AND 
                d.id_prenda = ? AND a.id_cliente = ?';
        $params = array($prenda,$_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre_cliente, apellido_cliente, email_cliente, clave_cliente, estado_cliente)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->email, $this->clave, $this->estado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, email_cliente, estado_cliente
                FROM tb_clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }

    public function readAllIds()
    {
        $sql = 'SELECT id_cliente
                FROM tb_clientes';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, email_cliente, clave_cliente, estado_cliente
                FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre_cliente = ?, apellido_cliente = ?, email_cliente = ?, estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->email, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['emailCliente'] = $this->email;
            return true;
        } else {
            return false;
        }
    }
}