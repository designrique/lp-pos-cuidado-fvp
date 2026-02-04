import { CollectionConfig } from 'payload/types'
import { afterChangeCampaign } from '../hooks/afterChangeCampaign'

export const Campaigns: CollectionConfig = {
    slug: 'campaigns',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Campanha',
        plural: 'Campanhas',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome da Campanha',
        },
        {
            name: 'subject',
            type: 'text',
            required: true,
            label: 'Assunto',
        },
        {
            name: 'senderName',
            type: 'text',
            required: true,
            label: 'Nome do Remetente',
            defaultValue: 'Instituto Ariana Borges',
        },
        {
            name: 'senderEmail',
            type: 'text',
            required: true,
            label: 'E-mail do Remetente',
            defaultValue: 'contato@institutoarianaborges.com.br',
        },
        {
            name: 'type',
            type: 'select',
            options: [
                { label: 'Clássica', value: 'classic' },
            ],
            defaultValue: 'classic',
            required: true,
        },
        {
            name: 'htmlContent',
            type: 'textarea',
            required: true,
            label: 'Conteúdo HTML',
        },
        {
            name: 'listIds',
            type: 'array',
            label: 'Lista de IDs de Destinatários',
            fields: [
                {
                    name: 'listId',
                    type: 'number',
                    required: true,
                }
            ],
            required: true,
        },
        {
            name: 'scheduledAt',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            label: 'Data de Agendamento',
        },
        {
            name: 'sendNow',
            type: 'checkbox',
            label: 'Enviar e-mail para o Brevo após salvar?',
            defaultValue: false,
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'brevoCampaignId',
            type: 'number',
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
            label: 'ID da Campanha no Brevo'
        },
    ],
    hooks: {
        afterChange: [
            afterChangeCampaign
        ]
    }
}
