import { CollectionConfig } from 'payload/types'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'publishedDate', 'status'],
        group: 'Conteúdo',
    },
    labels: {
        singular: 'Post',
        plural: 'Posts',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Título',
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug (URL)',
            admin: {
                position: 'sidebar',
                description: 'Identificador único para a URL do post',
            },
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
            },
            label: 'Data de Publicação',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            label: 'Categoria',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'draft',
                    label: 'Rascunho',
                },
                {
                    value: 'published',
                    label: 'Publicado',
                },
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
            },
            label: 'Status',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Imagem de Capa',
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Resumo',
            maxLength: 300,
            admin: {
                description: 'Um breve resumo para aparecer na listagem do blog',
            },
        },
        {
            name: 'content',
            type: 'richText',
            label: 'Conteúdo',
            required: true,
        },
    ],
}
