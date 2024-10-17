import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { useAdminContext } from '../../../contexts/adminContext';
import { services } from '../../../services/services';
import './article-detail.scss';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { FaCheckCircle } from 'react-icons/fa';

const ArticleDetail = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { selectedArticle, setSelectedArticle, selectedCategory } = useAdminContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                if (selectedArticle) {
                    setArticle(selectedArticle)
                    console.log(selectedCategory)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [selectedArticle]);

    const handleEdit = () => {
        navigate('/admin/editarticle');
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await services.article.deleteArticle(articleToDelete);
            setModalMessage([
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaCheckCircle color="green" size={40} />
                    </div>
                    <p>Makale başarıyla silindi</p>
                    <p>Makaleler sayfasına yönlendiriliyorsunuz...</p>
                </>
            ]);
            setSelectedArticle(null)
            setShowModal(true);
            setTimeout(() => {
                navigate('/admin/articles');
            }, 2000);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setArticleToDelete(null)
            setShowDeleteModal(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!article) return <div>Makale bulunamadı.</div>;

    return (
        <Container className="article-detail-container">
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
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="text-center">
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>
            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Makale Detayı</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="article-card">
                        <Card.Header as="h5">{article.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>Yazar:</strong> {article.writerName}
                            </Card.Text>
                            <Card.Text>
                                <strong>Kategori:</strong> {selectedCategory}
                            </Card.Text>
                            <Card.Text>
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </Card.Text>
                            <Link to="/admin/articles">
                                <Button variant="secondary">Geri Dön</Button>
                            </Link>
                            <Button variant="warning" onClick={handleEdit} className="me-2">Düzenle</Button>
                            <Button variant="danger" onClick={() => {
                                setArticleToDelete(article.guid);
                                setShowDeleteModal(true);
                            }}>Sil</Button>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ArticleDetail;
