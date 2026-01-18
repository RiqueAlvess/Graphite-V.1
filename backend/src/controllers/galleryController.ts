import { Request, Response } from 'express'
import { galleryService } from '../services/galleryService'

export const galleryController = {
  async list(req: Request, res: Response) {
    try {
      const { category, search } = req.query

      const items = await galleryService.listGalleryItems(
        category as string | undefined,
        search as string | undefined
      )

      res.json(items)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params

      const item = await galleryService.getGalleryItem(id)

      res.json(item)
    } catch (error: any) {
      if (error.message === 'Item não encontrado') {
        return res.status(404).json({ error: error.message })
      }
      res.status(400).json({ error: error.message })
    }
  },

  async incrementUse(req: Request, res: Response) {
    try {
      const { id } = req.params

      await galleryService.incrementUseCount(id)

      res.json({ success: true })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  },
}
