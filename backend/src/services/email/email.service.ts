/**
 * Email Service
 * Handles sending emails (verification codes, notifications, etc.)
 */
import nodemailer from 'nodemailer';
import { logger } from '../../config/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Use SMTP configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    // If SMTP credentials are not configured, use Ethereal Email for testing
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || 
        process.env.SMTP_PASSWORD === 'TU_CONTRASEÑA_DE_APLICACION_AQUI') {
      logger.warn('⚠️ SMTP credentials not configured. Using Ethereal Email for testing.');
      logger.warn('💡 Para producción, configura un servicio profesional: SendGrid, AWS SES, Mailgun, etc.');
      logger.warn('💡 Ver: backend/EMAIL_SERVICES_SETUP.md para más información');
      this.createTestAccount();
      return;
    }

    this.transporter = nodemailer.createTransport(smtpConfig);
    logger.info('✅ Email service initialized with SMTP');
    logger.info(`📧 SMTP Host: ${smtpConfig.host}:${smtpConfig.port}`);
    logger.info(`📧 SMTP User: ${smtpConfig.auth.user}`);
    
    // Verify connection asynchronously (don't block initialization)
    this.transporter.verify()
      .then(() => {
        logger.info('✅ SMTP connection verified successfully');
      })
      .catch((error) => {
        logger.warn('⚠️ SMTP connection verification failed:', error.message);
        logger.warn('⚠️ Email service will still attempt to send emails');
      });
  }

  private async createTestAccount() {
    // For development/testing, use Ethereal Email (creates temporary email accounts)
    try {
      const account = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      logger.info('✅ Email service initialized with Ethereal Email (testing)');
      logger.info(`📧 Test account: ${account.user}`);
      logger.info(`🔑 Password: ${account.pass}`);
      logger.info('🌐 View emails at: https://ethereal.email');
    } catch (err: any) {
      logger.error('Failed to create test email account:', err);
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      if (!this.transporter) {
        logger.error('Email transporter not initialized');
        return false;
      }

      const mailOptions = {
        from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@exury.io',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      };

      const info = await this.transporter.sendMail(mailOptions);

      // If using Ethereal Email, log the preview URL
      if (process.env.NODE_ENV === 'development' && info.messageId) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          logger.info(`📬 Email sent! Preview URL: ${previewUrl}`);
          logger.info(`   👆 Abre este enlace para ver el email enviado a ${options.to}`);
        }
      }

      logger.info(`✅ Email sent successfully to ${options.to}`);
      return true;
    } catch (error: any) {
      logger.error('❌ Error sending email:', error.message);
      logger.error('Error code:', error.code);
      logger.error('Error details:', error);
      
      // If SMTP fails, try to reinitialize with Ethereal
      if (error.code === 'EAUTH' || error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
        logger.warn('⚠️ SMTP connection failed. Check your SMTP credentials in .env');
        logger.warn('⚠️ Make sure SMTP_PASSWORD is set to your actual app password (not the placeholder)');
      }
      
      return false;
    }
  }

  async sendVerificationCode(email: string, code: string): Promise<boolean> {
    const subject = 'Verifica tu correo electrónico - Exury';
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verifica tu correo</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 40px; border-radius: 16px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 12px;">Verifica tu correo</h1>
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 16px; margin-bottom: 32px;">
              Hemos recibido una solicitud para verificar tu correo electrónico en Exury.
            </p>
            
            <div style="background: rgba(28, 186, 117, 0.15); border: 1px solid rgba(28, 186, 117, 0.3); border-radius: 8px; padding: 24px; margin: 32px 0;">
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0 0 12px 0;">Tu código de verificación es:</p>
              <div style="font-size: 32px; font-weight: 700; color: #1cba75; letter-spacing: 4px; font-family: monospace;">
                ${code}
              </div>
            </div>
            
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; margin-top: 32px;">
              Este código expirará en 10 minutos.
            </p>
            <p style="color: rgba(255, 255, 255, 0.5); font-size: 12px; margin-top: 24px;">
              Si no solicitaste este código, puedes ignorar este mensaje.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 24px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Exury. Todos los derechos reservados.</p>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}

export const emailService = new EmailService();

