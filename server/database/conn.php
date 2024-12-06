<?php
class Database {
    private static $pdo = null;

    public static function getConnection() {
        if (self::$pdo === null) {
            $hostname = 'localhost'; // ou o IPv4 do Windows se estiver usando WSL2
            $database = 'to_do_list';
            $username = 'postgres';
            $password = '1234';

            try {
                self::$pdo = new PDO("pgsql:host=$hostname;dbname=$database", $username, $password);
            } catch (PDOException $e) {
                echo "Erro: " . $e->getMessage();
                exit;
            }
        }
        return self::$pdo;
    }
}
