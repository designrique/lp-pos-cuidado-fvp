// Script para executar migração no banco de dados via Railway
const { Client } = require('pg');

async function runMigration() {
    const client = new Client({
        connectionString: process.env.DATABASE_URI,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('🔌 Conectando ao banco de dados...');
        await client.connect();
        console.log('✅ Conectado!');

        console.log('\n📝 Executando migração: Adicionar coluna client_email...');

        const result = await client.query(`
            ALTER TABLE appointments 
            ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);
        `);

        console.log('✅ Migração executada com sucesso!');

        console.log('\n🔍 Verificando se a coluna foi criada...');
        const verification = await client.query(`
            SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns 
            WHERE table_name = 'appointments' 
            AND column_name = 'client_email';
        `);

        if (verification.rows.length > 0) {
            console.log('✅ Coluna client_email encontrada:');
            console.log(verification.rows[0]);
        } else {
            console.log('❌ Coluna client_email não foi criada');
        }

        console.log('\n📊 Estrutura atual da tabela appointments:');
        const structure = await client.query(`
            SELECT column_name, data_type, character_maximum_length, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'appointments'
            ORDER BY ordinal_position;
        `);

        console.table(structure.rows);

    } catch (error) {
        console.error('❌ Erro ao executar migração:', error.message);
        process.exit(1);
    } finally {
        await client.end();
        console.log('\n🔌 Conexão encerrada.');
    }
}

runMigration();
