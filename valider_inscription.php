<?php
$fichierJson = 'inscriptions_en_attente.json';
$inscriptions = [];
if (file_exists($fichierJson)) {
    $jsonContent = file_get_contents($fichierJson);
    $inscriptions = json_decode($jsonContent, true) ?? [];
} else {
    die("Aucune inscription en attente.");
}

$email = $_GET['email'] ?? '';
$token = $_GET['token'] ?? '';

if (!$email || !$token) {
    die("Lien invalide.");
}

$trouve = false;
foreach ($inscriptions as &$inscription) {
    if ($inscription['email'] === $email && $inscription['token'] === $token) {
        if ($inscription['valide'] === true) {
            die("Cette inscription est déjà validée.");
        }
        // Marquer comme validée
        $inscription['valide'] = true;
        $trouve = true;
        break;
    }
}

if (!$trouve) {
    die("Inscription non trouvée ou lien invalide.");
}

// Sauvegarder la validation
file_put_contents($fichierJson, json_encode($inscriptions, JSON_PRETTY_PRINT));

// Tu peux ici envoyer un email à l’utilisateur pour confirmer la validation si tu veux.

echo "Merci, l'inscription de $email est maintenant validée.";
?>
