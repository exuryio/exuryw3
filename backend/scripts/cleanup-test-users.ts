/**
 * Script to cleanup test users from database
 * Usage: tsx scripts/cleanup-test-users.ts [email]
 */
import dotenv from 'dotenv';
import { pool } from '../src/config/database';

dotenv.config();

async function cleanupTestUsers(email?: string) {
  try {
    if (email) {
      // Delete specific user
      const result = await pool.query(
        'DELETE FROM users WHERE email = $1 RETURNING id, email',
        [email.toLowerCase()]
      );
      
      if (result.rows.length > 0) {
        console.log(`✅ Usuario eliminado: ${result.rows[0].email}`);
      } else {
        console.log(`❌ Usuario no encontrado: ${email}`);
      }
    } else {
      // Delete all unverified users
      const result = await pool.query(
        'DELETE FROM users WHERE email_verified = false RETURNING id, email'
      );
      
      console.log(`✅ ${result.rows.length} usuario(s) no verificados eliminados`);
      if (result.rows.length > 0) {
        console.log('Usuarios eliminados:');
        result.rows.forEach(row => {
          console.log(`  - ${row.email}`);
        });
      }
    }
    
    process.exit(0);
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

const email = process.argv[2];
cleanupTestUsers(email);

