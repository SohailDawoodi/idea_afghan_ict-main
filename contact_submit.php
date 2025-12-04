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

$adminEmail = "developersohail6@gmail.com";
$subjectAdmin = "New Contact Form Message";

$bodyAdmin = '
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
                            <h1 style="margin: 0; font-size: 24px;">پیام جدید از فرم تماس</h1>
                            <p style="margin: 10px 0 0; opacity: 0.9;">' . date('Y/m/d H:i') . '</p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-bottom: 20px; border-bottom: 1px solid #eee;">
                                        <strong style="color: #333;">👤 نام:</strong><br>
                                        <span style="color: #666; font-size: 16px;">' . htmlspecialchars($name) . '</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 0; border-bottom: 1px solid #eee;">
                                        <strong style="color: #333;">📧 ایمیل:</strong><br>
                                        <span style="color: #666; font-size: 16px;">' . htmlspecialchars($email) . '</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 20px;">
                                        <strong style="color: #333;">📝 پیام:</strong><br>
                                        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; border-right: 4px solid #667eea;">
                                            <span style="color: #444; line-height: 1.6;">' . nl2br(htmlspecialchars($message)) . '</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- فوتر -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                            این ایمیل به صورت خودکار از فرم تماس وب‌سایت ارسال شده است
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
';

// ایمیل کاربر
$subjectUser = "سپاس از تماس شما";

$bodyUser = '
<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <!-- هدر -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1abc9c 0%, #3498db 100%); padding: 40px 30px; text-align: center; color: white;">
                            <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
                            <h1 style="margin: 0; font-size: 26px;">پیام شما با موفقیت ارسال شد</h1>
                        </td>
                    </tr>
                    
                    <!-- محتوا -->
                    <tr>
                        <td style="padding: 30px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 30px;">
                                        <p style="color: #333; font-size: 18px; margin: 0 0 15px;">
                                            سلام <strong style="color: #1abc9c;">' . htmlspecialchars($name) . '</strong> عزیز،
                                        </p>
                                        <p style="color: #666; line-height: 1.6; margin: 0;">
                                            از اینکه با ما تماس گرفتید سپاسگزاریم.<br>
                                            پیام شما دریافت شد و در اسرع وقت بررسی خواهد شد.
                                        </p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-right: 4px solid #1abc9c;">
                                        <p style="color: #666; line-height: 1.6; margin: 0;">
                                            <strong>📅 تاریخ ارسال:</strong> ' . date('Y/m/d') . '<br>
                                            <strong>⏰ ساعت ارسال:</strong> ' . date('H:i') . '
                                        </p>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding-top: 30px; text-align: center;">
                                        <p style="color: #666; line-height: 1.6; margin: 0 0 20px;">
                                            معمولاً طی <strong>۲۴ تا ۴۸ ساعت کاری</strong> پاسخ شما را ارسال خواهیم کرد.
                                        </p>
                                        <div style="background-color: #e8f6f3; padding: 15px; border-radius: 5px; border: 1px dashed #1abc9c;">
                                            <p style="color: #666; font-size: 14px; margin: 0;">
                                                💡 <strong>توجه:</strong> این ایمیل به صورت خودکار ارسال شده است.<br>
                                                لطفاً به این آدرس پاسخ ندهید.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee; color: #666; font-size: 14px;">
                            © ' . date('Y') . ' - تمامی حقوق محفوظ است
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
';

// ارسال ایمیل‌ها
$sendAdmin = sendMail($adminEmail, $subjectAdmin, $bodyAdmin, $email, $name);
$sendUser  = sendMail($email, $subjectUser, $bodyUser);

if ($sendAdmin && $sendUser) {
    echo json_encode(["status" => "success", "msg" => "پیام با موفقیت ارسال شد"]);
} else {
    echo json_encode(["status" => "error", "msg" => "ارسال پیام ناموفق بود"]);
}
?>