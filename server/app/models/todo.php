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

    // passar crud aqui
}
