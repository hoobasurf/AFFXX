<?php
// Config – Adresse e-mail du créateur (où recevoir les inscriptions)
$to = "ton.email@exemple.com"; // À MODIFIER : mets ton adresse e-mail ici

// Sécurité simple : vérifier que les champs attendus sont présents
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['prenom'], $_POST['email'], $_POST['description'], $_POST['salles'])) {
    
    // Récupération des données du formulaire
    $prenom = htmlspecialchars($_POST['prenom']);
    $email = htmlspecialchars($_POST['email']);
    $age = htmlspecialchars($_POST['age']);
    $description = htmlspecialchars($_POST['description']);
    $salles = $_POST['salles'];

    // Formatage de l'e-mail
    $subject = "Nouvelle inscription sur Affinix - $prenom";
    
    $message = "Une nouvelle demande d'inscription a été soumise sur Affinix.\n\n";
    $message .= "👤 Prénom : $prenom\n";
    $message .= "📧 Email : $email\n";
    $message .= "🎂 Âge : $age\n\n";
    $message .= "📝 Description :\n$description\n\n";
    $message .= "🏠 Salles choisies :\n- " . implode("\n- ", $salles) . "\n\n";
    $message .= "---------------------------\n";
    $message .= "💡 Pour activer manuellement ce compte, réponds à cet email ou ajoute-le dans ta base utilisateur.";

    $headers = "From: inscription@affinix.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8";

    // Envoi de l'e-mail
    $mail_sent = mail($to, $subject, $message, $headers);
    
    if ($mail_sent) {
        echo "<!DOCTYPE html>
        <html lang='fr'>
        <head>
            <meta charset='UTF-8'>
            <title>Inscription envoyée</title>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <style>
                body {
                    background: #1a0033;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                }
                .box {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid #aa00ff;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 0 20px #aa00ff99;
                    max-width: 500px;
                    margin: auto;
                }
                a {
                    color: #00ffff;
                    text-decoration: none;
                    display: inline-block;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class='box'>
                <h1>✨ Merci $prenom !</h1>
                <p>Ton inscription a bien été envoyée.</p>
                <p>Tu recevras un email de validation une fois que le créateur aura approuvé ton profil.</p>
                <a href='index.html'>⬅ Retour à l'accueil</a>
            </div>
        </body>
        </html>";
    } else {
        echo "Erreur lors de l'envoi. Réessaie plus tard.";
    }
} else {
    echo "Formulaire incomplet.";
}
?>
