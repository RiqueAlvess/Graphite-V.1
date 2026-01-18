import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || '3001',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
}

// Validate required env vars
if (!env.DATABASE_URL && env.NODE_ENV === 'production') {
  throw new Error('DATABASE_URL is required in production')
}

if (env.JWT_SECRET === 'dev-secret-key-change-in-production' && env.NODE_ENV === 'production') {
  throw new Error('Please set a secure JWT_SECRET in production')
}
