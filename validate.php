<?php
// Dossier des inscriptions
$dataDir = __DIR__ . '/inscriptions';

$token = $_GET['token'] ?? '';

if (!$token) {
    die("Lien de validation invalide.");
}

$file = $dataDir . "/inscription_{$token}.json";

if (!file_exists($file)) {
    die("Inscription non trouvée ou déjà validée.");
}

$data = json_decode(file_get_contents($file), true);

if (!$data) {
    die("Données invalides.");
}

if ($data['validated']) {
    die("Cette inscription a déjà été validée.");
}

// On valide l'inscription
$data['validated'] = true;
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Ici tu peux aussi envoyer un email à l’utilisateur pour l’informer que c’est validé, si tu veux.

// Confirmation affichée
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Inscription validée</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body {
    background: #110022;
    color: #aaffaa;
    font-family: 'Orbitron', sans-serif;
    text-align: center;
    padding: 3rem;
  }
</style>
</head>
<body>
  <h1>Inscription validée avec succès !</h1>
  <p>Merci d’avoir validé cette inscription.</p>
  <p><a href="index.html">Retour à l'accueil</a></p>
</body>
</html>
