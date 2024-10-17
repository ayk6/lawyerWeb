// CommonLayout.jsx

import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from '../../components/navigation';
import Spacer from '../../components/spacer';
import Footer from '../../components/footer/footer';
import { useSelector } from 'react-redux';
import WhatsAppIcon from '../../components/whatsAppIcon/whatsapp-icon';

const CommonLayout = () => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="app-container">

            <Navigation />
            <Spacer height="81px" />
            <div className="content">
                <Outlet />
            </div>
            <WhatsAppIcon />
            <Footer />
            <link rel="stylesheet" type="text/css" href="/css/bootstrap.css" />
            <link rel="stylesheet" type="text/css" href="/fonts/font-awesome/css/font-awesome.css" />
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link rel="stylesheet" type="text/css" href="/css/nivo-lightbox/nivo-lightbox.css" />
            <link rel="stylesheet" type="text/css" href="/css/nivo-lightbox/default.css" />
        </div>
    );
};

export default CommonLayout;
