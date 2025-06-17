<?php
// Lecture du fichier des utilisateurs validés
$valid_file = "data/utilisateurs_validés.csv";
$utilisateurs = file($valid_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$profils = [];

foreach ($utilisateurs as $line) {
    list($nom, $email, $password, $salles) = explode(",", trim($line));
    $profils[] = [
        'nom' => $nom,
        'email' => $email,
        'salles' => explode(',', $salles)
    ];
}

// Couleurs néon par salle
$couleurs = [
    'sérieuse' => '#ff4dff',
    'amicale' => '#33ccff',
    'fun'     => '#ffcc00',
    'parents' => '#00ff99'
];

// Pour transformer la salle en classe lisible
function format_salle($salle) {
    return strtolower(trim($salle));
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Profils Affinix</title>
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
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    }

    .salle {
      display: inline-block;
      margin: 5px;
      padding: 8px 15px;
      border-radius: 20px;
      font-weight: bold;
      text-transform: capitalize;
      box-shadow: 0 0 8px #fff;
      transition: 0.3s ease;
    }

    .sérieuse { background-color: #ff4dff; color: white; box-shadow: 0 0 8px #ff4dff; }
    .amicale  { background-color: #33ccff; color: white; box-shadow: 0 0 8px #33ccff; }
    .fun      { background-color: #ffcc00; color: black; box-shadow: 0 0 8px #ffcc00; }
    .parents  { background-color: #00ff99; color: black; box-shadow: 0 0 8px #00ff99; }

    h2 {
      margin-bottom: 10px;
      color: #fff;
      text-shadow: 0 0 5px #fff;
    }
  </style>
</head>
<body>
  <h1>👥 Profils inscrits</h1>

  <?php foreach ($profils as $profil): ?>
    <div class="profil">
      <h2><?= htmlspecialchars($profil['nom']) ?></h2>
      <p><strong>Email :</strong> <?= htmlspecialchars($profil['email']) ?></p>
      <p><strong>Salles choisies :</strong></p>
      <?php foreach ($profil['salles'] as $salle): 
          $classe = format_salle($salle);
      ?>
        <span class="salle <?= $classe ?>"><?= $classe ?></span>
      <?php endforeach; ?>
    </div>
  <?php endforeach; ?>

</body>
</html>
