import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

// Cliente Supabase para operações do servidor (Auth + Storage)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
})

// Upload de arquivo para Supabase Storage
export async function uploadToSupabase(
    bucket: string,
    path: string,
    file: Buffer,
    contentType: string
): Promise<string | null> {
    const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(path, file, {
            contentType,
            upsert: true,
        })

    if (error) {
        console.error('Supabase upload error:', error)
        return null
    }

    // Retorna URL pública
    const { data: publicUrl } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return publicUrl.publicUrl
}

// Deletar arquivo do Supabase Storage
export async function deleteFromSupabase(
    bucket: string,
    path: string
): Promise<boolean> {
    const { error } = await supabaseAdmin.storage.from(bucket).remove([path])

    if (error) {
        console.error('Supabase delete error:', error)
        return false
    }

    return true
}
