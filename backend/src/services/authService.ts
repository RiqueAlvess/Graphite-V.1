import { prisma } from '../database/prisma'
import { passwordUtils } from '../utils/password'
import { jwtUtils } from '../utils/jwt'

export const authService = {
  async register(email: string, password: string, name?: string) {
    // Validação básica
    if (!email || !password || password.length < 6) {
      throw new Error('Email ou senha inválidos')
    }

    // Check se já existe
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw new Error('Email já registrado')
    }

    // Hash de senha
    const passwordHash = await passwordUtils.hash(password)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        subscriptionPlan: 'free',
        chartsCreatedToday: 0,
        lastChartResetDate: new Date(),
      },
    })

    // Gerar JWT
    const token = jwtUtils.sign({
      userId: user.id,
      email: user.email,
      plan: user.subscriptionPlan,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.subscriptionPlan,
      },
      token,
    }
  },

  async login(email: string, password: string) {
    // Buscar usuário
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    // Validar senha
    const isValid = await passwordUtils.verify(password, user.passwordHash)
    if (!isValid) {
      throw new Error('Credenciais inválidas')
    }

    // Gerar JWT
    const token = jwtUtils.sign({
      userId: user.id,
      email: user.email,
      plan: user.subscriptionPlan,
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.subscriptionPlan,
      },
      token,
    }
  },
}
