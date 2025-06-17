<?php
$to = "ton@email.com"; // ← Mets ton email ici
$subject = "✅ Nouvelle inscription validée - AFFINIX";
$message = "Nom : $nom\nEmail : $email\nSalles : $salles\n";
$headers = "From: no-reply@affinix.com";

mail($to, $subject, $message, $headers);
