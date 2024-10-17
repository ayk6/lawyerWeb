import React, { useEffect, useState } from 'react';
import JsonData from "../../data/data.json";
import "./aboutPage.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

const AboutPage = () => {

    const dispatch = useDispatch()

    const { value } = useSelector((state) => state.counter);
    const { user } = useSelector((state) => state.user);

    console.log(value)
    console.log(user)

    const [aboutData, setAboutData] = useState({
        paragraph1: "",
        paragraph2: "",
        Why: [],
        Why2: []
    });

    const { addToast } = useToasts();

    useEffect(() => {
        setAboutData({
            paragraph1: JsonData.About.paragraph1,
            paragraph2: JsonData.About.paragraph2,
            Why: JsonData.About.Why,
            Why2: JsonData.About.Why2,
        })
    }, []);


    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-4 img-div">
                        {" "}
                        <img src="img/old-architecture.jpg" className="img-responsive about-image" alt="" />{" "}
                    </div>
                    <div className="col-xs-12 col-md-8 text-container">
                        <div className="about-text">
                            <h2 className='about-page-header'>HAKKIMIZDA</h2>
                            <p>{aboutData ? aboutData.paragraph1 : <LoadingSpinner />}</p>
                            <p>{aboutData ? aboutData.paragraph2 : <LoadingSpinner />}</p>
                            <p>{aboutData ? aboutData.paragraph2 : <LoadingSpinner />}</p>
                            <p>{aboutData ? aboutData.paragraph2 : <LoadingSpinner />}</p>

                            <h3>Neden Biz?</h3>
                            <div className="list-style">
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                    <ul>
                                        {aboutData
                                            ? aboutData.Why.map((d, i) => (
                                                <li key={`${d}-${i}`}>{d}</li>
                                            ))
                                            : <LoadingSpinner />}
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-12">
                                    <ul>
                                        {aboutData
                                            ? aboutData.Why2.map((d, i) => (
                                                <li key={`${d}-${i}`}> {d}</li>
                                            ))
                                            : <LoadingSpinner />}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div><button onClick={() => dispatch(loginSuccess("asdasdds"))}>giriş</button></div>
                <div><button onClick={() => dispatch(logout())}>çıkış</button></div>
                <div><button onClick={() => addToast("error.message", { appearance: 'error' })}>alert</button></div>
                <div><button onClick={() => addToast('Saved Successfully', { appearance: 'success' })}>alert2</button></div>
                <div><button><Link to={"/admin"}>admin</Link></button></div>
            </div>

        </div>
    )
}

export default AboutPage;