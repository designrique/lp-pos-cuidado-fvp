import path from 'path'
import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { Users } from './collections/Users'
import { HeroSection } from './collections/HeroSection'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { FAQ } from './collections/FAQ'
import { SiteSettings } from './globals/SiteSettings'
import { Logo, Icon } from './graphics/Branding'
import InfinityPayAppointments from './components/Dashboard/InfinityPayAppointments'
import { Appointments } from './collections/Appointments'

export default buildConfig({
    serverURL: (process.env.NODE_ENV === 'production' || process.env.RAILWAY_SERVICE_ID || (process.env.PAYLOAD_PUBLIC_SERVER_URL || '').includes('railway.app'))
        ? 'https://mapc.com.br'
        : (process.env.PAYLOAD_PUBLIC_SERVER_URL || ''),
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        meta: {
            titleSuffix: '- Rotullo CMS',
            favicon: '/assets/rotullo-icon.png',
            ogImage: '/assets/rotullo-icon.png',
        },
        components: {
            graphics: {
                Logo,
                Icon,
            },
            afterDashboard: [
                InfinityPayAppointments,
            ],
        },
    },
    // CSRF protection: Allow the Netlify domain
    csrf: [
        'https://mapc.com.br',
        'https://www.mapc.com.br',
    ],
    collections: [
        Users,
        Appointments,
        HeroSection,
        Services,
        Testimonials,
        Media,
        Posts,
        Categories,
        FAQ,
    ],
    globals: [
        SiteSettings,
    ],
    editor: slateEditor({}),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
        push: true,
    }),
    cors: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:8080',
        'https://registrese.mapc.com.br',
        'https://mapc.com.br',
        'https://www.mapc.com.br',
    ],
    i18n: {
        fallbackLng: 'pt',
    },
})
