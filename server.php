<?php
$data = file_get_contents('todo-list.json');
$todos = json_decode($data, true);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'];
    $done = $_POST['done'] === 'true';

    $todo = [
        'text' => $text,
        'done' => $done
    ];
    $todos[] = $todo;
    $data = json_encode($todos);
    file_put_contents('todo-list.json', $data);
}

header('Content-Type: application/json');
echo json_encode($todos);
