import { GlobalConfig } from 'payload/types'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Configurações do Site',
    admin: {
        description: 'Configurações Gerais do Site',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'contact',
            type: 'group',
            label: 'Contato',
            fields: [
                {
                    name: 'whatsappRequest',
                    type: 'text',
                    label: 'WhatsApp para Agendamento (formato internacional, ex: 5511999999999)',
                },
                {
                    name: 'email',
                    type: 'text',
                    label: 'E-mail de Contato',
                },
            ],
        },
        {
            name: 'social',
            type: 'group',
            label: 'Redes Sociais',
            fields: [
                {
                    name: 'instagram',
                    type: 'text',
                    label: 'URL do Instagram',
                },
                {
                    name: 'youtube',
                    type: 'text',
                    label: 'URL do YouTube',
                },
            ],
        },
        {
            name: 'footer',
            type: 'group',
            label: 'Rodapé',
            fields: [
                {
                    name: 'copyrightText',
                    type: 'text',
                    label: 'Texto de Copyright',
                },
            ],
        },
    ],
}
