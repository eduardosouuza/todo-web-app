<?php
require __DIR__ . '/../database/conn.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$pdo = Database::getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->prepare("SELECT * FROM task");
    $stmt->execute();
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tasks);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['description']) || !isset($data['completed'])) {
        echo json_encode(['error' => 'Dados inválidos']);
        exit;
    }
    
    $description = filter_var($data['description'], FILTER_SANITIZE_STRING);
    $completed = filter_var($data['completed'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    
    if ($description === false || $completed === null) {
        echo json_encode(['error' => 'Dados inválidos']);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO task (description, completed) VALUES (:description, :completed)");
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':completed', $completed, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        $newTask = [
            'id' => $pdo->lastInsertId(),
            'description' => $description,
            'completed' => $completed,
        ];
        echo json_encode($newTask);
    } else {
        echo json_encode(['error' => 'Falha ao adicionar tarefa']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = filter_var($data['id'], FILTER_VALIDATE_INT);
    $completed = filter_var($data['completed'], FILTER_VALIDATE_BOOLEAN);
    
    if ($id === false || $completed === false) {
        echo json_encode(['error' => 'Dados inválidos']);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE task SET completed = :completed WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':completed', $completed, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        echo json_encode(['id' => $id, 'completed' => $completed]);
    } else {
        echo json_encode(['error' => 'Falha ao atualizar tarefa']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = filter_var($data['id'], FILTER_VALIDATE_INT);
    
    if ($id === false) {
        echo json_encode(['error' => 'ID inválido']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM task WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Tarefa excluída']);
    } else {
        echo json_encode(['error' => 'Falha ao excluir tarefa']);
    }
}
