import nodemailer from 'nodemailer';
import { getDatabaseAsync } from './db';

interface SendEmailParams {
  to: string;
  subject: string;
  otpCode: string;
  purpose: 'transfer' | 'login';
}

export async function sendOtpEmail({ to, subject, otpCode, purpose }: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const db = await getDatabaseAsync();
  const activeAdminEmail = (db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com').trim().toLowerCase();

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER || process.env.SMTP_EMAIL || activeAdminEmail;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    console.warn(`\n======================================================`);
    console.warn(`[OTP EMAIL SECURITY WARNING] SMTP credentials not found in environment.`);
    console.warn(`To send actual emails to Gmail, add SMTP_USER & SMTP_PASS (or GMAIL_APP_PASSWORD) to .env.local.`);
    console.warn(`Purpose: ${purpose.toUpperCase()}`);
    console.warn(`Recipient: ${to}`);
    console.warn(`OTP Verification Code: ${otpCode}`);
    console.warn(`======================================================\n`);
    // Return success true so user flow continues, but code is never exposed in API response
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const isTransfer = purpose === 'transfer';
    const actionText = isTransfer
      ? 'Authorized Google Admin Email Account Transfer'
      : 'Portfolio Admin Login Verification';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #1e293b; border-radius: 12px; background-color: #0f172a; color: #f8fafc;">
        <h2 style="color: #38bdf8; text-align: center; margin-bottom: 20px;">Portfolio Admin Portal</h2>
        <p style="font-size: 14px; color: #cbd5e1;">You requested a <strong>${actionText}</strong>.</p>
        <div style="margin: 25px 0; padding: 15px; background-color: #1e293b; border-radius: 8px; text-align: center;">
          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Your Verification OTP Code</p>
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #38bdf8; font-family: monospace;">${otpCode}</span>
          <p style="font-size: 11px; color: #64748b; margin-top: 8px;">Valid for 10 minutes. Do not share this code with anyone.</p>
        </div>
        <p style="font-size: 12px; color: #64748b; text-align: center;">If you did not request this verification code, please ignore this email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Admin" <${user}>`,
      to,
      subject,
      text: `Your ${actionText} OTP code is: ${otpCode}. Valid for 10 minutes.`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending OTP email via SMTP:', error);
    return { success: false, error: error.message || 'Failed to send email via SMTP' };
  }
}
