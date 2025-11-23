/**
 * Winston Logger Configuration
 */
import winston from 'winston';

const logLevel = process.env.LOG_LEVEL || 'info';

// Determine transports based on environment
const transports: winston.transport[] = [];

// Always add console transport (Railway captures console output)
transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
);

// Only add file transports if not in Railway/production (Railway doesn't have writable filesystem)
if (process.env.NODE_ENV === 'development' && typeof process.env.RAILWAY_ENVIRONMENT === 'undefined') {
  transports.push(
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  );
}

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'exury-backend' },
  transports,
});

export default logger;

