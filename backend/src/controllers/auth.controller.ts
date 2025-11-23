/**
 * Auth Controller
 * Handles authentication-related API requests
 */
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';
import { pool } from '../config/database';
import { emailService } from '../services/email/email.service';

export class AuthController {
  /**
   * POST /v1/auth/register
   * Register a new user with email
   */
  async register(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email || !/.+@.+\..+/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id, email_verified FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      let userId: string;
      
      if (existingUser.rows.length > 0) {
        const user = existingUser.rows[0];
        
        // If user is already verified, return error
        if (user.email_verified) {
          return res.status(409).json({ error: 'Este correo ya está registrado y verificado. Por favor, inicia sesión.' });
        }
        
        // If user exists but not verified, reuse the user ID and resend code
        userId = user.id;
        logger.info(`User ${email} exists but not verified. Resending verification code.`);
      } else {
        // Create new user (unverified)
        userId = uuidv4();
        await pool.query(
          `INSERT INTO users (id, email, email_verified, created_at, updated_at)
           VALUES ($1, $2, $3, NOW(), NOW())`,
          [userId, email.toLowerCase(), false]
        );
      }

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // User creation is now handled above (either new or existing unverified)

      // Store verification code
      await pool.query(
        `INSERT INTO email_verification_codes (user_id, email, code, expires_at, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (email) DO UPDATE
         SET code = $3, expires_at = $4, created_at = NOW()`,
        [userId, email.toLowerCase(), verificationCode, codeExpiresAt]
      );

      // Send email with verification code
      const emailSent = await emailService.sendVerificationCode(email, verificationCode);
      
      if (!emailSent) {
        logger.warn(`⚠️ Failed to send email to ${email}`);
        logger.warn(`📝 Verification code generated: ${verificationCode}`);
        logger.warn(`💡 Check backend logs for email service errors`);
        logger.warn(`💡 If using Ethereal Email, check the preview URL in logs`);
        
        // Still return success, but log the code for manual verification in development
        if (process.env.NODE_ENV === 'development') {
          logger.info(`🔐 Verification code for ${email}: ${verificationCode}`);
        }
      } else {
        logger.info(`✅ Verification email sent successfully to ${email}`);
      }

      return res.json({
        success: true,
        message: 'Código de verificación enviado',
        // In development, also return code in response for testing
        code: process.env.NODE_ENV === 'development' ? verificationCode : undefined
      });
    } catch (error: any) {
      logger.error('Registration error:', error);
      return res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }

  /**
   * POST /v1/auth/verify-email
   * Verify email with code
   */
  async verifyEmail(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({ error: 'Email y código son requeridos' });
      }

      // Get verification code
      const codeResult = await pool.query(
        `SELECT user_id, code, expires_at
         FROM email_verification_codes
         WHERE email = $1
         ORDER BY created_at DESC
         LIMIT 1`,
        [email.toLowerCase()]
      );

      if (codeResult.rows.length === 0) {
        return res.status(400).json({ error: 'Código no encontrado' });
      }

      const { user_id, code: storedCode, expires_at } = codeResult.rows[0];

      // Check if code is expired
      if (new Date(expires_at) < new Date()) {
        return res.status(400).json({ error: 'Código expirado' });
      }

      // Verify code
      if (storedCode !== code) {
        return res.status(400).json({ error: 'Código inválido' });
      }

      // Mark email as verified
      await pool.query(
        'UPDATE users SET email_verified = $1, updated_at = NOW() WHERE id = $2',
        [true, user_id]
      );

      // Delete used code
      await pool.query(
        'DELETE FROM email_verification_codes WHERE email = $1',
        [email.toLowerCase()]
      );

      // Get user email
      const userResult = await pool.query(
        'SELECT email FROM users WHERE id = $1',
        [user_id]
      );

      res.json({
        success: true,
        message: 'Email verificado correctamente',
        user_id,
        email: userResult.rows[0]?.email || email
      });
    } catch (error: any) {
      logger.error('Email verification error:', error);
      return res.status(500).json({ error: 'Error al verificar email' });
    }
  }

  /**
   * POST /v1/auth/resend-code
   * Resend verification code
   */
  async resendCode(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email || !/.+@.+\..+/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      // Check if user exists
      const userResult = await pool.query(
        'SELECT id, email_verified FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      if (userResult.rows[0].email_verified) {
        return res.status(400).json({ error: 'Email ya verificado' });
      }

      // Generate new code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store verification code
      await pool.query(
        `INSERT INTO email_verification_codes (user_id, email, code, expires_at, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (email) DO UPDATE
         SET code = $3, expires_at = $4, created_at = NOW()`,
        [userResult.rows[0].id, email.toLowerCase(), verificationCode, codeExpiresAt]
      );

      // Send email with verification code
      const emailSent = await emailService.sendVerificationCode(email, verificationCode);
      
      if (!emailSent) {
        logger.warn(`Failed to resend email to ${email}, but code was generated: ${verificationCode}`);
        // Still return success, but log the code for manual verification in development
        if (process.env.NODE_ENV === 'development') {
          logger.info(`Resent verification code for ${email}: ${verificationCode}`);
        }
      }

      return res.json({
        success: true,
        message: 'Código reenviado',
        // In development, also return code in response for testing
        code: process.env.NODE_ENV === 'development' ? verificationCode : undefined
      });
    } catch (error: any) {
      logger.error('Resend code error:', error);
      return res.status(500).json({ error: 'Error al reenviar código' });
    }
  }

  /**
   * POST /v1/auth/auth0/callback
   * Handle Auth0 callback and create/update user
   */
  async handleAuth0Callback(req: Request, res: Response) {
    try {
      const { code } = req.body;

      if (!code) {
        return res.status(400).json({ error: 'Código de autorización requerido' });
      }

      const auth0Domain = process.env.AUTH0_DOMAIN || 'exury.eu.auth0.com';
      const auth0ClientId = process.env.AUTH0_CLIENT_ID || '';
      const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET || '';
      
      // CRITICAL: redirect_uri MUST match exactly what was used in the authorization request
      // It MUST be exactly the same as:
      // 1. What's configured in Auth0 Dashboard → Settings → Allowed Callback URLs
      // 2. What the frontend uses when redirecting to Auth0
      // Use explicit value from env to ensure exact match
      const redirectUri = process.env.AUTH0_REDIRECT_URI || 'http://localhost:5173/auth-callback';
      
      logger.info(`🔐 Processing Auth0 callback`);
      logger.info(`   Domain: ${auth0Domain}`);
      logger.info(`   Client ID: ${auth0ClientId ? '***' + auth0ClientId.slice(-4) : 'NOT SET'}`);
      logger.info(`   Redirect URI: ${redirectUri}`);

      // Exchange code for token
      logger.info(`🔄 Exchanging authorization code for token...`);
      logger.info(`   Code (first 10 chars): ${code.substring(0, 10)}...`);
      logger.info(`   Redirect URI: ${redirectUri}`);
      logger.info(`   Client ID: ${auth0ClientId ? '***' + auth0ClientId.slice(-4) : 'NOT SET'}`);
      
      const tokenResponse = await fetch(`https://${auth0Domain}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: auth0ClientId,
          client_secret: auth0ClientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      logger.info(`📡 Token exchange response status: ${tokenResponse.status}`);

      if (!tokenResponse.ok) {
        const error = await tokenResponse.json().catch(() => ({ error: 'Unknown error' })) as { error?: string; [key: string]: unknown };
        logger.error('❌ Auth0 token exchange error:', error);
        logger.error('   Token response status:', tokenResponse.status);
        logger.error('   Error details:', JSON.stringify(error, null, 2));
        
        // Provide more specific error messages
        let errorMessage = 'Error al intercambiar código por token';
        if (error.error === 'invalid_grant') {
          errorMessage = 'El código de autorización es inválido o ya fue usado. Por favor, intenta iniciar sesión de nuevo.';
        } else if (error.error === 'invalid_client') {
          errorMessage = 'Error de configuración del cliente Auth0.';
        }
        
        return res.status(400).json({ 
          error: errorMessage,
          details: error 
        });
      }

      const tokenData = await tokenResponse.json() as { access_token: string; [key: string]: unknown };
      const { access_token } = tokenData;

      // Get user info from Auth0
      const userInfoResponse = await fetch(`https://${auth0Domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!userInfoResponse.ok) {
        const error = await userInfoResponse.json().catch(() => ({ error: 'Unknown error' })) as { error?: string; [key: string]: unknown };
        logger.error('❌ Auth0 userinfo error:', error);
        logger.error('Userinfo response status:', userInfoResponse.status);
        return res.status(400).json({ 
          error: 'Error al obtener información del usuario',
          details: error 
        });
      }

      const userInfo = await userInfoResponse.json() as { email: string; sub: string; name?: string; [key: string]: unknown };
      const { email, sub: socialId } = userInfo;

      if (!email) {
        return res.status(400).json({ error: 'Email no disponible en la cuenta social' });
      }

      // Determine which social provider based on the sub (ID) format or connection
      // Auth0 sub format: {provider}|{id} (e.g., "google-oauth2|123456" or "apple|123456" or "facebook|123456")
      const subParts = socialId.split('|');
      const provider = subParts[0] || 'unknown';
      
      // Extract provider-specific ID
      const providerId = subParts[1] || socialId;
      
      // Map provider names to database columns
      const providerColumnMap: Record<string, string> = {
        'google-oauth2': 'google_id',
        'apple': 'apple_id',
        'facebook': 'facebook_id',
      };
      
      const providerColumn = providerColumnMap[provider] || 'google_id'; // Default to google_id for backwards compatibility
      
      logger.info(`🔐 Social login provider: ${provider}, ID: ${providerId}`);

      // Check if user exists by email or any social ID
      const existingUser = await pool.query(
        `SELECT id, email_verified, google_id, apple_id, facebook_id 
         FROM users 
         WHERE email = $1 OR google_id = $2 OR apple_id = $2 OR facebook_id = $2`,
        [email.toLowerCase(), providerId]
      );

      let userId: string;

      if (existingUser.rows.length > 0) {
        const user = existingUser.rows[0];
        userId = user.id;
        
        // Check if user is already verified (already registered)
        if (user.email_verified) {
          logger.info(`✅ User already registered and verified: ${email} (${userId})`);
          // User is already registered, just log them in
          // Update social ID if not already set
          const needsUpdate = 
            (providerColumn === 'google_id' && !user.google_id) ||
            (providerColumn === 'apple_id' && !user.apple_id) ||
            (providerColumn === 'facebook_id' && !user.facebook_id);
          
          if (needsUpdate) {
            // Build update query dynamically based on provider
            const updateFields: string[] = [];
            const updateValues: any[] = [];
            let paramIndex = 1;
            
            if (providerColumn === 'google_id' && !user.google_id) {
              updateFields.push(`google_id = $${paramIndex++}`);
              updateValues.push(providerId);
            } else if (providerColumn === 'apple_id' && !user.apple_id) {
              updateFields.push(`apple_id = $${paramIndex++}`);
              updateValues.push(providerId);
            } else if (providerColumn === 'facebook_id' && !user.facebook_id) {
              updateFields.push(`facebook_id = $${paramIndex++}`);
              updateValues.push(providerId);
            }
            
            if (updateFields.length > 0) {
              updateFields.push(`updated_at = NOW()`);
              updateValues.push(userId);
              const whereParamIndex = paramIndex;
              
              await pool.query(
                `UPDATE users 
                 SET ${updateFields.join(', ')}
                 WHERE id = $${whereParamIndex}`,
                updateValues
              );
            }
          }
          
          // Generate JWT token for session management
          const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
          const token = jwt.sign({ userId, email: email.toLowerCase() }, JWT_SECRET, { expiresIn: '7d' });
          
          res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user_id: userId,
            email,
            token,
            already_registered: true
          });
          return;
        }
        
        // User exists but not verified - update and verify
        // Build update query dynamically based on provider
        const updateFields: string[] = [];
        const updateValues: any[] = [];
        let paramIndex = 1;
        
        if (providerColumn === 'google_id') {
          updateFields.push(`google_id = $${paramIndex++}`);
          updateValues.push(providerId);
        } else if (providerColumn === 'apple_id') {
          updateFields.push(`apple_id = $${paramIndex++}`);
          updateValues.push(providerId);
        } else if (providerColumn === 'facebook_id') {
          updateFields.push(`facebook_id = $${paramIndex++}`);
          updateValues.push(providerId);
        }
        
        updateFields.push(`email_verified = $${paramIndex++}`);
        updateValues.push(true);
        updateFields.push(`updated_at = NOW()`);
        
        // Add userId as the last parameter for WHERE clause
        updateValues.push(userId);
        const whereParamIndex = paramIndex;
        
        await pool.query(
          `UPDATE users 
           SET ${updateFields.join(', ')}
           WHERE id = $${whereParamIndex}`,
          updateValues
        );
      } else {
        // Create new user
        userId = uuidv4();
        
        // Build insert query dynamically based on provider
        const insertColumns = ['id', 'email', 'email_verified', 'created_at', 'updated_at'];
        const insertValues: any[] = [userId, email.toLowerCase(), true];
        
        if (providerColumn === 'google_id') {
          insertColumns.push('google_id');
          insertValues.push(providerId);
        } else if (providerColumn === 'apple_id') {
          insertColumns.push('apple_id');
          insertValues.push(providerId);
        } else if (providerColumn === 'facebook_id') {
          insertColumns.push('facebook_id');
          insertValues.push(providerId);
        }
        
        const placeholders = insertValues.map((_, i) => `$${i + 1}`).join(', ');
        
        await pool.query(
          `INSERT INTO users (${insertColumns.join(', ')}, created_at, updated_at)
           VALUES (${placeholders}, NOW(), NOW())`,
          insertValues
        );
      }

      logger.info(`✅ User authenticated via Auth0: ${email} (${userId})`);
      
      // Generate JWT token for session management
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      const token = jwt.sign(
        { userId, email },
        jwtSecret,
        { expiresIn: '7d' }
      );
      
      // Check if user was already registered
      const existingUserCheck = existingUser.rows.length > 0 ? existingUser.rows[0] : null;
      const wasAlreadyRegistered = existingUserCheck?.email_verified || false;
      
      return res.json({
        success: true,
        message: 'Autenticación exitosa',
        user_id: userId,
        email,
        token,
        already_registered: wasAlreadyRegistered
      });
    } catch (error: any) {
      logger.error('❌ Auth0 callback error:', error);
      logger.error('Error stack:', error.stack);
      return res.status(500).json({ 
        error: 'Error al procesar autenticación',
        message: error.message 
      });
    }
  }

  /**
   * POST /v1/auth/login
   * Login with email - sends verification code
   */
  async loginWithEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email || !/.+@.+\..+/.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      // Check if user exists and is verified
      const userResult = await pool.query(
        'SELECT id, email_verified FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ 
          error: 'Usuario no encontrado. Por favor, regístrate primero.' 
        });
      }

      const user = userResult.rows[0];
      
      if (!user.email_verified) {
        return res.status(400).json({ 
          error: 'Email no verificado. Por favor, verifica tu correo primero o regístrate de nuevo.' 
        });
      }

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const codeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store verification code
      await pool.query(
        `INSERT INTO email_verification_codes (user_id, email, code, expires_at, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (email) DO UPDATE
         SET code = $3, expires_at = $4, created_at = NOW()`,
        [user.id, email.toLowerCase(), verificationCode, codeExpiresAt]
      );

      // Send email with verification code
      const emailSent = await emailService.sendVerificationCode(email, verificationCode);
      
      if (!emailSent) {
        logger.warn(`⚠️ Failed to send login email to ${email}`);
        logger.warn(`📝 Verification code generated: ${verificationCode}`);
        
        if (process.env.NODE_ENV === 'development') {
          logger.info(`🔐 Login verification code for ${email}: ${verificationCode}`);
        }
      } else {
        logger.info(`✅ Login verification email sent successfully to ${email}`);
      }

      return res.json({
        success: true,
        message: 'Código de verificación enviado',
        // In development, also return code in response for testing
        code: process.env.NODE_ENV === 'development' ? verificationCode : undefined
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

  /**
   * POST /v1/auth/logout
   * Logout user (clear session on client side)
   */
  async logout(_req: Request, res: Response) {
    try {
      // In a real implementation, you would:
      // 1. Invalidate the token on the server
      // 2. Clear any server-side sessions
      // For now, we just return success and let the client clear localStorage
      
      logger.info('User logged out');
      return res.json({
        success: true,
        message: 'Sesión cerrada exitosamente'
      });
    } catch (error: any) {
      logger.error('Logout error:', error);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  }
}

export const authController = new AuthController();

