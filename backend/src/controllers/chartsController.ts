import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import { chartService } from '../services/chartService'

export const chartsController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const { name, vegaSpec } = req.body
      const userId = req.userId!

      if (!name || !vegaSpec) {
        return res.status(400).json({ error: 'Nome e vegaSpec são obrigatórios' })
      }

      const chart = await chartService.createChart(userId, name, vegaSpec)

      res.status(201).json(chart)
    } catch (error: any) {
      if (error.message.includes('Limite diário')) {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId!

      const charts = await chartService.listUserCharts(userId)

      res.json(charts)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async get(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId!

      const chart = await chartService.getChart(id, userId)

      res.json(chart)
    } catch (error: any) {
      if (error.message === 'Gráfico não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      if (error.message === 'Acesso negado') {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId!
      const { name, vegaSpec } = req.body

      const chart = await chartService.updateChart(id, userId, { name, vegaSpec })

      res.json(chart)
    } catch (error: any) {
      if (error.message === 'Gráfico não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      if (error.message === 'Acesso negado') {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId!

      await chartService.deleteChart(id, userId)

      res.json({ success: true })
    } catch (error: any) {
      if (error.message === 'Gráfico não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      if (error.message === 'Acesso negado') {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async publish(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId!
      const { title, description } = req.body

      if (!title) {
        return res.status(400).json({ error: 'Título é obrigatório' })
      }

      const galleryItem = await chartService.publishToGallery(
        id,
        userId,
        title,
        description
      )

      res.json(galleryItem)
    } catch (error: any) {
      if (error.message === 'Gráfico não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      if (error.message === 'Acesso negado') {
        return res.status(403).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async duplicate(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const userId = req.userId!

      const newChart = await chartService.duplicateChart(id, userId)

      res.status(201).json(newChart)
    } catch (error: any) {
      if (error.message.includes('Limite diário')) {
        return res.status(403).json({ error: error.message })
      }
      if (error.message === 'Gráfico não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },
}
