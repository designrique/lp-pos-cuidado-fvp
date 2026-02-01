import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        cookies: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            domain: process.env.NODE_ENV === 'production' ? '.mapc.com.br' : undefined,
        },
    },
    admin: {
        useAsTitle: 'email',
    },
    labels: {
        singular: 'Usuário',
        plural: 'Usuários',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
            ],
            defaultValue: 'editor',
            required: true,
        },
    ],
}
