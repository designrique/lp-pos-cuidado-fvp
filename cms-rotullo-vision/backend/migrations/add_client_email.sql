-- Migração: Adicionar campo client_email na tabela appointments
-- Data: 05/02/2026

-- Adicionar coluna client_email
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);

-- Verificar se a coluna foi criada
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'appointments' 
AND column_name = 'client_email';
