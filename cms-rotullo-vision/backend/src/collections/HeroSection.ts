import { CollectionConfig } from 'payload/types'

export const HeroSection: CollectionConfig = {
    slug: 'hero-section',
    admin: {
        useAsTitle: 'title',
        description: 'Conteúdo da seção Hero da landing page',
    },
    labels: {
        singular: 'Seção Hero',
        plural: 'Seções Hero',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título Principal',
        },
        {
            name: 'subtitle',
            type: 'textarea',
            label: 'Subtítulo',
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Imagem de Fundo',
        },
        {
            name: 'ctaButtonText',
            type: 'text',
            defaultValue: 'Solicitar Orçamento Gratuito',
            label: 'Texto do Botão CTA',
        },
        {
            name: 'stats',
            type: 'array',
            label: 'Estatísticas',
            minRows: 0,
            maxRows: 4,
            fields: [
                {
                    name: 'icon',
                    type: 'text',
                    label: 'Emoji/Ícone',
                },
                {
                    name: 'value',
                    type: 'text',
                    required: true,
                    label: 'Valor (ex: 3320+)',
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Legenda (ex: Marcas Registradas)',
                },
            ],
        },
        {
            name: 'benefits',
            type: 'array',
            label: 'Lista de Benefícios',
            minRows: 0,
            maxRows: 6,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    label: 'Título do Benefício',
                },
                {
                    name: 'description',
                    type: 'text',
                    label: 'Descrição',
                },
            ],
        },
    ],
}
