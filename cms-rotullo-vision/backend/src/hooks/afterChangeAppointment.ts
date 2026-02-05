import { CollectionAfterChangeHook } from 'payload/types';
import https from 'https';
import { getPaymentConfirmedHtml } from '../emails/templates/paymentConfirmed';
import { getAppointmentConfirmedHtml } from '../emails/templates/appointmentConfirmed';

// Função auxiliar para enviar email via Brevo API (https nativo)
// Mover para um arquivo compartilhado seria ideal, mas mantendo aqui por simplicidade e robustez imediata
const sendEmail = (apiKey: string, to: { email: string; name?: string }[], subject: string, htmlContent: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            sender: {
                name: 'Instituto Ariana Borges',
                email: 'nao-responda@arianaborges.com'
            },
            to: to,
            subject: subject,
            htmlContent: htmlContent
        });

        const options = {
            hostname: 'api.brevo.com',
            port: 443,
            path: '/v3/smtp/email',
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(data)
            },
            timeout: 10000 // 10s timeout
        };

        const request = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(responseData || '{}'));
                } else {
                    reject(new Error(`Status ${res.statusCode}: ${responseData}`));
                }
            });
        });

        request.on('error', (e) => {
            reject(new Error(`Erro de conexão: ${e.message}`));
        });

        request.on('timeout', () => {
            request.destroy();
            reject(new Error('Timeout na conexão com Brevo (10s)'));
        });

        request.write(data);
        request.end();
    });
};

export const afterChangeAppointment: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
    // Só envia email quando um novo agendamento é criado ou atualizado para 'paid'
    // Mas para simplificar, vamos focar no create ou update para 'paid'
    const isNew = operation === 'create';
    const isPaid = doc.status === 'paid';

    // Se não for pago, não enviamos email de confirmação principal
    // (O cron de abandono cuidará dos pendentes)
    if (!isPaid) {
        return doc;
    }

    // Evitar reenvio em updates leves (poderíamos checar previousDoc, mas vamos simplificar assumindo que qualquer save 'paid' é relevante)
    // TODO: Num futuro, verificar se o status mudou.

    req.payload.logger.info(`[Email] Iniciando notificação para agendamento ${doc.id}`);

    try {
        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            req.payload.logger.error('[Email] BREVO_API_KEY não configurada');
            return doc;
        }

        const clientName = doc.clientName || 'Cliente';
        const serviceName = doc.serviceName || 'Serviço';
        const amount = doc.amount ? `R$ ${doc.amount.toFixed(2)}` : 'N/A';
        const date = doc.date ? new Date(doc.date).toLocaleString('pt-BR', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Sao_Paulo'
        }) : 'Data a confirmar';

        // 1. Email para Ariana (Notificação de Pagamento Recebido / Novo Agendamento)
        const htmlToAriana = getPaymentConfirmedHtml({
            clientName,
            serviceName,
            date,
            amount,
            transactionId: doc.transactionId
        });

        await sendEmail(
            apiKey,
            [{ email: 'institutoarianaborges@gmail.com', name: 'Ariana Borges' }],
            `🎉 Novo Agendamento: ${serviceName}`,
            htmlToAriana
        );
        req.payload.logger.info(`[Email] Sucesso envio Ariana: ${clientName}`);

        // 2. Email para Cliente (Confirmação)
        if (doc.clientEmail) {
            const htmlToClient = getAppointmentConfirmedHtml({
                clientName,
                serviceName,
                date,
                amount
            });

            await sendEmail(
                apiKey,
                [{ email: doc.clientEmail, name: clientName }],
                `✨ Confirmação de Agendamento - ${serviceName}`,
                htmlToClient
            );
            req.payload.logger.info(`[Email] Sucesso envio Cliente: ${doc.clientEmail}`);
        }

    } catch (error) {
        req.payload.logger.error(`[Email] ERRO FINAL: ${error}`);
        // Não falha a transação se o email falhar
    }

    return doc;
};
