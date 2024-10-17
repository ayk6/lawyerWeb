import React from 'react';
import "./careerPage.css";
import { Link } from 'react-router-dom';

const CareerPage = () => {
    return (
        <header id="header">
            <div className="career-body">
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 intro-text">
                                <h1>Sizinle Çalışmak İçin Sabırsızlanıyoruz</h1>
                                <p>
                                    Global iş dünyasında, birden fazla ülkeden onlarca müvekkile hizmet veren ofislerimizde çalışacak, sizin gibi adaylara ihtiyacımız var.
                                </p>
                                <p>
                                    Bizimle ortak değerlere sahip kişilerle birlikte çalışmaktan büyük bir memnuniyet duyarız.
                                </p>
                                <a href="#" className="btn btn-custom btn-lg">
                                    BAŞVUR
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default CareerPage