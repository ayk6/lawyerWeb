import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Spacer from '../../components/spacer';
import BlogCard from '../../components/blogCard/blogCard';
import { services } from '../../services/services';
import "./blog-page.scss";
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

const BlogPage = () => {
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const loadAllArticles = async () => {
        try {
            setLoadingArticles(true);
            const data = await services.article.getArticles();
            setArticles(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingArticles(false);
        }
    };

    const loadArticlesByCategory = async (categoryId) => {
        try {
            setLoadingArticles(true);
            const data = await services.article.getArticlesByCategoryId(categoryId);
            setArticles(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingArticles(false);
        }
    };

    const getCategories = async () => {
        try {
            setLoadingCategories(true);
            const data = await services.category.getCategories();
            setCategories(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        getCategories();
        loadAllArticles();
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        loadArticlesByCategory(categoryId);
    };


    return (
        <Container>
            <Spacer />
            <Row>
                <Col sm={4} md={3} className='bp-categories'>
                    <h4 className='bp-categories-header'>KATEGORİLER</h4>
                    {loadingCategories ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <div className="show-only-md-up">
                                <ListGroup>
                                    {categories.length > 0 ? (
                                        categories
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((category) => (
                                                <ListGroup.Item
                                                    key={category.guid}
                                                    onClick={() => handleCategoryClick(category.guid)}
                                                    active={category.guid === selectedCategory}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {category.name}
                                                </ListGroup.Item>
                                            ))
                                    ) : (
                                        <div className='blog-page-alert'>Kategoriler yüklenemedi.</div>
                                    )}
                                </ListGroup>
                            </div>
                            <div class="dropdown show-only-md-down">
                                <button class="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <h4>KATEGORİLER <span class="caret"></span></h4>

                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    {categories.length > 0 ? (
                                        categories
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map((category) => (
                                                <li
                                                    className={`dropdown-item ${category.guid === selectedCategory ? 'active' : ''}`}
                                                    key={category.guid}
                                                    onClick={() => handleCategoryClick(category.guid)}
                                                >
                                                    {category.name}

                                                </li>
                                            ))
                                    ) : (
                                        <button className="dropdown-item" disabled>Kategoriler yüklenemedi.</button>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </Col>

                <Col sm={8} md={9} className='bp-blog-cards'>
                    {loadingArticles ? (
                        <LoadingSpinner />
                    ) : articles.length > 0 ? (
                        articles.map((item, index) => (
                            <Col className='col col-xs-6 col-md-4' key={index}>
                                <BlogCard data={item} />
                                <Spacer height="3rem" />
                            </Col>
                        ))
                    ) : (
                        <div className='blog-page-alert'>Makaleler yüklenemedi.</div>
                    )}
                </Col>
            </Row>
            <Spacer height={"1rem"} />
        </Container >
    )
}

export default BlogPage;
