const escapeHtml = (value: unknown): string =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const verificationEmailTemplate = (
  email: string,
  otp: string | number,
): string => {
  const safeEmail = escapeHtml(email);
  const safeOtp = escapeHtml(otp);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#1f2937;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <div style="background:#0f766e;color:#ffffff;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:26px;">Verify your email</h1>
    </div>
    <div style="padding:28px;line-height:1.6;">
      <p style="margin-top:0;">Hello ${safeEmail},</p>
      <p>Use this OTP code to verify your account:</p>
      <div style="font-size:30px;font-weight:700;letter-spacing:6px;text-align:center;background:#ecfeff;border:1px solid #99f6e4;color:#115e59;border-radius:8px;padding:18px;margin:24px 0;">
        ${safeOtp}
      </div>
      <p>This OTP is valid for 10 minutes. If you did not request this, you can ignore this email.</p>
    </div>
    <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
      Tour Management System
    </div>
  </div>
</body>
</html>
`;
};

export const Verification_Email_Template = verificationEmailTemplate;
