import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Col, Row } from 'react-bootstrap';
import JsonData from "../../data/data.json";
import Spacer from '../../components/spacer';
import HomePageBlogCard from '../../components/blogCard/homePageBlogCard';
import './homePage.css';
import { services } from '../../services/services';
import CardSlider from '../../components/card-slider/card-slider';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

const HomePage = () => {
    const [homePageData, setHomePageData] = useState({
        title: "",
        paragraph: ""
    });
    const [articles, SetArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const data = await services.article.getArticles();
            SetArticles(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setHomePageData({
            title: JsonData.Header.title,
            paragraph: JsonData.Header.paragraph
        });
        loadData();
    }, []);


    return (
        <header id="header">
            <div className="intro">
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2 intro-text">
                                <h1>
                                    {homePageData ? homePageData.title : <LoadingSpinner />}
                                    <span></span>
                                </h1>
                                <p>{homePageData ? homePageData.paragraph : <LoadingSpinner />}</p>
                                <Link to={"/about"} className="btn btn-custom btn-lg page-scroll">
                                    DEVAMI İÇİN
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Spacer height="1.5rem" className="spacer" />
            <div className="container">
                <h3 className='articles-header'>SON MAKALELER</h3>
                <Row className="hp-article-card-section">
                    {false ? (
                        <LoadingSpinner />
                    ) : articles.length > 0 ? (
                        articles
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 6).map((item, index) => (
                                <Col className='col col-xs-6 col-sm-4 col-md-4 col-lg-2' key={index}>
                                    <HomePageBlogCard data={item} />
                                </Col>
                            ))
                    ) : (
                        <div className='blog-page-alert'>Makaleler yüklenemedi.</div>
                    )}
                </Row>
            </div>
            <div className='homepage-team-belt'>
                <div className=' container'>
                    <div className='belt-content col-sm-6'>
                        <h3>Alanında uzman avukatlardan oluşan ekibimizle tanışın.</h3>
                    </div>
                    <div className='belt-button col-sm-6'>
                        <Link to={"/team"} className='btn-custom btn btn-lg page-scroll'>
                            EKİBİMİZ
                        </Link>

                    </div>
                </div>
            </div>
            <h3 className='card-slider-header'>ÇALIŞMA ALANLARIMIZ</h3>
            <CardSlider />

            <Spacer height="2rem" className="spacer" />
        </header>
    );
};

export default HomePage;
