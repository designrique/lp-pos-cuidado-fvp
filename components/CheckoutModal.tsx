import { useEffect } from 'react';
import { useCheckout } from './CheckoutContext';

const CHECKOUT_URL = 'https://payfast.greenn.com.br/pre-checkout/149959';

const CheckoutModal: React.FC = () => {
    const { isOpen, closeCheckout } = useCheckout();

    useEffect(() => {
        if (isOpen) {
            // Redirect to checkout page (Greenn blocks iframe embedding)
            window.location.href = CHECKOUT_URL;
        }
    }, [isOpen, closeCheckout]);

    // This component no longer renders anything visible
    // It just handles the redirect logic
    return null;
};

export default CheckoutModal;
