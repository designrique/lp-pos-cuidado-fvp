import { CollectionConfig } from 'payload/types'

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Categoria',
        plural: 'Categorias',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome da Categoria',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL Amigável)',
            admin: {
                description: 'Identificador único usado na URL',
            },
        },
    ],
}
