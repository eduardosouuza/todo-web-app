<?php

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controllers/TodoController.php';

$controller = new TodoController($pdo);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/todos' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->create();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found']);
}
