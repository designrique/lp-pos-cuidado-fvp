import { useEffect } from 'react';

const AdminRedirect = () => {
    useEffect(() => {
        const payloadUrl = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';
        window.location.href = `${payloadUrl}/admin`;
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecionando para o painel administrativo...</p>
            </div>
        </div>
    );
};

export default AdminRedirect;
