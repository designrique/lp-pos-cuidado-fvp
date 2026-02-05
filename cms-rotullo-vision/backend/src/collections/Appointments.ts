import { CollectionConfig } from 'payload/types';
import { afterChangeAppointment } from '../hooks/afterChangeAppointment';

export const Appointments: CollectionConfig = {
    slug: 'appointments',
    labels: {
        singular: 'Agendamento',
        plural: 'Agendamentos',
    },
    admin: {
        useAsTitle: 'clientName',
        defaultColumns: ['date', 'clientName', 'clientEmail', 'serviceName', 'amount', 'status'],
        group: 'Vendas',
    },
    access: {
        read: () => true,
        create: () => true, // Allows n8n to post without auth (simplified) or use API Key
        update: () => true,
        delete: () => true,
    },
    hooks: {
        afterChange: [
            afterChangeAppointment
        ]
    },
    fields: [
        {
            name: 'date',
            type: 'date',
            required: true,
            label: 'Data da Compra',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                }
            }
        },
        {
            name: 'clientName',
            type: 'text',
            required: true,
            label: 'Nome do Cliente',
        },
        {
            name: 'clientEmail',
            type: 'email',
            required: false,
            label: 'Email do Cliente',
            admin: {
                description: 'Email para enviar confirmação de agendamento'
            }
        },
        {
            name: 'serviceName',
            type: 'text',
            required: true,
            label: 'Serviço Contratado',
        },
        {
            name: 'amount',
            type: 'number',
            required: true,
            label: 'Valor (R$)',
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Pago', value: 'paid' },
                { label: 'Pendente', value: 'pending' },
                { label: 'Cancelado', value: 'failed' },
            ],
            defaultValue: 'paid',
            required: true,
            label: 'Status do Pagamento',
        },
        {
            name: 'transactionId',
            type: 'text',
            label: 'ID da Transação (Infinity Pay)',
        },
        {
            name: 'paymentLink',
            type: 'text',
            label: 'Link de Pagamento (Original)',
        },
        {
            name: 'abandonedEmailSent',
            type: 'checkbox',
            label: 'Email de Abandono Enviado',
            admin: {
                readOnly: true,
            }
        }
    ],
};
