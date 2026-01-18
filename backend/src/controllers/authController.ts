import { Request, Response } from 'express'
import { authService } from '../services/authService'

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' })
      }

      const result = await authService.register(email, password, name)

      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' })
      }

      const result = await authService.login(email, password)

      res.json(result)
    } catch (error: any) {
      res.status(401).json({ error: error.message })
    }
  },
}
