<?php
// === CONFIG ===
// Adresse mail du créateur qui recevra les inscriptions
$adminEmail = "brice.paneela@icloud.com";

// Dossier pour sauvegarder inscriptions (crée-le avec droits écriture)
$dataDir = __DIR__ . '/inscriptions';
if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);

// Fonction pour générer un token unique de validation
function generateToken($length = 32) {
    return bin2hex(random_bytes($length));
}

// === Récupération données POST et nettoyage ===
$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$description = trim($_POST['description'] ?? '');
$salles = $_POST['salles'] ?? [];

if (empty($username) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($salles)) {
    die("Erreur: Veuillez remplir tous les champs obligatoires correctement.");
}

// Générer un token unique
$token = generateToken(16);

// Construire le contenu inscription à sauvegarder
$inscriptionData = [
    'username' => htmlspecialchars($username, ENT_QUOTES),
    'email' => htmlspecialchars($email, ENT_QUOTES),
    'description' => htmlspecialchars($description, ENT_QUOTES),
    'salles' => $salles,
    'token' => $token,
    'validated' => false,
    'timestamp' => time()
];

// Sauvegarder inscription dans un fichier JSON unique
$file = $dataDir . "/inscription_{$token}.json";
file_put_contents($file, json_encode($inscriptionData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Préparer mail de validation
$validationUrl = "https://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . "/validate.php?token={$token}";

$subject = "Nouvelle inscription Affinix à valider";
$message = <<<EOD
Bonjour,

Une nouvelle inscription a été réalisée sur Affinix.

Nom d'utilisateur : {$username}
Email : {$email}
Description : {$description}
Salles choisies : {implode(", ", $salles)}

Pour valider cette inscription, cliquez sur le lien ci-dessous :
{$validationUrl}

Cordialement,
Le système Affinix
EOD;

$headers = "From: no-reply@affinix.example.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi mail au créateur
$mailSent = mail($adminEmail, $subject, $message, $headers);

if (!$mailSent) {
    echo "Erreur lors de l'envoi du mail de validation. Merci de réessayer plus tard.";
    exit;
}

// Message utilisateur
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>Inscription enregistrée</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body {
    background: #110022;
    color: #ff66ff;
    font-family: 'Orbitron', sans-serif;
    text-align: center;
    padding: 3rem;
  }
  a {
    color: #ff99ff;
    text-decoration: none;
  }
</style>
</head>
<body>
  <h1>Merci pour votre inscription !</h1>
  <p>Un email de validation a été envoyé au créateur de l'application.</p>
  <p>Vous recevrez une confirmation une fois votre inscription validée.</p>
  <p><a href="index.html">Retour à l'accueil</a></p>
</body>
</html>
