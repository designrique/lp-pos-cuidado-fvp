import 'ignore-styles'
console.log('Ignore styles loaded - patching require extensions');
import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import cors from 'cors'
import config from './payload.config'

dotenv.config()

const app = express()
// Trust the proxy to ensure secure cookies work correctly behind Netlify
app.set('trust proxy', 1)

// Explicitly serve the uploads directory
const path = require('path')
app.use('/media', express.static(path.join(process.cwd(), 'uploads')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

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
    // Debug log to confirm explicit config usage
    console.log('Starting server with explicit config loading...')

    await payload.init({
        config,
        secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
        express: app,
        onInit: async () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)

            // Auto-seed media on startup if uploads directory is empty
            const fs = require('fs');
            const uploadsDir = path.join(process.cwd(), 'uploads');

            try {
                const filesExist = fs.existsSync(uploadsDir) && fs.readdirSync(uploadsDir).length > 0;

                if (!filesExist) {
                    payload.logger.info('Uploads directory empty, running auto-seed...');
                    let seedContent;
                    try {
                        const module = await import('./seed.js');
                        seedContent = module.seedContent;
                    } catch (e) {
                        const module = await import('./seed.js');
                        seedContent = module.seedContent;
                    }
                    await seedContent(payload);
                    payload.logger.info('Auto-seed completed!');
                } else {
                    payload.logger.info('Uploads directory has files, skipping auto-seed');
                }
            } catch (error) {
                payload.logger.error('Auto-seed failed:', error);
            }
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

    app.get('/api/admin/debug-files', (req, res) => {
        const fs = require('fs');
        const path = require('path');
        const uploadsDir = path.join(process.cwd(), 'uploads');

        try {
            const files = fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir) : 'Directory not found';
            res.json({
                cwd: process.cwd(),
                dirname: __dirname,
                uploadsDir,
                files
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/admin/test-image', (req, res) => {
        const fs = require('fs');
        const path = require('path');
        const testFile = path.join(process.cwd(), 'uploads', 'gaure.jpeg');

        try {
            if (fs.existsSync(testFile)) {
                const fileContent = fs.readFileSync(testFile);
                res.setHeader('Content-Type', 'image/jpeg');
                res.send(fileContent);
            } else {
                res.status(404).json({ error: 'File not found', path: testFile });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    });

    app.get('/api/admin/seed-content', async (req, res) => {
        if (req.query.secret !== process.env.PAYLOAD_SECRET) {
            return res.status(403).json({ error: 'Unauthorized' })
        }
        try {
            const module = await import('./seed.js');
            const result = await module.seedContent(payload)
            res.json(result)
        } catch (error: any) {
            payload.logger.error(error)
            res.status(500).json({ error: error.message })
        }
    })

    const port = process.env.PORT || 3001
    app.listen(port, () => {
        payload.logger.info(`Server running on port ${port}`)
    })
}

start()
