<?php

class Todo
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function create($title, $description)
    {
        $sql = 'INSERT INTO todos (title, description) VALUES (:title, :description)';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['title' => $title, 'description' => $description]);
        return $this->pdo->lastInsertId();
    }

    public function read($id)
    {
        $sql = 'SELECT * FROM todos WHERE id = :id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function update($id, $title, $description)
    {
        $sql = 'UPDATE todos SET title = :title, description = :description WHERE id = :id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id, 'title' => $title, 'description' => $description]);
        return $stmt->rowCount();
    }

    public function delete($id)
    {
        $sql = 'DELETE FROM todos WHERE id = :id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount();
    }

    public function getAll()
    {
        $sql = 'SELECT * FROM todos';
        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll();
    }
}
