<?php

if($_POST) {
    $event = "Join Mailing List";

    $to = "service@atplearning.com";
    $subject = "Mailing List Subscription Sent from ATP Learning Promo-OSH";

    $email = $_POST['email'];

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    // Additl' headers
    $headers .= "From: " . "no-reply@atplearning.com" . "\r\n";
    $headers .= "Reply-To: " . "no-reply@atplearning.com" . "\r\n";

    $message = "<p style=\"font-family: Arial, sans-serif\">Hello,</p>";
    $message .= "<p style=\"font-family: Arial, sans-serif\">Someone has submitted a request to join our mailing list via the <b>ATP Learning Promo - OSH (http://www.atplearningpromo.com/maintenance/OSH/)</b> landing page.</p>";
    $message .= "<p style=\"font-family: Arial, sans-serif\">Email: " . $email ."<br />";

    mail($to, $subject, $message, $headers);

    break;
}

?>

