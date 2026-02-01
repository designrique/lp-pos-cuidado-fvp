import 'dotenv/config'
import 'ignore-styles'
import payload from 'payload'
import config from './payload.config'
import path from 'path'
import fs from 'fs'

const MEDIA_DIR = path.resolve(__dirname, './assets-seed')

export const data = {
    hero: {
        title: 'Terapia Individual, Formação de Terapeutas e Grupo de Autoconhecimento',
        subtitle: 'Liberte-se: Desperte, Cure e Transforme sua Vida. Sua jornada de expansão começa aqui.',
        ctaButtonText: 'Marque um Atendimento',
        backgroundImagePath: 'hero-bg.jpg',
    },
    services: [
        {
            icon: "UserCheck",
            title: "Terapia Individual",
            description: "Liberte-se: Desperte, Cure e Transforme sua Vida com sessões de Terapia Personalizada.",
            link: "/terapia-individual",
            cta: "Saiba mais",
            order: 1
        },
        {
            icon: "GraduationCap",
            title: "Formação de Terapeutas",
            description: "Seja um Agente de Mudança: Diversas Formações de Terapeuta de Excelência.",
            link: "/formacao-de-terapeutas",
            cta: "Saiba mais",
            order: 2
        },
        {
            icon: "Users",
            title: "Autoconhecimento em Grupo",
            description: "Junte-se a uma Jornada de Descoberta: Turmas de Autoconhecimento para Transformação Interior.",
            link: "/autoconhecimento-em-grupo",
            cta: "Saiba mais",
            order: 3
        }
    ],
    faq: [
        {
            question: "Como funcionam os atendimentos?",
            answer: "Os atendimentos podem ser realizados de forma online ou presencial, com duração média de 50 minutos a 1h30, dependendo da técnica escolhida.",
            order: 1
        },
        {
            question: "Quais técnicas são utilizadas?",
            answer: "Utilizamos uma abordagem integrativa que pode incluir Psicanálise, ThetaHealing®, Mesa de Salomão, Reiki, e outras ferramentas de cura vibracional.",
            order: 2
        },
        {
            question: "Como agendar uma consulta?",
            answer: "Você pode agendar diretamente pelo botão de WhatsApp no site ou através da página de contato.",
            order: 3
        },
        {
            question: "Os cursos possuem certificado?",
            answer: "Sim, todos os cursos de formação terapêutica oferecem certificação reconhecida para atuação profissional.",
            order: 4
        }
    ],
    testimonials: [
        {
            name: "Maria Silva",
            role: "Jornada Completa",
            content: "A Mesa de Salomão mudou completamente minha perspectiva sobre prosperidade. Senti os bloqueios se dissolvendo dia após dia e oportunidades surgindo do nada.",
            rating: 5,
            order: 1,
            imagePath: "testimonial-1.jpg"
        },
        {
            name: "João Pereira",
            role: "Jornada Completa",
            content: "A energia da Ariana é indescritível. O acompanhamento diário fez toda a diferença para eu não desistir. Hoje me sinto leve e com caminhos abertos.",
            rating: 5,
            order: 2,
            imagePath: "testimonial-2.jpg"
        },
        {
            name: "Ana Costa",
            role: "Jornada Completa",
            content: "Eu estava estagnada profissionalmente há anos. Após os 12 dias de abertura de caminhos, recebi uma proposta que esperava há muito tempo. Gratidão!",
            rating: 5,
            order: 3,
            imagePath: "testimonial-3.jpg"
        },
        {
            name: "Carlos Mendes",
            role: "Jornada Completa",
            content: "Nunca tinha participado de algo tão profundo. As limpezas energéticas realmente funcionam. Recomendo para todos que buscam paz interior.",
            rating: 5,
            order: 4,
            imagePath: "testimonial-4.jpg"
        }
    ],
    posts: [
        {
            title: "O que é e como funciona a Mesa de Salomão?",
            slug: "o-que-e-mesa-salomao",
            imagePath: "blog-placeholder.jpg",
            publishedDate: "2024-01-15T12:00:00.000Z",
            excerpt: "Descubra como essa poderosa ferramenta vibracional pode desbloquear caminhos e transformar sua realidade.",
            content: [
                {
                    children: [{ text: "A Mesa de Salomão é uma ferramenta de radiestesia e cura vibracional baseada em geometria sagrada." }],
                },
                {
                    children: [{ text: "Ela atua limpando bloqueios energéticos e reprogramando padrões mentais e emocionais, permitindo que a energia flua livremente em todas as áreas da vida." }]
                }
            ]
        },
        {
            title: "5 Sinais de que você precisa alinhar seus Chakras",
            slug: "5-sinais-alinhar-chakras",
            imagePath: "blog-placeholder.jpg",
            publishedDate: "2024-02-01T10:00:00.000Z",
            excerpt: "Cansaço excessivo, ansiedade e falta de clareza podem indicar desequilíbrio energético. Saiba identificar.",
            content: [
                {
                    children: [{ text: "Os chakras são centros de energia em nosso corpo. Quando estão desalinhados, podemos sentir sintomas físicos e emocionais." }],
                }
            ]
        },
        {
            title: "Os benefícios da Constelação Familiar",
            slug: "beneficios-constelacao-familiar",
            imagePath: "blog-placeholder.jpg",
            publishedDate: "2024-02-10T09:30:00.000Z",
            excerpt: "Entenda como padrões familiares inconscientes podem estar afetando seus relacionamentos e carreira hoje.",
            content: [
                {
                    children: [{ text: "A Constelação Familiar olha para o sistema familiar de forma ampla, buscando incluir quem foi excluído e restaurar a ordem do amor." }],
                }
            ]
        }
    ],
    siteSettings: {
        contact: {
            whatsappRequest: '5511999999999',
            email: 'contato@institutoarianaborges.com.br'
        },
        social: {
            instagram: 'https://instagram.com/institutoarianaborges'
        },
        footer: {
            copyrightText: `© ${new Date().getFullYear()} Instituto Ariana Borges. Todos os direitos reservados.`
        }
    }
}

export const seedContent = async (payloadInstance: any) => {
    try {
        const localPayload = payloadInstance || payload;

        if (!payloadInstance) {
            await localPayload.init({
                config,
                secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
                local: true,
            })
        }

        localPayload.logger.info('Seeding Payload content...')

        // Helper to upload media
        const uploadMedia = async (relativePath: string, altText: string) => {
            const absolutePath = path.join(MEDIA_DIR, relativePath)
            if (!fs.existsSync(absolutePath)) {
                localPayload.logger.warn(`File not found: ${absolutePath}`)
                return null
            }

            const filename = path.basename(absolutePath)
            const existing = await localPayload.find({
                collection: 'media',
                where: { filename: { equals: filename } },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                return existing.docs[0].id;
            }

            const media = await localPayload.create({
                collection: 'media',
                data: {
                    alt: altText,
                },
                filePath: absolutePath,
            })
            return media.id
        }

        // Seed Hero
        const heroQuery = await localPayload.find({
            collection: 'hero-section',
            limit: 1,
        })

        let bgImageId = null
        if (data.hero.backgroundImagePath) {
            bgImageId = await uploadMedia(data.hero.backgroundImagePath, 'Hero Background Image')
        }

        if (heroQuery.totalDocs === 0) {
            localPayload.logger.info('Seeding Hero Section...')
            await localPayload.create({
                collection: 'hero-section',
                data: {
                    title: data.hero.title,
                    subtitle: data.hero.subtitle,
                    ctaButtonText: data.hero.ctaButtonText,
                    ...(bgImageId && { backgroundImage: bgImageId }),
                },
            })
        } else {
            localPayload.logger.info('Hero Section exists. Updating with media...')
            await localPayload.update({
                collection: 'hero-section',
                id: heroQuery.docs[0].id,
                data: {
                    title: data.hero.title,
                    subtitle: data.hero.subtitle,
                    ctaButtonText: data.hero.ctaButtonText,
                    ...(bgImageId && { backgroundImage: bgImageId }),
                },
            })
        }

        // Seed Services
        localPayload.logger.info('Seeding Services (Pillars)...')
        for (const service of data.services) {
            const existing = await localPayload.find({
                collection: 'services',
                where: { title: { equals: service.title } },
                limit: 1
            })

            if (existing.totalDocs === 0) {
                await localPayload.create({
                    collection: 'services',
                    data: {
                        ...service,
                        isActive: true
                    },
                })
            }
        }

        // Seed FAQ
        localPayload.logger.info('Seeding FAQs...')
        for (const faq of data.faq) {
            const existing = await localPayload.find({
                collection: 'faq',
                where: { question: { equals: faq.question } },
                limit: 1
            })

            if (existing.totalDocs === 0) {
                await localPayload.create({
                    collection: 'faq',
                    data: {
                        ...faq
                    },
                })
            }
        }

        // Seed Testimonials
        localPayload.logger.info('Seeding/Updating Testimonials...')
        for (const t of data.testimonials) {
            let imageId = null
            if (t.imagePath) {
                imageId = await uploadMedia(t.imagePath, `${t.name} Photo`)
            }

            const existingT = await localPayload.find({
                collection: 'testimonials',
                where: { name: { equals: t.name } },
                limit: 1
            })

            if (existingT.totalDocs > 0) {
                await localPayload.update({
                    collection: 'testimonials',
                    id: existingT.docs[0].id,
                    data: {
                        company: t.role,
                        content: t.content,
                        rating: t.rating,
                        order: t.order,
                        isActive: true,
                        ...(imageId && { image: imageId }),
                    }
                })
            } else {
                await localPayload.create({
                    collection: 'testimonials',
                    data: {
                        name: t.name,
                        company: t.role,
                        content: t.content,
                        rating: t.rating,
                        order: t.order,
                        isActive: true,
                        ...(imageId && { image: imageId }),
                    },
                })
            }
        }

        // Seed Posts
        localPayload.logger.info('Seeding Blog Posts...')
        for (const p of data.posts) {
            let imageId = null
            if (p.imagePath) {
                imageId = await uploadMedia(p.imagePath, `${p.title} Cover`)
            }

            const existingP = await localPayload.find({
                collection: 'posts',
                where: { slug: { equals: p.slug } },
                limit: 1
            })

            if (existingP.totalDocs === 0) {
                await localPayload.create({
                    collection: 'posts',
                    data: {
                        title: p.title,
                        slug: p.slug,
                        publishedDate: p.publishedDate,
                        status: 'published',
                        excerpt: p.excerpt,
                        content: p.content,
                        ...(imageId && { image: imageId }),
                    }
                })
            }
        }

        // Seed Site Settings
        localPayload.logger.info('Seeding Site Settings...')
        await localPayload.updateGlobal({
            slug: 'site-settings',
            data: data.siteSettings
        })

        localPayload.logger.info('Content seeding completed!')
        return { success: true, message: 'Content seeded successfully' }
    } catch (err) {
        console.error(err)
        return { success: false, error: err }
    }
}

// Allow standalone execution
if (require.main === module) {
    seedContent(null).then(() => process.exit(0))
}
