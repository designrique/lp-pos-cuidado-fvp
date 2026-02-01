import { CollectionConfig } from 'payload/types'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        description: 'Serviços oferecidos pela MAPC',
        defaultColumns: ['title', 'cta', 'isActive'],
    },
    labels: {
        singular: 'Serviço',
        plural: 'Serviços',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'icon',
            type: 'select',
            label: 'Ícone',
            options: [
                { label: '👤 Check (UserCheck)', value: 'UserCheck' },
                { label: '🎓 Capelo (GraduationCap)', value: 'GraduationCap' },
                { label: '👥 Grupo (Users)', value: 'Users' },
                { label: '🛡️ Escudo (ShieldCheck)', value: 'ShieldCheck' },
                { label: '💡 Lâmpada (Lightbulb)', value: 'Lightbulb' },
                { label: '📄 Documento (FileText)', value: 'FileText' },
                { label: '🔍 Busca (Search)', value: 'Search' },
                { label: '⏰ Relógio (Clock)', value: 'Clock' },
            ],
        },
        {
            name: 'link',
            type: 'text',
            label: 'Link de Redirecionamento',
        },
        {
            name: 'cta',
            type: 'text',
            defaultValue: 'Saiba mais',
            label: 'Texto do Botão (CTA)',
        },
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título do Serviço',
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            label: 'Descrição',
        },
        {
            name: 'features',
            type: 'array',
            label: 'Features/Características',
            minRows: 1,
            maxRows: 6,
            fields: [
                {
                    name: 'feature',
                    type: 'text',
                    required: true,
                    label: 'Feature',
                },
            ],
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            label: 'Ordem de Exibição',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
            label: 'Ativo',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
