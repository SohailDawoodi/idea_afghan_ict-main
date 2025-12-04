<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once  './vendor/autoload.php';

function sendMail($to, $subject, $message, $replyEmail = null, $replyName = null) {
    $mail = new PHPMailer(true);

    try {

        // SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;

       
        $mail->Username   = 'developersohail6@gmail.com';
        $mail->Password   = 'cffk rwul pqtn wkbu';
        // -------------------

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        
        $mail->setFrom('YOUR_EMAIL@gmail.com', 'Website Contact Form');

        $mail->addAddress($to);

        if ($replyEmail !== null) {
            $mail->addReplyTo($replyEmail, $replyName);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = nl2br($message);
        $mail->AltBody = strip_tags($message);

        return $mail->send();

    } catch (Exception $e) {
        return false;
    }
}
?>