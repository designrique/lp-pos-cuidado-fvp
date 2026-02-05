import { CollectionAfterChangeHook } from 'payload/types';
import nodemailer from 'nodemailer';

export const afterChangeAppointment: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
    // Só envia email quando um novo agendamento é criado
    if (operation !== 'create') {
        return doc;
    }

    // Só envia se o status for 'paid' (pago)
    if (doc.status !== 'paid') {
        return doc;
    }

    try {
        // Configurar transporter do Brevo SMTP
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const clientName = doc.clientName || 'Cliente';
        const serviceName = doc.serviceName || 'Serviço';
        const amount = doc.amount ? `R$ ${doc.amount.toFixed(2)}` : 'N/A';
        const date = doc.date ? new Date(doc.date).toLocaleString('pt-BR', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'America/Sao_Paulo'
        }) : 'Data a confirmar';

        // Email para Ariana Borges
        const emailToAriana = {
            from: `"Instituto Ariana Borges" <${process.env.SMTP_FROM_EMAIL}>`,
            to: 'institutoarianaborges@gmail.com',
            subject: `🎉 Novo Agendamento: ${serviceName}`,
            html: `
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
                                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🎉 Novo Agendamento Confirmado!</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Body -->
                                    <tr>
                                        <td style="padding: 30px;">
                                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                                Olá, Ariana! 👋
                                            </p>
                                            <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                                Você tem um novo agendamento confirmado e pago através do Infinity Pay.
                                            </p>
                                            
                                            <!-- Detalhes do Agendamento -->
                                            <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; margin: 20px 0;">
                                                <tr>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px;">
                                                        <strong style="color: #667eea;">👤 Cliente:</strong>
                                                    </td>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">
                                                        ${clientName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px;">
                                                        <strong style="color: #667eea;">🌟 Serviço:</strong>
                                                    </td>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">
                                                        ${serviceName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px;">
                                                        <strong style="color: #667eea;">📅 Data:</strong>
                                                    </td>
                                                    <td style="border-bottom: 1px solid #e9ecef; padding: 12px; text-align: right;">
                                                        ${date}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 12px;">
                                                        <strong style="color: #667eea;">💰 Valor:</strong>
                                                    </td>
                                                    <td style="padding: 12px; text-align: right;">
                                                        <span style="color: #28a745; font-weight: bold; font-size: 18px;">${amount}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            ${doc.transactionId ? `
                                            <p style="color: #666666; font-size: 14px; margin: 20px 0 0 0;">
                                                <strong>ID da Transação:</strong> ${doc.transactionId}
                                            </p>
                                            ` : ''}
                                            
                                            <div style="background-color: #e7f3ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 4px;">
                                                <p style="margin: 0; color: #333333; font-size: 14px;">
                                                    💡 <strong>Próximos Passos:</strong><br>
                                                    • Verifique sua agenda no Google Calendar<br>
                                                    • Entre em contato com o cliente para confirmar detalhes<br>
                                                    • Prepare-se para oferecer uma experiência transformadora! ✨
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                                            <p style="color: #666666; font-size: 12px; margin: 0;">
                                                Instituto Ariana Borges - Sistema de Agendamentos<br>
                                                Este é um email automático, não responda.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        };

        // Enviar email para Ariana
        await transporter.sendMail(emailToAriana);

        req.payload.logger.info(`Email de notificação enviado para Ariana sobre agendamento de ${clientName}`);

        // Enviar email de confirmação para o cliente (se tiver email)
        if (doc.clientEmail) {
            const emailToClient = {
                from: `"Instituto Ariana Borges" <${process.env.SMTP_FROM_EMAIL}>`,
                to: doc.clientEmail,
                subject: `✨ Confirmação de Agendamento - ${serviceName}`,
                html: `
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
                                                <p style="color: #ffffff; margin: 0; font-size: 16px; opacity: 0.9;">Sua jornada de transformação começa aqui</p>
                                            </td>
                                        </tr>
                                        
                                        <!-- Body -->
                                        <tr>
                                            <td style="padding: 40px 30px;">
                                                <p style="color: #333333; font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                                                    Olá, <strong>${clientName}</strong>! 🙏
                                                </p>
                                                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                                    É com imensa alegria que confirmamos seu agendamento no Instituto Ariana Borges. Este é o primeiro passo de uma jornada de cura, autoconhecimento e transformação interior.
                                                </p>
                                                
                                                <!-- Detalhes do Agendamento -->
                                                <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; padding: 25px; margin: 30px 0;">
                                                    <h2 style="color: #667eea; margin: 0 0 20px 0; font-size: 20px; text-align: center;">📋 Detalhes do seu Agendamento</h2>
                                                    
                                                    <table width="100%" cellpadding="10" cellspacing="0">
                                                        <tr>
                                                            <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                                                                <span style="color: #667eea; font-size: 24px;">🌟</span>
                                                            </td>
                                                            <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                                                                <strong style="color: #333333;">Serviço:</strong><br>
                                                                <span style="color: #666666;">${serviceName}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                                                                <span style="color: #667eea; font-size: 24px;">📅</span>
                                                            </td>
                                                            <td style="padding: 10px 0; border-bottom: 1px solid #dee2e6;">
                                                                <strong style="color: #333333;">Data e Horário:</strong><br>
                                                                <span style="color: #666666;">${date}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 10px 0;">
                                                                <span style="color: #667eea; font-size: 24px;">💰</span>
                                                            </td>
                                                            <td style="padding: 10px 0;">
                                                                <strong style="color: #333333;">Investimento:</strong><br>
                                                                <span style="color: #28a745; font-weight: bold; font-size: 18px;">${amount}</span>
                                                                <span style="color: #28a745; font-size: 14px;"> ✓ Pago</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                
                                                <!-- Próximos Passos -->
                                                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 4px;">
                                                    <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">💡 Próximos Passos</h3>
                                                    <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.8;">
                                                        <li>Você receberá um convite no Google Calendar (verifique seu email)</li>
                                                        <li>Ariana entrará em contato em breve para confirmar detalhes</li>
                                                        <li>Prepare-se para uma experiência transformadora ✨</li>
                                                    </ul>
                                                </div>
                                                
                                                <!-- Mensagem Inspiradora -->
                                                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                                                    <p style="color: #ffffff; font-size: 16px; line-height: 1.8; margin: 0; font-style: italic;">
                                                        "A jornada de mil milhas começa com um único passo.<br>
                                                        Você acabou de dar esse passo. Parabéns!" 🌟
                                                    </p>
                                                </div>
                                                
                                                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                                                    Estamos ansiosos para te acompanhar nesta jornada de cura e transformação.
                                                </p>
                                                <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0;">
                                                    Com carinho,<br>
                                                    <strong style="color: #667eea;">Ariana Borges e Equipe</strong> 💜
                                                </p>
                                            </td>
                                        </tr>
                                        
                                        <!-- Footer -->
                                        <tr>
                                            <td style="background-color: #f8f9fa; padding: 25px; text-align: center; border-top: 1px solid #e9ecef;">
                                                <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                                                    <strong>Instituto Ariana Borges</strong><br>
                                                    Terapias Holísticas • Autoconhecimento • Transformação Interior
                                                </p>
                                                <p style="color: #999999; font-size: 12px; margin: 10px 0 0 0;">
                                                    Dúvidas? Entre em contato conosco pelo WhatsApp<br>
                                                    Este é um email automático de confirmação.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `,
            };

            await transporter.sendMail(emailToClient);
            req.payload.logger.info(`Email de confirmação enviado para ${doc.clientEmail}`);
        }

    } catch (error) {
        req.payload.logger.error(`Erro ao enviar email de notificação de agendamento: ${error}`);
        // Não falha a operação se o email não for enviado
    }

    return doc;
};
