import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { services } from '../../../services/services';
import './insert-article.scss';
import { FaCaretDown, FaCheckCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const InsertArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerName, setWriterName] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryGuid, setCategoryGuid] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await services.category.getCategories();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(categoryGuid, title, content, writerName)
        try {
            const newArticle = {
                status: true,
                title,
                content,
                writerName,
                categoryGuid,
            };
            await services.article.insertArticle(newArticle);
            setModalMessage([
                <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaCheckCircle color="green" size={40} />
                    </div>
                    <p>Makale başarıyla kaydedildi!</p>
                    <p>Makaleler sayfasına yönlendiriliyorsunuz...</p>
                </>
            ]);
            setShowModal(true);
            setTimeout(() => {
                navigate('/admin/articles');
            }, 2000);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="edit-article-container">
            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Yeni Makale Ekle</h1>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryGuid" className="mb-3 edit-article-category">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Control
                        as="select"
                        value={categoryGuid}
                        onChange={(e) => setCategoryGuid(e.target.value)}
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.map((category) => (
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
                <Form.Group controlId="title" className="mb-3 edit-article-title">
                    <Form.Label>Başlık</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="content" className="mb-4 edit-article-content">
                    <Form.Label>İçerik</Form.Label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                        formats={[
                            'header', 'font', 'size',
                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                            'list', 'bullet',
                            'link', 'image', 'video'
                        ]}
                        theme="snow"
                    />
                </Form.Group>
                <Form.Group controlId="writerName" className="mb-3 edit-article-writer">
                    <Form.Label>Yazar</Form.Label>
                    <Form.Control
                        type="text"
                        value={writerName}
                        onChange={(e) => setWriterName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Yükleniyor...' : ' Kaydet '}
                </Button>
                <Link to="/admin/articles">
                    <Button variant="secondary"> <IoIosArrowBack />Geri Dön</Button>
                </Link>
            </Form>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body className="text-center">
                    <p>{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default InsertArticle;
