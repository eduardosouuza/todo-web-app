<?php
require __DIR__ . '/database/conn.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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
    $content = $data['content'];
    $completed = $data['completed'];

    $stmt = $pdo->prepare("INSERT INTO task (content, completed) VALUES (:content, :completed)");
    $stmt->bindParam(':content', $content);
    $stmt->bindParam(':completed', $completed, PDO::PARAM_BOOL);

    if ($stmt->execute()) {
        $newTask = [
            'id' => $pdo->lastInsertId(),
            'content' => $content,
            'completed' => $completed,
        ];
        echo json_encode($newTask);
    } else {
        echo json_encode(['error' => 'Falha ao adicionar tarefa']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    parse_str(file_get_contents('php://input'), $data);
    $id = $data['id'];
    $completed = $data['completed'];

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
    parse_str(file_get_contents('php://input'), $data);
    $id = $data['id'];

    $stmt = $pdo->prepare("DELETE FROM task WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Tarefa excluída']);
    } else {
        echo json_encode(['error' => 'Falha ao excluir tarefa']);
    }
}
?>
