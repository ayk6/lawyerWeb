import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Form } from 'react-bootstrap';
import { useAdminContext } from '../../../contexts/adminContext';
import { services } from '../../../services/services';
import './admin-comments.scss';
import { CTable, CTableBody, CTableHead, CTableRow, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner';
import { FaCaretDown } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const AdminComments = () => {
    const [comments, setComments] = useState(null);
    const [loadingComments, setLoadingComments] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [commentToDelete, setCommentToDelete] = useState('');
    const [showAddReplyModal, setShowAddReplyModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetail, setShowDetail] = useState(null);
    const { selectedArticle, setSelectedArticle, setSelectedCategory, setArticles, articles, setCommentToEdit } = useAdminContext();
    const navigate = useNavigate();

    const loadComments = async () => {
        try {
            setLoadingComments(true);
            const data = selectedArticle
                ? await services.comment.getCommentByArticleId(selectedArticle.guid)
                : await services.comment.getComments();
            setComments(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingComments(false);
            console.log(comments)
        }
    };

    const loadArticles = async () => {
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

    useEffect(() => {
        loadArticles();
        loadComments();
    }, [selectedArticle]);


    const handleDelete = async () => {
        try {
            setLoading(true);
            await services.comment.deleteCommentById(commentToDelete);
            setComments(comments.filter(comment => comment.guid !== commentToDelete));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    };


    const handleAddReply = async () => {
        try {
            setLoading(true);
            await services.comment.postComment({
                userName: 'ADMIN',
                userMail: 'admin@admin.com',
                userMobileNo: '000123456',
                userToken: '',
                commentText: replyText,
                articleGuid: selectedComment.articleGuid,
                parentCommentGuid: selectedComment.guid,
            });
            setComments(comments.map(comment =>
                comment.guid === selectedComment.guid
                    ? { ...comment, replyCommentVmList: [...(comment.replyCommentVmList || []), { commentText: replyText }] }
                    : comment
            ));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShowAddReplyModal(false);
            setReplyText('');
        }
    };
    const handleShowDetail = (comment) => {
        setShowDetail(prev => prev === comment.guid ? null : comment.guid);
    };

    return (
        <Container className="admin-comment-container">
            {/* Silme Modal'ı */}
            <CModal visible={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <CModalHeader>
                    <CModalTitle>Yorumu Sil</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                    <br />
                    <strong>Yoruma verilmiş yanıt varsa bu yanıt da kalıcı olarak silecektir!</strong>
                </CModalBody>
                <CModalFooter>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Vazgeç</Button>
                    <Button variant="danger" onClick={handleDelete}>Sil</Button>
                </CModalFooter>
            </CModal>
            {/* Yanıt Ekleme Modal'ı */}
            <CModal visible={showAddReplyModal} onClose={() => setShowAddReplyModal(false)}>
                <CModalHeader>
                    <CModalTitle>Yanıt Ekle</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <Form.Group controlId="replyText">
                        <Form.Label>Yanıt Metni</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                        />
                    </Form.Group>
                </CModalBody>
                <CModalFooter>
                    <Button variant="secondary" onClick={() => setShowAddReplyModal(false)}>Vazgeç</Button>
                    <Button variant="primary" onClick={handleAddReply}>Ekle</Button>
                </CModalFooter>
            </CModal>

            <Row className="my-4">
                <Col>
                    <h1 className="text-center">Yorumlar</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <Form.Group controlId="articleFilter" className="article-dropdown">
                        <Form.Label>Makalelere Göre Filtrele</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedArticle ? selectedArticle.guid : ""}
                            onChange={e => {
                                const selectedGuid = e.target.value;
                                const selected = articles.find(article => article.guid === selectedGuid);
                                setSelectedArticle(selected || null);
                            }}
                        >
                            {loadingArticles} ? <LoadingSpinner /> : (<option key={0} value={""}>
                                Tüm makaleleler
                            </option>
                            {articles.map(article => (
                                <option key={article.guid} value={article.guid}>
                                    {article.title}
                                </option>
                            ))})

                        </Form.Control>
                        <div className="dropdown-icon-div"
                            onClick={(e) => {
                                e.preventDefault();
                            }}>
                            <FaCaretDown className="dropdown-icon" />
                        </div>
                    </Form.Group>
                </Col>
            </Row>
            {loadingComments ? (
                <LoadingSpinner />
            ) : comments && comments.length > 0 ? (
                <>
                    <CTable className="table table-light table-hover table-striped table-bordered">
                        <CTableHead>
                            <CTableRow>
                                <th style={{ width: '1%' }}>#</th>
                                <th style={{ width: '20%' }}>Yorum metni</th>
                                <th style={{ width: '12%' }}>Yorum yapan</th>
                                <th style={{ width: '8%' }}>Tarih</th>
                                <th style={{ width: '12%' }}>Makale</th>
                                <th style={{ width: '20%' }}>Yanıt</th>
                                <th style={{ width: '27%' }}>Seçenekler</th>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {comments.sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((comment, index) => (
                                    <CTableRow key={comment.guid}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>
                                            {showDetail === comment.guid
                                                ? comment.commentText
                                                : comment.commentText.length > 40
                                                    ? `${comment.commentText.substring(0, 40)}...`
                                                    : comment.commentText}
                                        </CTableDataCell>
                                        <CTableDataCell>{showDetail === comment.guid
                                            ? <><p>{comment.userName}</p> <p>{comment.userMobileNo}</p> </>
                                            : comment.userName}</CTableDataCell>
                                        <CTableDataCell>{new Date(comment.updateDatetime).toLocaleDateString('tr-TR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}</CTableDataCell>
                                        <CTableDataCell>
                                            {articles.find(article => article.guid === comment.articleGuid)?.title || "Makale bulunamadı"}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {showDetail === comment.guid && comment.replyCommentVmList && comment.replyCommentVmList.length > 0
                                                ? comment.replyCommentVmList[0].commentText
                                                : comment.replyCommentVmList && comment.replyCommentVmList.length > 0
                                                    ? comment.replyCommentVmList[0].commentText.length > 40
                                                        ? `${comment.replyCommentVmList[0].commentText.substring(0, 40)}...`
                                                        : comment.replyCommentVmList[0].commentText
                                                    : (
                                                        <Button
                                                            variant="warning"
                                                            className="add-reply-button me-2"
                                                            onClick={() => {
                                                                setSelectedComment(comment);
                                                                setShowAddReplyModal(true);
                                                            }}
                                                        >
                                                            Yanıt ekle
                                                        </Button>
                                                    )}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    setCommentToEdit(comment);
                                                    navigate('/admin/editcomment');
                                                }}
                                                className="me-2">
                                                Düzenle
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    setCommentToDelete(comment.guid);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="me-2">
                                                Sil
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleShowDetail(comment)}
                                                className="me-2">
                                                {showDetail === comment.guid ? "Gizle" : "Detay"}
                                            </Button>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                        </CTableBody>
                    </CTable>
                    <Link to="/admin/articles">
                        <Button variant="secondary"> <IoIosArrowBack /> Makaleler sayfasına Dön</Button>
                    </Link>
                </>
            ) : (
                <Alert variant="info">
                    <p>Makale : {selectedArticle ? selectedArticle.title : "Seçili makale yok"}</p>
                    Makaleye ait yorum bulunamadı.
                </Alert>
            )}
        </Container>
    );
};

export default AdminComments;
