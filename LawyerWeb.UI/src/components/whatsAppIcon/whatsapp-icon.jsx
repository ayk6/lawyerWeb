import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './whatsapp-icon.scss';

const WhatsAppIcon = () => {
    const phoneNumber = '+905467464398';
    const message = 'Merhaba';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            className="whatsapp-icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile sohbet başlat"
        >
            <FaWhatsapp />
        </a>
    );
};

export default WhatsAppIcon;