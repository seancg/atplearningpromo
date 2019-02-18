<?php

if($_POST) {
    $event = "Join Mailing List";

    $to = "service@atplearning.com";
    $subject = "Mailing List Subscription Sent from ATP Learning Promo-CAP";

    $email = $_POST['email'];
    $referer = $_POST['referer'];

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Additl' headers
    $headers .= "From: " . "no-reply@atplearning.com" . "\r\n";
    $headers .= "Reply-To: " . "no-reply@atplearning.com" . "\r\n";

    $message = "<p style=\"font-family: Arial, sans-serif\">Hello,</p>";
    $message .= "<p style=\"font-family: Arial, sans-serif\">Someone has submitted a request to join our mailing list via the <b>ATP Learning Promo - CAP (http://www.atplearningpromo.com/culinary/CAP/)</b> landing page.</p>";
    $message .= "<p style=\"font-family: Arial, sans-serif\">Email: " . $email ."<br />";
    $message .= "<p style=\"font-family: Arial, sans-serif\">Referer: " . $referer ."<br />";

    mail($to, $subject, $message, $headers);

    break;
}

?>

