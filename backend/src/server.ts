import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env'
import { corsOptions } from './config/cors'
import routes from './routes'
import errorHandler from './middleware/errorHandler'

const app = express()

// Security & Middleware
app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: env.NODE_ENV,
  })
})

// API Routes
app.use('/api', routes)

// Error handling
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = env.PORT

app.listen(PORT, () => {
  console.log('🚀 Vega Editor Backend')
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`✅ Environment: ${env.NODE_ENV}`)
  console.log(`✅ Health check: http://localhost:${PORT}/health`)
})

export default app
