import payload from 'payload';
import https from 'https';
import { getAbandonedCartHtml } from '../emails/templates/abandonedCart';

// Helper de envio (reutilizado do hook, idealmente extrair para service)
const sendEmail = (apiKey: string, to: { email: string; name?: string }[], subject: string, htmlContent: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            sender: { name: 'Instituto Ariana Borges', email: 'nao-responda@arianaborges.com' },
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
            timeout: 10000
        };
        const request = https.request(options, (res) => {
            let responseData = '';
            res.on('data', c => responseData += c);
            res.on('end', () => {
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) resolve(JSON.parse(responseData || '{}'));
                else reject(new Error(`Status ${res.statusCode}: ${responseData}`));
            });
        });
        request.on('error', e => reject(e));
        request.write(data);
        request.end();
    });
};

export const checkAbandonedCarts = async () => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return;

    // Buscar agendamentos pendentes criados há mais de 30 minutos e menos de 24h
    // E que ainda não receberam email de abandono
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const abandonedCarts = await payload.find({
            collection: 'appointments',
            where: {
                and: [
                    { status: { equals: 'pending' } },
                    { createdAt: { less_than: thirtyMinutesAgo.toISOString() } },
                    { createdAt: { greater_than: twentyFourHoursAgo.toISOString() } },
                    { abandonedEmailSent: { not_equals: true } },
                    { clientEmail: { exists: true } }
                ]
            },
            limit: 10
        });

        if (abandonedCarts.totalDocs > 0) {
            payload.logger.info(`[Cron] Encontrados ${abandonedCarts.totalDocs} carrinhos abandonados.`);
        }

        for (const doc of abandonedCarts.docs) {
            if (!doc.clientEmail) continue;

            // Enviar email
            const html = getAbandonedCartHtml({
                clientName: doc.clientName || 'Cliente',
                serviceName: doc.serviceName || 'Atendimento',
                checkoutUrl: doc.paymentLink || 'https://institutoarianaborges.com.br/agendamento'
            });

            try {
                await sendEmail(apiKey, [{ email: doc.clientEmail as string, name: doc.clientName as string }], 'Psiu, não esqueça seu agendamento! ✨', html);

                // Marcar como enviado
                await payload.update({
                    collection: 'appointments',
                    id: doc.id,
                    data: { abandonedEmailSent: true }
                });

                payload.logger.info(`[Cron] Email de abandono enviado para ${doc.clientEmail}`);
            } catch (err) {
                payload.logger.error(`[Cron] Erro ao enviar para ${doc.clientEmail}: ${err}`);
            }
        }
    } catch (error) {
        payload.logger.error(`[Cron] Erro no job de abandono de carrinho: ${error}`);
    }
};
