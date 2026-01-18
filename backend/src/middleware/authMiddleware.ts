import { Request, Response, NextFunction } from 'express'
import { jwtUtils } from '../utils/jwt'

export interface AuthRequest extends Request {
  userId?: string
  userPlan?: string
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }

    const decoded = jwtUtils.verify(token)

    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido ou expirado' })
    }

    req.userId = decoded.userId
    req.userPlan = decoded.plan

    next()
  } catch (error) {
    res.status(401).json({ error: 'Erro de autenticação' })
  }
}
