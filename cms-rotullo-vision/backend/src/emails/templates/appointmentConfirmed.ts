export const getAppointmentConfirmedHtml = (data: {
    clientName: string;
    serviceName: string;
    date: string;
    amount: string;
}) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 28px;">✨ Agendamento Confirmado!</h1>
                                <p style="color: #ffffff; margin: 0; font-size: 16px; opacity: 0.9;">Sua jornada começa agora.</p>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="color: #333; font-size: 18px; margin-bottom: 20px;">Olá, <strong>${data.clientName}</strong>! 🙏</p>
                                <p style="color: #333; line-height: 1.6;">Seu agendamento foi confirmado com sucesso. Estamos muito felizes em recebê-lo(a).</p>
                                
                                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin: 30px 0;">
                                    <table width="100%" cellpadding="5">
                                        <tr>
                                            <td style="color: #667eea;"><strong>Serviço:</strong></td>
                                            <td>${data.serviceName}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #667eea;"><strong>Data:</strong></td>
                                            <td>${data.date}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #667eea;"><strong>Investimento:</strong></td>
                                            <td>${data.amount} (Pago)</td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px;">
                                    <p style="margin: 0; color: #856404; font-size: 14px;">
                                        💡 Verifique seu email para o convite do Google Calendar.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                                Instituto Ariana Borges • Terapias Holísticas
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};
