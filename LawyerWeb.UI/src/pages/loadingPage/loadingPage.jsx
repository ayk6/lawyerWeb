import React from 'react';
import "./loadingPage.css"
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <Spinner animation="border" variant="primary" />
            <div className="logo">
                <h5>LAWYER WEB</h5>
            </div>
        </div>
    )
}

export default LoadingPage