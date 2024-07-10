<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class AdministradorHandler
{
    //campos de la tabla

    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $email = null;
    protected $clave = null;
    protected $id_tipo_administrador = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_administrador, email_administrador, clave_administrador
                FROM tb_administradores
                WHERE  email_administrador = ?';
        $params = array($email);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['clave_administrador'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['emailAdministrador'] = $data['email_administrador'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT clave_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['clave_administrador'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administradores
                SET clave_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->clave, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador, id_tipo_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($_SESSION['idAdministrador']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_administrador = ?, apellido_administrador = ?, email_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->email, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador, id_tipo_administrador
                FROM tb_administradores
                WHERE apellido_administrador LIKE ? OR nombre_administrador LIKE ?
                ORDER BY apellido_administrador';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_administradores(nombre_administrador, apellido_administrador, email_administrador, clave_administrador, id_tipo_administrador)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->email, $this->clave, $this->id_tipo_administrador);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador, id_tipo_administrador
                FROM tb_administradores
                ORDER BY apellido_administrador';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, email_administrador, id_tipo_administrador
                FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_administradores
                SET nombre_administrador = ?, apellido_administrador = ?, email_administrador = ?, id_tipo_administrador = ?
                WHERE id_administrador = ?';
        $params = array($this->nombre, $this->apellido, $this->email, $this->id_tipo_administrador, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administradores
                WHERE id_administrador = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}