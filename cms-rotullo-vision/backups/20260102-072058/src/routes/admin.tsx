import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/admin')({
    component: AdminRedirect,
})

function AdminRedirect() {
    useEffect(() => {
        // Redirect to the PayloadCMS Admin URL
        window.location.href = 'https://cms-rotullo-vision-production.up.railway.app/admin'
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirecionando para o painel administrativo...</p>
        </div>
    )
}
