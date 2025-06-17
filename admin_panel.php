<?php
session_start();
if (!isset($_SESSION['admin'])) {
    header("Location: admin_connexion.html");
    exit;
}

$utilisateurs = file("data/utilisateurs_validés.csv", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

function couleurSalle($salle) {
    $couleurs = [
        'Relation Sérieuse' => '#ff4dff',
        'Rencontre Amicale' => '#4dd0ff',
        'Rencontre Fun' => '#ffb84d',
        'Parents Solos' => '#d07cff'
    ];
    return $couleurs[$salle] ?? '#ccc';
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Panel Admin - Affinix</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      background-color: #111;
      color: white;
      font-family: sans-serif;
      padding: 20px;
    }
    .profil {
      background: #222;
      margin: 10px 0;
      padding: 15px;
      border-radius: 8px;
    }
    .badge {
      padding: 4px 8px;
      margin: 2px;
      border-radius: 6px;
      display: inline-block;
      font-size: 12px;
      color: white;
    }
    a, button {
      color: #ff4dff;
      background: none;
      border: none;
      cursor: pointer;
    }
    form {
      display: inline;
    }
  </style>
</head>
<body>
  <h1>👁️‍🗨️ Liste des utilisateurs validés</h1>

  <?php foreach ($utilisateurs as $index => $ligne): ?>
    <?php list($nom, $email, $mdp, $salles) = explode(",", $ligne); ?>
    <div class="profil">
      <strong><?= htmlspecialchars($nom) ?></strong> | <?= htmlspecialchars($email) ?><br>
      Salles :
      <?php foreach (explode(";", $salles) as $salle): ?>
        <span class="badge" style="background: <?= couleurSalle($salle) ?>"><?= $salle ?></span>
      <?php endforeach; ?>
      <br><br>
      <form action="admin_supprimer.php" method="POST" onsubmit="return confirm('Supprimer ce profil ?')">
        <input type="hidden" name="index" value="<?= $index ?>">
        <button>❌ Supprimer</button>
      </form>
      <form action="admin_bloquer.php" method="POST" onsubmit="return confirm('Bloquer ce profil ?')">
        <input type="hidden" name="index" value="<?= $index ?>">
        <button>🔒 Bloquer</button>
      </form>
    </div>
  <?php endforeach; ?>

  <p><a href="deconnexion.php">🔓 Se déconnecter</a></p>
</body>
</html>
