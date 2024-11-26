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

    public function read($id)
    {
        $todo = $this->todoModel->read($id);
        echo json_encode($todo);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $description = $data['description'];
        $updated = $this->todoModel->update($id, $title, $description);
        echo json_encode(['updated' => $updated]);
    }

    public function delete($id)
    {
        $deleted = $this->todoModel->delete($id);
        echo json_encode(['deleted' => $deleted]);
    }

    public function getAll()
    {
        $todos = $this->todoModel->getAll();
        echo json_encode($todos);
    }
}
