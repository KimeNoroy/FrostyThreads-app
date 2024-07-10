<?php

//import de clase database
require_once("../../helpers/database.php");

//crear handler
class CategoriaHandler
{
    //campos de la tabla

    protected $id = null;
    protected $categoria = null;
    protected $descripcion = null;
    protected $img = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria, categoria, categoria_img, categoria_descripcion
                FROM tb_categorias
                WHERE categoria LIKE ?
                ORDER BY categoria';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias(categoria, categoria_img, categoria_descripcion)
                VALUES(?, ?, ?)';
        $params = array($this->categoria, $this->img, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria, categoria, categoria_img, categoria_descripcion
                FROM tb_categorias
                ORDER BY categoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria, categoria, categoria_img, categoria_descripcion
                FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias
                SET categoria = ?, categoria_img = ?, categoria_descripcion = ?
                WHERE id_categoria = ?';
        $params = array($this->categoria, $this->img,$this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT categoria_img
                FROM tb_categorias
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
}