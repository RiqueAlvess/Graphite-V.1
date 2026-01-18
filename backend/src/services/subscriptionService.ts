import { prisma } from '../database/prisma'

export const subscriptionService = {
  async validateQuota(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    if (user.subscriptionPlan === 'premium') {
      return { allowed: true, current: 0, limit: -1 }
    }

    // FREE: verificar limite diário
    const today = new Date().toDateString()
    const lastReset = user.lastChartResetDate?.toDateString()

    if (today !== lastReset) {
      // Reset contador
      await prisma.user.update({
        where: { id: userId },
        data: {
          chartsCreatedToday: 0,
          lastChartResetDate: new Date(),
        },
      })

      return { allowed: true, current: 0, limit: 1 }
    }

    const allowed = user.chartsCreatedToday < 1

    return {
      allowed,
      current: user.chartsCreatedToday,
      limit: 1,
    }
  },

  async incrementQuota(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { chartsCreatedToday: { increment: 1 } },
    })
  },
}
