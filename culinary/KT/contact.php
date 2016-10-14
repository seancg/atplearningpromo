<?php
/*
 * ShapingRain Contact Form Handler
 * (c) 2012 ShapingRain, All rights reserved!
 * http://www.shapingrain.com
 */

function get_settings($in)
{
    if (is_file($in))
        return include $in;
    return false;
}

function get_real_ip()
{
    if (isset($_SERVER["HTTP_CLIENT_IP"])) {
        return $_SERVER["HTTP_CLIENT_IP"];
    } elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
        return $_SERVER["HTTP_X_FORWARDED_FOR"];
    } elseif (isset($_SERVER["HTTP_X_FORWARDED"])) {
        return $_SERVER["HTTP_X_FORWARDED"];
    } elseif (isset($_SERVER["HTTP_FORWARDED_FOR"])) {
        return $_SERVER["HTTP_FORWARDED_FOR"];
    } elseif (isset($_SERVER["HTTP_FORWARDED"])) {
        return $_SERVER["HTTP_FORWARDED"];
    } else {
        return $_SERVER["REMOTE_ADDR"];
    }
}

$settings = get_settings("site.settings.php");

parse_str($_POST["data"], $_POST);

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(!empty($name) && !empty($email) && !empty($message))
{
    //echo "Hi";
    //echo json_encode($data);
    $headers = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/plain; charset=iso-8859-1";
    $headers[] = "From: " . trim($_POST['name']) . " <" . trim($_POST['email']) . ">";
    $headers[] = "X-Mailer: ShapingRain FormMailer on PHP/" . phpversion();
    $recipient = $settings['request_form_email'];
            
    $subject   = "Message sent through your contact form.";
    $message   = strip_tags(stripslashes($_POST['message']));
            
    mail($recipient, $subject, $message, implode("\r\n", $headers));

    echo "Message Sent Sucessfully";
}

?>
