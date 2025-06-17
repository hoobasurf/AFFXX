<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: admin_connexion.html");
    exit;
}

if (isset($_POST['index'])) {
    $index = (int) $_POST['index'];
    $utilisateurs = file("data/utilisateurs_validés.csv", FILE_IGNORE_NEW_LINES);
    if (isset($utilisateurs[$index])) {
        // déplacer la ligne vers fichier bloqué
        file_put_contents("data/utilisateurs_bloques.csv", $utilisateurs[$index] . "\n", FILE_APPEND);
        unset($utilisateurs[$index]);
        file_put_contents("data/utilisateurs_validés.csv", implode("\n", $utilisateurs));
    }
}
header("Location: admin_panel.php");
exit;
