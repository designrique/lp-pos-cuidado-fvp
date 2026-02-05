import path from 'path'
import { buildConfig } from 'payload/config'

// Debug log for environment variables
console.log('--- Payload Config Loading ---');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URI Present:', !!process.env.DATABASE_URI);
if (process.env.DATABASE_URI) {
    console.log('DATABASE_URI Length:', process.env.DATABASE_URI.length);
}
console.log('--- End Config Debug ---');
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
import { Campaigns } from './collections/Campaigns'

export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
    email: {
        transportOptions: {
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
        },
        fromName: process.env.SMTP_FROM_NAME || 'Instituto Ariana Borges',
        fromAddress: process.env.SMTP_FROM_ADDRESS || 'contato@institutoarianaborges.com.br',
    },
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
        webpack: (config) => ({
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...(config.resolve?.alias || {}),
                    [path.resolve(__dirname, 'hooks/afterChangeCampaign')]: path.resolve(__dirname, 'mocks/emptyObject.js'),
                    [path.resolve(__dirname, 'hooks/afterChangeAppointment')]: path.resolve(__dirname, 'mocks/emptyObject.js'),
                },
            },
        }),
    },
    csrf: [
    ],
    collections: [
        Users,
        Appointments,
        Campaigns,
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
        push: true, // Auto-create tables
    }),
    cors: [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:8080',
    ],
    i18n: {
        fallbackLng: 'pt',
    },
})
