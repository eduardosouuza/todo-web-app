<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/TodoController.php';

$controller = new TodoController($pdo);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

if ($path === '/todos' && $method === 'POST') {
    $controller->create();
} elseif ($path === '/todos' && $method === 'GET') {
    if (isset($_GET['id'])) {
        $controller->read($_GET['id']);
    } else {
        $controller->getAll();
    }
} elseif ($path === '/todos' && $method === 'PUT') {
    if (isset($_GET['id'])) {
        $controller->update($_GET['id']);
    }
} elseif ($path === '/todos' && $method === 'DELETE') {
    if (isset($_GET['id'])) {
        $controller->delete($_GET['id']);
    }
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
}
