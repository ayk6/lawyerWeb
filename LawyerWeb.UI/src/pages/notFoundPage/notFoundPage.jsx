import React from 'react';
import "./notFoundPage.css"
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="notfound-page">
            <div className="logo">
                <h5>LAWYER WEB</h5>
            </div>
            <div className="message">
                <h1>404</h1>
                <p>Sayfa Bulunamadı</p>
                <Link to="/" className="btn-custom">Ana Sayfaya Dön</Link>
            </div>
        </div>
    )
}

export default NotFoundPage