import { Router } from 'express'
import { galleryController } from '../controllers/galleryController'

const router = Router()

// GET /api/gallery - List gallery items
router.get('/', galleryController.list)

// GET /api/gallery/:id - Get gallery item
router.get('/:id', galleryController.get)

// POST /api/gallery/:id/use - Increment use count
router.post('/:id/use', galleryController.incrementUse)

export default router
