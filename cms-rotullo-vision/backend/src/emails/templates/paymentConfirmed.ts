export const getPaymentConfirmedHtml = (data: {
    clientName: string;
    serviceName: string;
    date: string;
    amount: string;
    transactionId?: string;
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
                            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Pagamento Confirmado!</h1>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="padding: 30px;">
                                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                    Olá, Ariana! 👋
                                </p>
                                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                    Um novo pagamento foi confirmado com sucesso.
                                </p>
                                
                                <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin: 20px 0;">
                                    <tr>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px;"><strong>👤 Cliente:</strong></td>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">${data.clientName}</td>
                                    </tr>
                                    <tr>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px;"><strong>🌟 Serviço:</strong></td>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">${data.serviceName}</td>
                                    </tr>
                                    <tr>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px;"><strong>📅 Data:</strong></td>
                                        <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">${data.date}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px;"><strong>💰 Valor:</strong></td>
                                        <td style="padding: 12px; text-align: right;"><span style="color: #28a745; font-weight: bold;">${data.amount}</span></td>
                                    </tr>
                                </table>
                                
                                ${data.transactionId ? `<p style="color: #666; font-size: 14px;">Transaction ID: ${data.transactionId}</p>` : ''}
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
