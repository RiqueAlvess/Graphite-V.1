import { Router } from 'express'
import authRoutes from './auth.routes'
import chartsRoutes from './charts.routes'
import galleryRoutes from './gallery.routes'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

// Public routes
router.use('/auth', authRoutes)
router.use('/gallery', galleryRoutes)

// Protected routes
router.use('/charts', authMiddleware, chartsRoutes)

export default router
