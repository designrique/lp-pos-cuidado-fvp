import dotenv from 'dotenv'
dotenv.config()
import 'ignore-styles'
console.log('Ignore styles loaded - patching require extensions');
import express from 'express'
import payload from 'payload'
import cors from 'cors'
import config from './payload.config'

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
                    // await seedContent(payload);
                    payload.logger.info('Auto-seed disabled for stability.');
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

    // ENDPOINT TEMPORÁRIO: Executar migração de banco de dados
    // REMOVER APÓS EXECUTAR!
    // CRON JOB: Verificar carrinhos abandonados a cada 10 minutos
    const cron = require('node-cron');
    const { checkAbandonedCarts } = require('./cron/checkAbandonedCarts'); // O path relativo pode mudar no dist, cuidado

    // Importar dinamicamente para garantir que o payload esteja pronto (embora aqui já esteja)
    // No build, o path muda. Em dev (ts-node) é ./cron/checkAbandonedCarts.ts.
    // Melhor importar no topo se possível, mas aqui vamos usar require para garantir execução

    // Agendamento: a cada 10 minutos
    cron.schedule('*/10 * * * *', async () => {
        try {
            payload.logger.info('🕒 Executando Cron Job: checkAbandonedCarts');
            // Como checkAbandonedCarts é exportado como module, precisamos pegar a função
            // Se estivermos usando 'import' no topo, seria melhor. 
            // Mas vamos assumir que o require funcione se o arquivo for compilado corretamente.
            // Para evitar problemas de caminho no dist/, vamos ser defensivos.
            // NOTA: O arquivo checkAbandonedCarts.ts deve ser compilado.
            await checkAbandonedCarts();
        } catch (err) {
            payload.logger.error('Erro no Cron:', err);
        }
    });

    // ENDPOINT DE DIAGNÓSTICO: Testar conexão com Brevo (HTTPS nativo)
    app.get('/api/debug/brevo', (req, res) => {
        const https = require('https');
        const apiKey = process.env.BREVO_API_KEY || '';

        if (!apiKey) {
            return res.status(500).json({ error: 'BREVO_API_KEY não configurada' });
        }

        const options = {
            hostname: 'api.brevo.com',
            port: 443,
            path: '/v3/account',
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey
            },
            timeout: 10000 // 10s
        };

        const request = https.request(options, (response) => {
            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => {
                try {
                    const json = JSON.parse(data || '{}');
                    res.json({
                        status: response.statusCode,
                        data: json,
                        env_key_start: apiKey.substring(0, 5) + '...'
                    });
                } catch (e) {
                    res.status(500).json({ error: 'Erro ao fazer parse da resposta', raw: data });
                }
            });
        });

        request.on('error', (e) => {
            res.status(500).json({ error: e.message });
        });

        request.on('timeout', () => {
            request.destroy();
            res.status(504).json({ error: 'Timeout de conexão com Brevo' });
        });

        request.end();
    });

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
    app.listen(Number(port), '0.0.0.0', () => {
        payload.logger.info(`Server running on port ${port}`)
    })
}

start()
