import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:8080',
        'https://registrese.mapc.com.br',
        'https://mapc.com.br',
        'https://www.mapc.com.br'
    ],
    credentials: true,
}))

const start = async () => {
    await payload.init({
        secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
        },
    })

    // Add custom routes for public API access
    app.get('/api/public/hero', async (req, res) => {
        const data = await payload.find({
            collection: 'hero-section',
            limit: 1,
        })
        res.json(data.docs[0] || null)
    })

    app.get('/api/public/services', async (req, res) => {
        const data = await payload.find({
            collection: 'services',
            where: { isActive: { equals: true } },
            sort: 'order',
        })
        res.json(data.docs)
    })

    app.get('/api/public/testimonials', async (req, res) => {
        const data = await payload.find({
            collection: 'testimonials',
            where: { isActive: { equals: true } },
            sort: 'order',
        })
        res.json(data.docs)
    })

    const port = process.env.PORT || 3001
    app.listen(port, () => {
        payload.logger.info(`Server running on port ${port}`)
    })
}

start()
