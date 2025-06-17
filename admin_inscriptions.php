<?php
$fichierJson = 'inscriptions_en_attente.json';

// Charger les inscriptions
$inscriptions = [];
if (file_exists($fichierJson)) {
    $jsonContent = file_get_contents($fichierJson);
    $inscriptions = json_decode($jsonContent, true) ?? [];
}

// Gérer actions (valider/refuser)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $email = $_POST['email'] ?? '';

    foreach ($inscriptions as $key => $inscription) {
        if ($inscription['email'] === $email) {
            if ($action === 'valider') {
                $inscriptions[$key]['valide'] = true;
            } elseif ($action === 'refuser') {
                // Supprimer l’inscription refusée
                unset($inscriptions[$key]);
            }
            break;
        }
    }
    // Réindexer tableau après suppression
    $inscriptions = array_values($inscriptions);

    // Sauvegarder
    file_put_contents($fichierJson, json_encode($inscriptions, JSON_PRETTY_PRINT));

    // Redirection pour éviter re-soumission
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <title>Admin Inscriptions Affinix</title>
    <style>
        body { font-family: Arial, sans-serif; background: #120033; color: #eee; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px;}
        th, td { padding: 10px; border: 1px solid #444; text-align: center;}
        th { background: #4B0082; }
        tr.valide { background-color: #2a7a2a; }
        button { padding: 5px 10px; margin: 0 5px; cursor: pointer; }
        form { display: inline; }
    </style>
</head>
<body>
    <h1>Administration des inscriptions</h1>
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Salles choisies</th>
                <th>Date inscription</th>
                <th>Statut</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php if (empty($inscriptions)): ?>
                <tr><td colspan="6">Aucune inscription en attente.</td></tr>
            <?php else: ?>
                <?php foreach ($inscriptions as $insc): ?>
                    <tr class="<?= $insc['valide'] ? 'valide' : '' ?>">
                        <td><?= htmlspecialchars($insc['nom']) ?></td>
                        <td><?= htmlspecialchars($insc['email']) ?></td>
                        <td><?= htmlspecialchars(implode(', ', $insc['salles'])) ?></td>
                        <td><?= htmlspecialchars($insc['date']) ?></td>
                        <td><?= $insc['valide'] ? 'Validée' : 'En attente' ?></td>
                        <td>
                            <?php if (!$insc['valide']): ?>
                            <form method="POST" style="display:inline;">
                                <input type="hidden" name="email" value="<?= htmlspecialchars($insc['email']) ?>">
                                <button type="submit" name="action" value="valider">Valider</button>
                            </form>
                            <form method="POST" style="display:inline;">
                                <input type="hidden" name="email" value="<?= htmlspecialchars($insc['email']) ?>">
                                <button type="submit" name="action" value="refuser" onclick="return confirm('Refuser cette inscription ?')">Refuser</button>
                            </form>
                            <?php else: ?>
                                -
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
            <?php endif; ?>
        </tbody>
    </table>
</body>
</html>
