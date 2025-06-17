<?php
$token = $_GET['token'] ?? '';
$source_file = "data/utilisateurs_en_attente.csv";
$valid_file = "data/utilisateurs_validés.csv";

if (!$token) {
    die("Lien invalide.");
}

$found = false;
$lines = file($source_file);
$new_lines = [];

foreach ($lines as $line) {
    list($nom, $email, $password, $salles, $saved_token, $valide) = explode(",", trim($line));
    if ($token === $saved_token) {
        $found = true;
        $valid_line = "$nom,$email,$password,$salles\n";
        file_put_contents($valid_file, $valid_line, FILE_APPEND);
    } else {
        $new_lines[] = $line;
    }
}

if ($found) {
    file_put_contents($source_file, implode("", $new_lines));
    echo "✅ Ton compte a été validé avec succès ! Tu peux maintenant accéder à la ville d’AFFINIX.";
} else {
    echo "❌ Token non trouvé ou déjà utilisé.";
}
?>
