import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './shareButtons.scss';

const ShareButtons = ({ articleUrl }) => {
    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}`, '_blank');
    };

    const shareLinkedin = () => {
        window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(articleUrl)}`, '_blank');
    };

    return (
        <div className='share-body'>
            <h4>YAZIYI PAYLAŞ : </h4>
            <div className="share-buttons"></div>
            <button className="share-button facebook" onClick={shareFacebook}><FaFacebook /></button>
            <button className="share-button twitter" onClick={shareTwitter}><FaTwitter /></button>
            <button className="share-button linkedin" onClick={shareLinkedin}><FaLinkedin /></button>
        </div>
    );
};

export default ShareButtons;
