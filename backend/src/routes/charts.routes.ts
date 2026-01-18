import { Router } from 'express'
import { chartsController } from '../controllers/chartsController'

const router = Router()

// GET /api/charts - List user's charts
router.get('/', chartsController.list)

// POST /api/charts - Create new chart
router.post('/', chartsController.create)

// GET /api/charts/:id - Get single chart
router.get('/:id', chartsController.get)

// PUT /api/charts/:id - Update chart
router.put('/:id', chartsController.update)

// DELETE /api/charts/:id - Delete chart
router.delete('/:id', chartsController.delete)

// POST /api/charts/:id/publish - Publish to gallery
router.post('/:id/publish', chartsController.publish)

// POST /api/charts/:id/duplicate - Duplicate chart
router.post('/:id/duplicate', chartsController.duplicate)

export default router
