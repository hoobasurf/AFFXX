<?php
// Configuration
$adminEmail = "brice.paneela@icloud.com"; // Remplace par ton email administrateur
$subjectAdmin = "Nouvelle inscription Affinix";
$subjectUser = "Confirmez votre inscription Affinix";

// Fonction pour nettoyer les données
function cleanInput($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Vérifier si formulaire soumis en POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer et nettoyer les données
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $nom = cleanInput($_POST['nom'] ?? '');
    $salles = $_POST['salles'] ?? [];

    // Validation basique
    if (!$email || empty($nom) || empty($salles)) {
        http_response_code(400);
        echo "Erreur : veuillez remplir tous les champs correctement.";
        exit;
    }

    // Préparer la liste des salles sélectionnées
    $sallesList = implode(", ", array_map('cleanInput', $salles));

    // Construire le message pour admin
    $messageAdmin = "Nouvelle inscription sur Affinix :\n\n";
    $messageAdmin .= "Nom : $nom\n";
    $messageAdmin .= "Email : $email\n";
    $messageAdmin .= "Salles choisies : $sallesList\n";
    $messageAdmin .= "Date inscription : " . date("d/m/Y H:i:s") . "\n";

    // En-têtes email admin
    $headersAdmin = "From: no-reply@tondomaine.com\r\n";
    $headersAdmin .= "Reply-To: $email\r\n";

    // Envoi email admin
    $mailSentAdmin = mail($adminEmail, $subjectAdmin, $messageAdmin, $headersAdmin);

    // Construire email utilisateur avec lien de validation (ici un lien dummy à adapter)
    $validationLink = "https://tondomaine.com/valider_inscription.php?email=" . urlencode($email) . "&token=123456";

    $messageUser = "Bonjour $nom,\n\n";
    $messageUser .= "Merci pour votre inscription sur Affinix.\n";
    $messageUser .= "Pour valider votre inscription, veuillez cliquer sur ce lien :\n";
    $messageUser .= "$validationLink\n\n";
    $messageUser .= "Vous recevrez un retour après validation par le créateur.\n\n";
    $messageUser .= "Cordialement,\nL'équipe Affinix";

    // En-têtes email utilisateur
    $headersUser = "From: no-reply@tondomaine.com\r\n";

    // Envoi email utilisateur
    $mailSentUser = mail($email, $subjectUser, $messageUser, $headersUser);

    if ($mailSentAdmin && $mailSentUser) {
        echo "Votre inscription a bien été prise en compte. Un email de confirmation vous a été envoyé.";
    } else {
        http_response_code(500);
        echo "Erreur lors de l'envoi des emails. Merci de réessayer plus tard.";
    }

} else {
    // Accès direct interdit
    http_response_code(403);
    echo "Accès interdit.";
}
?>
