import { CollectionConfig } from 'payload/types'

export const Testimonials: CollectionConfig = {
    slug: 'testimonials',
    admin: {
        useAsTitle: 'name',
        description: 'Depoimentos de clientes da MAPC',
        defaultColumns: ['name', 'company', 'rating', 'isActive'],
    },
    labels: {
        singular: 'Depoimento',
        plural: 'Depoimentos',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome do Cliente',
        },
        {
            name: 'company',
            type: 'text',
            label: 'Empresa',
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
            label: 'Depoimento',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            label: 'Foto do Cliente',
        },
        {
            name: 'rating',
            type: 'number',
            min: 1,
            max: 5,
            defaultValue: 5,
            label: 'Avaliação (1-5 estrelas)',
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
