import React from 'react'
import "./loading-spinner.scss"

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <div className="loading-container">
                <p className="loading-text">Yükleniyor<span className="loading-dots">...</span></p>
            </div>
        </div>

    )
}

export default LoadingSpinner