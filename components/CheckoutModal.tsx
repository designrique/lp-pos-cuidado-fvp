import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCheckout } from './CheckoutContext';

const CHECKOUT_URL = 'https://payfast.greenn.com.br/pre-checkout/149959';

const CheckoutModal: React.FC = () => {
    const { isOpen, closeCheckout } = useCheckout();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCheckout();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeCheckout]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeCheckout}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm animate-fade-in" />

            {/* Modal Container */}
            <div
                className="relative w-full max-w-4xl h-[90vh] max-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 flex items-start justify-end p-4">
                    <button
                        onClick={closeCheckout}
                        className="w-10 h-10 rounded-full bg-brand-lilac/20 hover:bg-brand-lilac/40 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                        aria-label="Fechar checkout"
                    >
                        <X className="w-5 h-5 text-brand-dark group-hover:text-brand-gold transition-colors" />
                    </button>
                </div>

                {/* Iframe */}
                <iframe
                    src={CHECKOUT_URL}
                    className="w-full h-full border-0"
                    title="Checkout Mesa de Salomão"
                    allow="payment"
                />
            </div>
        </div>
    );
};

export default CheckoutModal;
