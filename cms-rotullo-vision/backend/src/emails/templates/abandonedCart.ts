export const getAbandonedCartHtml = (data: {
    clientName: string;
    serviceName: string;
    checkoutUrl: string;
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
                            <td style="background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); padding: 40px; text-align: center;">
                                <h1 style="color: #fff; margin: 0; font-size: 24px;">Psiu, você esqueceu algo... 👀</h1>
                            </td>
                        </tr>
                        
                        <!-- Body -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="color: #333; font-size: 18px; margin-bottom: 20px;">Olá, <strong>${data.clientName}</strong>!</p>
                                <p style="color: #333; line-height: 1.6;">
                                    Notamos que você iniciou o agendamento de <strong>${data.serviceName}</strong>, mas não concluiu o pagamento.
                                </p>
                                <p style="color: #333; line-height: 1.6;">
                                    Sua jornada de transformação está a um passo de começar. Não deixe para depois o que sua alma pede agora. ✨
                                </p>
                                
                                <div style="text-align: center; margin: 40px 0;">
                                    <a href="${data.checkoutUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                                        Concluir Agendamento Agora ➔
                                    </a>
                                </div>
                                
                                <p style="color: #666; font-size: 14px; text-align: center;">
                                    Se tiver alguma dúvida, pode responder este email.
                                </p>
                            </td>
                        </tr>
                        
                         <!-- Footer -->
                        <tr>
                            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666;">
                                Instituto Ariana Borges
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
