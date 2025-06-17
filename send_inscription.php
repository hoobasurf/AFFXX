<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Vérifier que la méthode est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Récupérer les données du formulaire
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $salles = $_POST['salles'] ?? [];

    if (!$username || !$email) {
        echo "Erreur : nom d'utilisateur ou email manquant.";
        exit;
    }

    // Juste afficher les infos reçues (pour test)
    echo "<h2>Inscription reçue</h2>";
    echo "Nom : " . htmlspecialchars($username) . "<br>";
    echo "Email : " . htmlspecialchars($email) . "<br>";
    echo "Salles choisies : <ul>";
    foreach ($salles as $salle) {
        echo "<li>" . htmlspecialchars($salle) . "</li>";
    }
    echo "</ul>";

    // Ici tu peux ajouter l’envoi mail ou insertion en base

} else {
    echo "Méthode non autorisée.";
}
?>
