import React, { useState } from 'react';
import emailjs from "emailjs-com";
import LoadingSpinner from '../components/loading-spinner/loading-spinner';

const initialState = {
    name: "",
    email: "",
    message: "",
};

const info = {
    address: "my adress",
    phone: "my phone",
    email: "my email"
}

const social = {
    facebook: "my facebook",
    twitter: "my twitter",
    youtube: "my youtube"
}

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const [formData, setFormData] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(formData.name, formData.email, formData.message);

        try {
            await emailjs.sendForm(serviceId, templateId, e.target, publicKey);
            // ad
            console.log("success")
            setFormData(initialState);
            /*alert*/
        } catch (error) {
            /* alert */ console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="contact">
            <div className="container">
                <div className="col-md-8">
                    <div className="row">
                        <div className="section-title">
                            <h2>İLETİŞİME GEÇİN</h2>
                            <p>
                                Lütfen aşağıdaki formu doldurun ve bize bir e-posta gönderin, en kısa sürede size döneceğiz.
                            </p>
                        </div>

                        <form name="sentMessage" validate="true" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="İsim"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Mesaj"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <p className="help-block text-danger"></p>
                            </div>
                            <div id="success"></div>
                            <button type="submit" className="btn btn-custom btn-lg" disabled={loading}>
                                {loading && <LoadingSpinner />}
                                GÖNDER
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-3 col-md-offset-1 contact-info">
                    <div className="contact-item">
                        <h3>İletişim Bilgileri</h3>
                        <p>
                            <span>
                                <i className="fa fa-map-marker"></i> Adres
                            </span>
                            {info ? info.address : "loading"}
                        </p>
                    </div>
                    <div className="contact-item">
                        <p>
                            <span>
                                <i className="fa fa-phone"></i> Telefon
                            </span>{" "}
                            {info ? info.phone : "loading"}
                        </p>
                    </div>
                    <div className="contact-item">
                        <p>
                            <span>
                                <i className="fa fa-envelope-o"></i> Email
                            </span>{" "}
                            {info ? info.email : "loading"}
                        </p>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="social">
                            <ul>
                                <li>
                                    <a href={social ? social.facebook : "/"}>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={social ? social.twitter : "/"}>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={social ? social.youtube : "/"}>
                                        <i className="fa fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;
