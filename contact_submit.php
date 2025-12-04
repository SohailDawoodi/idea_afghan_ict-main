<?php
header("Content-Type: application/json");

require_once  "./mailer.php";

$name    = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (empty($name)||  empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "msg" => "تمام فیلدها الزامی است"]);
    exit;
}

// Email to admin
$adminEmail = "YOUR_EMAIL@gmail.com";
$subjectAdmin = "New Contact Form Message";
$bodyAdmin = "
Name: $name<br>
Email: $email<br>
Message:<br>
$message
";

// Email to user
$subjectUser = "Thank You for Contacting Us";
$bodyUser = "سلام $name,<br>  
پیامت رسید، به زودی پاسخ داده می‌شود.";

// Send to admin
$sendAdmin = sendMail($adminEmail, $subjectAdmin, $bodyAdmin, $email, $name);

// Send to user
$sendUser  = sendMail($email, $subjectUser, $bodyUser);

if ($sendAdmin && $sendUser) {
    echo json_encode(["status" => "success", "msg" => "پیام با موفقیت ارسال شد"]);
} else {
    echo json_encode(["status" => "error", "msg" => "ارسال پیام ناموفق بود"]);
}
?>