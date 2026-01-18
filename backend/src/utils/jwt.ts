import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export interface JWTPayload {
  userId: string
  email: string
  plan: string
}

export const jwtUtils = {
  sign(payload: JWTPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' })
  },

  verify(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JWTPayload
    } catch {
      return null
    }
  },
}
