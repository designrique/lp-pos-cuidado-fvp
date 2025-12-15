import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CheckoutContextType {
    isOpen: boolean;
    openCheckout: () => void;
    closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = (): CheckoutContextType => {
    const context = useContext(CheckoutContext);
    if (!context) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};

interface CheckoutProviderProps {
    children: ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openCheckout = () => setIsOpen(true);
    const closeCheckout = () => setIsOpen(false);

    return (
        <CheckoutContext.Provider value={{ isOpen, openCheckout, closeCheckout }}>
            {children}
        </CheckoutContext.Provider>
    );
};
