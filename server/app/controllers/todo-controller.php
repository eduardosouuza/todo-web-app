<?php

require_once __DIR__ . '/../models/Todo.php';

class TodoController
{
    private $todoModel;

    public function __construct($pdo)
    {
        $this->todoModel = new Todo($pdo);
    }

    public function create()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $description = $data['description'];
        $id = $this->todoModel->create($title, $description);
        echo json_encode(['id' => $id]);
    }

    // add crud aqui
}
