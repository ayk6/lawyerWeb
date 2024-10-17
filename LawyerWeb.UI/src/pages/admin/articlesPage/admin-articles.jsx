import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { services } from '../../../services/services';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner';
import { Button, Container, Row, Col, Alert, Form } from 'react-bootstrap';
import { CTable, CTableBody, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CTableHead } from '@coreui/react';
import './admin-articles.scss';
import { FiPlusCircle } from 'react-icons/fi';
import { useAdminContext } from '../../../contexts/adminContext';
import { MdArrowDropDown } from 'react-icons/md';
import { FaCaretDown } from 'react-icons/fa';

const AdminArticles = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();


    const { articles, setArticles, selectedCategory, setSelectedCategory, setSelectedArticle } = useAdminContext();

    const loadCategories = async () => {
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

    const loadArticles = async () => {
        try {
            setLoadingArticles(true);
            const data = selectedCategory
                ? await services.article.getArticlesByCategoryId(selectedCategory)
                : await services.article.getArticles();
            setArticles(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingArticles(false);
        }
    };

    const getCategoryNameById = (id) => {
        const category = categories.find(cat => cat.guid === id);
        return category ? category.name : 'Bilinmiyor';
    };

    useEffect(() => {
        loadArticles();
        loadCategories();
        setSelectedArticle(null);
    }, [selectedCategory]);

    useEffect(() => {
        return () => {
            setSelectedCategory(null);
        };
    }, [location.pathname]);


    const handleDelete = async () => {
        try {
            setLoadingArticles(true);
            await services.article.deleteArticle(articleToDelete);
            loadArticles();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingArticles(false);
            setArticleToDelete(null)
            setShowDeleteModal(false);
        }
    };

    return (
        <Container className='admin-articles-container'>
            <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <CModalHeader>
                    <CModalTitle>Makaleyi Sil</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bu makaleyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                    <br />
                    <strong>Makaleye yapılmış tüm yorumlar da kalıcı olarak silecektir!</strong>
                </CModalBody>
                <CModalFooter>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Vazgeç</Button>
                    <Button variant="danger" onClick={handleDelete}>Sil</Button>
                </CModalFooter>
            </CModal>

            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Makaleler</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <Form.Group controlId="categoryFilter" className="category-dropdown">
                        <Form.Label>Kategorilere Göre Filtrele</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                        >
                            <option key={0} value={""}>
                                Tüm makaleleler
                            </option>
                            {categories.map(category => (
                                <option key={category.guid} value={category.guid}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                        <div className="dropdown-icon-div"
                            onClick={(e) => {
                                e.preventDefault();
                            }}><FaCaretDown className="dropdown-icon" />
                        </div>

                    </Form.Group>
                </Col>
            </Row>
            {loadingArticles ? (
                <LoadingSpinner />
            ) : articles.length > 0 ? (
                <CTable className="table table-light table-hover table-striped table-bordered">
                    <CTableHead>
                        <tr>
                            <th style={{ width: '1%' }}>#</th>
                            <th style={{ width: '30%' }}>Makale ismi</th>
                            <th style={{ width: '25%' }}>Kategori</th>
                            <th style={{ width: '44%' }}>Seçenekler</th>
                        </tr>
                    </CTableHead>
                    <CTableBody>
                        {articles.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((article, index) => (
                                <tr key={article.guid}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {
                                            article.title
                                        }
                                    </td>
                                    <td>{getCategoryNameById(article.categoryGuid)}</td>
                                    <td>
                                        <>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    setSelectedArticle(article);
                                                    navigate('/admin/editarticle')
                                                }}
                                                className="me-2">
                                                Düzenle
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    setArticleToDelete(article.guid);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="me-2">
                                                Sil
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => {
                                                    setSelectedArticle(article);
                                                    navigate('/admin/articledetail')
                                                }}
                                                className="me-2">
                                                Detay
                                            </Button>
                                            <Button
                                                variant="info"
                                                onClick={() => {
                                                    setSelectedArticle(article);
                                                    navigate('/admin/comments')
                                                }}
                                                className="me-2">
                                                Yorumlar
                                            </Button>
                                        </>

                                    </td>
                                </tr>
                            ))}
                    </CTableBody>
                </CTable>
            ) : (
                <Alert variant="info">Makale bulunamadı.</Alert>
            )}
            <div className='insert-article'>
                <Button className="mt-4" onClick={() => { navigate('/admin/insertarticle') }}><FiPlusCircle /> Yeni Makale Ekle</Button>
            </div>
        </Container>
    );
};

export default AdminArticles;
