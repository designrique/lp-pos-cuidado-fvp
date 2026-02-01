import path from 'path'
import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        description: 'Biblioteca de mídia (imagens, vídeos)',
    },
    labels: {
        singular: 'Mídia',
        plural: 'Mídias',
    },
    access: {
        read: () => true,
    },
    upload: {
        staticDir: path.join(process.cwd(), 'uploads'),
        staticURL: '/media',
        mimeTypes: ['image/*', 'video/*'],
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: 'Texto Alternativo (Alt)',
        },
        {
            name: 'caption',
            type: 'text',
            label: 'Legenda',
        },
    ],
}
