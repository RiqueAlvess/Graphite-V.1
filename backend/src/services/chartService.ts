import { prisma } from '../database/prisma'
import { subscriptionService } from './subscriptionService'

export const chartService = {
  async createChart(userId: string, name: string, vegaSpec: any) {
    // Validar limite diário (se FREE)
    const quota = await subscriptionService.validateQuota(userId)

    if (!quota.allowed) {
      throw new Error(
        'Limite diário atingido (1 gráfico/dia). Upgrade para Premium!'
      )
    }

    // Criar gráfico
    const chart = await prisma.visualConfig.create({
      data: {
        name,
        vegaSpec,
        chartType: vegaSpec.mark?.type || vegaSpec.mark || 'bar',
        userId,
        isPublic: false,
      },
    })

    // Incrementar contador se FREE
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user && user.subscriptionPlan === 'free') {
      await subscriptionService.incrementQuota(userId)
    }

    // Log atividade
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'CREATE_CHART',
        description: `Created chart: ${name}`,
        metadata: { chartId: chart.id },
      },
    })

    return chart
  },

  async listUserCharts(userId: string) {
    return await prisma.visualConfig.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    })
  },

  async getChart(chartId: string, userId: string) {
    const chart = await prisma.visualConfig.findUnique({
      where: { id: chartId },
    })

    if (!chart) throw new Error('Gráfico não encontrado')
    if (chart.userId !== userId && !chart.isPublic) {
      throw new Error('Acesso negado')
    }

    return chart
  },

  async updateChart(chartId: string, userId: string, updates: { name?: string; vegaSpec?: any }) {
    const chart = await prisma.visualConfig.findUnique({
      where: { id: chartId },
    })

    if (!chart) throw new Error('Gráfico não encontrado')
    if (chart.userId !== userId) throw new Error('Acesso negado')

    return await prisma.visualConfig.update({
      where: { id: chartId },
      data: {
        ...(updates.name && { name: updates.name }),
        ...(updates.vegaSpec && {
          vegaSpec: updates.vegaSpec,
          chartType: updates.vegaSpec.mark?.type || updates.vegaSpec.mark || 'bar',
        }),
      },
    })
  },

  async deleteChart(chartId: string, userId: string) {
    const chart = await prisma.visualConfig.findUnique({
      where: { id: chartId },
    })

    if (!chart) throw new Error('Gráfico não encontrado')
    if (chart.userId !== userId) throw new Error('Acesso negado')

    // Se está na galeria, deletar também
    if (chart.publishedToGallery) {
      await prisma.galleryItem.deleteMany({
        where: { visualConfigId: chartId },
      })
    }

    await prisma.visualConfig.delete({
      where: { id: chartId },
    })

    return { success: true }
  },

  async publishToGallery(
    chartId: string,
    userId: string,
    title: string,
    description?: string
  ) {
    const chart = await prisma.visualConfig.findUnique({
      where: { id: chartId },
    })

    if (!chart) throw new Error('Gráfico não encontrado')
    if (chart.userId !== userId) throw new Error('Acesso negado')

    // Atualizar chart
    await prisma.visualConfig.update({
      where: { id: chartId },
      data: { publishedToGallery: true },
    })

    // Criar item na galeria
    const galleryItem = await prisma.galleryItem.create({
      data: {
        title,
        description,
        visualConfigId: chartId,
        creatorId: userId,
        category: 'user-created',
      },
    })

    return galleryItem
  },

  async duplicateChart(chartId: string, userId: string) {
    const chart = await prisma.visualConfig.findUnique({
      where: { id: chartId },
    })

    if (!chart) throw new Error('Gráfico não encontrado')

    // Validar quota antes de duplicar
    const quota = await subscriptionService.validateQuota(userId)
    if (!quota.allowed) {
      throw new Error(
        'Limite diário atingido (1 gráfico/dia). Upgrade para Premium!'
      )
    }

    const newChart = await prisma.visualConfig.create({
      data: {
        name: `${chart.name} (cópia)`,
        description: chart.description,
        vegaSpec: chart.vegaSpec,
        chartType: chart.chartType,
        userId,
        isPublic: false,
      },
    })

    // Incrementar contador se FREE
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (user && user.subscriptionPlan === 'free') {
      await subscriptionService.incrementQuota(userId)
    }

    return newChart
  },
}
