<?php
session_start();

$utilisateurs = file("data/utilisateurs_validés.csv", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$email = $_POST['email'];
$password = $_POST['motdepasse'];

foreach ($utilisateurs as $ligne) {
    list($nom, $mail, $mdp, $salles) = explode(",", trim($ligne));

    if ($email === $mail && $password === $mdp) {
        $_SESSION['utilisateur'] = [
            'nom' => $nom,
            'email' => $mail,
            'salles' => explode(",", $salles)
        ];
        header("Location: mon_profil.php");
        exit;
    }
}

echo "❌ Email ou mot de passe incorrect. <a href='connexion.html'>Réessayer</a>";
