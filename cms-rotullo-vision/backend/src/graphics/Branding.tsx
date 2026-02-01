import React from 'react';
import './logo.scss';

const iconSrc = '/assets/rotullo-icon.png?v=5';
const logoSrc = '/assets/rotullo-full-v5.png';

export const Logo = () => (
    <div className="rotullo-logo">
        <img
            src={logoSrc}
            alt="Rotullo CMS"
            className="logo-img"
        />
    </div>
);

export const Icon = () => (
    <div className="rotullo-icon">
        <img
            src={logoSrc}
            alt="Rotullo CMS"
            className="logo-img"
        />
    </div>
);
