import { CollectionConfig } from 'payload/types'

export const FAQ: CollectionConfig = {
    slug: 'faq',
    admin: {
        useAsTitle: 'question',
    },
    labels: {
        singular: 'Pergunta (FAQ)',
        plural: 'Perguntas (FAQ)',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'question',
            type: 'text',
            required: true,
            label: 'Pergunta',
        },
        {
            name: 'answer',
            type: 'textarea',
            required: true,
            label: 'Resposta',
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            label: 'Ordem de Exibição',
        },
    ],
}
