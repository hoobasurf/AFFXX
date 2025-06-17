<?php
session_start();

$admin_password = "motDePasseSecret123"; // CHANGE CE MOT DE PASSE

if ($_POST['admin_pass'] === $admin_password) {
    $_SESSION['admin'] = true;
    header("Location: admin_panel.php");
    exit;
} else {
    echo "❌ Accès refusé. <a href='admin_connexion.html'>Retour</a>";
}
