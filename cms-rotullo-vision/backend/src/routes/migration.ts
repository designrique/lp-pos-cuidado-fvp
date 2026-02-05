import express from 'express';
import payload from 'payload';

const router = express.Router();

// Endpoint temporário para executar migração
// IMPORTANTE: Remover após executar a migração!
router.get('/migrate-add-client-email', async (req, res) => {
    try {
        // @ts-ignore - Acessar conexão do banco via Payload
        const db = payload.db.pool;

        console.log('🔧 Executando migração: Adicionar coluna client_email...');

        // Adicionar coluna
        await db.query(`
            ALTER TABLE appointments 
            ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);
        `);

        console.log('✅ Coluna adicionada!');

        // Verificar se foi criada
        const verification = await db.query(`
            SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns 
            WHERE table_name = 'appointments' 
            AND column_name = 'client_email';
        `);

        console.log('🔍 Verificação:', verification.rows);

        res.json({
            success: true,
            message: 'Migração executada com sucesso!',
            column: verification.rows[0] || null
        });

    } catch (error) {
        console.error('❌ Erro na migração:', error);
        res.status(500).json({
            success: false,
            error: (error as Error).message,
            stack: (error as Error).stack
        });
    }
});

export default router;
