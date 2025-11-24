/**
 * Exury Backend Server
 * Main entry point for the API
 */
console.log('🔧 Starting server initialization...');

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './config/logger';
import routes from './routes';

console.log('✅ All imports loaded');

dotenv.config();
console.log('✅ Environment variables loaded');

const app: Express = express();
// Railway automatically sets PORT, but we need to listen on 0.0.0.0 for Railway
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const API_VERSION = process.env.API_VERSION || 'v1';
console.log(`📋 Configuration: PORT=${PORT}, HOST=${HOST}, API_VERSION=${API_VERSION}`);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('✅ Middleware configured');

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    method: req.method,
    path: req.path,
    ip: req.ip,
  });
  next();
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'exury-backend',
  });
});
console.log('✅ Health check route configured');

// API routes
app.use(`/${API_VERSION}`, routes);
console.log('✅ API routes configured');

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
  });

  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});
console.log('✅ Error handlers configured');

// Handle uncaught errors BEFORE starting server
process.on('uncaughtException', (error: Error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('❌ Unhandled Rejection:', reason);
  logger.error('Unhandled Rejection', { reason: String(reason) });
  process.exit(1);
});

// Start server with error handling
console.log('🚀 Attempting to start server...');
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Exury Backend API running on ${HOST}:${PORT}`);
  console.log(`📡 API Version: ${API_VERSION}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Accessible at: http://${HOST}:${PORT}`);
  logger.info(`🚀 Exury Backend API running on ${HOST}:${PORT}`);
  logger.info(`📡 API Version: ${API_VERSION}`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle server errors
server.on('error', (error: NodeJS.ErrnoException) => {
  console.error('❌ Server error:', error);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
  logger.error('Server error', { error: error.message, stack: error.stack, code: error.code });
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  }
  process.exit(1);
});

export default app;
