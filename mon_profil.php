<?php
session_start();

if (!isset($_SESSION['utilisateur'])) {
    header("Location: connexion.html");
    exit;
}

$user = $_SESSION['utilisateur'];

// Couleurs
$couleurs = [
    'sérieuse' => '#ff4dff',
    'amicale' => '#33ccff',
    'fun'     => '#ffcc00',
    'parents' => '#00ff99'
];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon Profil</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background: url('img/fond-neon-violet.jpg') no-repeat center center fixed;
      background-size: cover;
      font-family: 'Segoe UI', sans-serif;
      color: white;
      text-align: center;
      padding: 40px;
    }

    .profil {
      background: rgba(0, 0, 0, 0.6);
      margin: 20px auto;
      padding: 20px;
      border-radius: 10px;
      max-width: 500px;
    }

    .salle {
      display: inline-block;
      margin: 5px;
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: bold;
      box-shadow: 0 0 8px white;
    }

    .logout {
      margin-top: 20px;
    }

    a.button {
      padding: 10px 15px;
      background-color: #ff4dff;
      color: white;
      border-radius: 8px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h1>👤 Bienvenue <?= htmlspecialchars($user['nom']) ?></h1>

  <div class="profil">
    <p><strong>Email :</strong> <?= htmlspecialchars($user['email']) ?></p>
    <p><strong>Salles choisies :</strong></p>
    <?php foreach ($user['salles'] as $salle): ?>
      <?php $salle = trim(strtolower($salle)); ?>
      <span class="salle" style="background-color: <?= $couleurs[$salle] ?? '#ccc' ?>;">
        <?= htmlspecialchars($salle) ?>
      </span>
    <?php endforeach; ?>
  </div>

  <div class="logout">
    <a href="deconnexion.php" class="button">Se déconnecter</a>
  </div>
</body>
</html>
