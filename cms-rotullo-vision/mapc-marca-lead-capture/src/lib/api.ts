import axios from 'axios';

const PAYLOAD_URL = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';

export const api = axios.create({
    baseURL: import.meta.env.PROD ? '/api' : `${PAYLOAD_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface HeroData {
    title: string;
    subtitle: string;
    backgroundImage: {
        url: string;
        alt: string;
    } | string;
    ctaButtonText: string;
    stats: {
        icon: string;
        value: string;
        label: string;
    }[];
    benefits: {
        title: string;
        description: string;
    }[];
}

export interface ServiceData {
    id: string;
    title: string;
    description: string;
    icon: string; // We'll need a way to map strings to Lucide icons
    features: {
        feature: string;
    }[];
    order: number;
}

export interface TestimonialData {
    id: string;
    name: string;
    company: string;
    content: string;
    image: {
        url: string;
        alt: string;
    } | string;
    rating: number;
    order: number;
}
