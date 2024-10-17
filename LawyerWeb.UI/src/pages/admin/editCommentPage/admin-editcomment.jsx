import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { services } from '../../../services/services';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner';
import { CTable, CTableBody, CTableHead, CTableRow, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react';

import { useAdminContext } from '../../../contexts/adminContext';
import { IoIosArrowBack } from 'react-icons/io';
import "./admin-editcomment.scss"

const EditCommentPage = () => {
    const [editingComment, setEditingComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingComments, setLoadingComments] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [userName, setUserName] = useState('');
    const [replyOwner, setReplyOwner] = useState('');
    const [userMobileNo, setUserMobileNo] = useState('');
    const [showAddReplyModal, setShowAddReplyModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [articleGuid, setArticleGuid] = useState('');
    const [replyComments, setReplyComments] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState('');

    const { commentToEdit, setCommentToEdit } = useAdminContext();

    useEffect(() => {
        if (commentToEdit) {
            loadComments();
        }
    }, [commentToEdit]);

    const loadComments = async () => {
        try {
            setLoadingComments(true);
            const data = await services.comment.getCommentById(commentToEdit.guid);
            setEditingComment(data);
            setCommentText(data[0].commentText);
            setUserName(data[0].userName);
            if (data[0].replyCommentVmList.length > 0) {
                setReplyText(data[0].replyCommentVmList[0].commentText);
                setReplyOwner(data[0].replyCommentVmList[0].userName);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentToEdit) return;

        const updatedComment = {
            guid: commentToEdit.guid,
            status: true,
            userName: userName,
            userMail: '',
            userMobileNo: commentToEdit.userMobileNo,
            userToken: commentToEdit.userToken,
            commentText: commentText,
            articleGuid: commentToEdit.articleGuid,
        };

        try {
            setLoading(true);
            const response = await services.comment.updateComment(updatedComment);
            console.log('Update response:', response);

            if (editingComment[0].replyCommentVmList.length > 0) {
                const reply = editingComment[0].replyCommentVmList[0];
                const updatedReply = {
                    guid: reply.guid,
                    status: true,
                    userName: reply.userName || '',
                    commentText: replyText,
                    articleGuid: commentToEdit.articleGuid,
                    parentCommentGuid: commentToEdit.guid,
                };
                const replyResponse = await services.comment.updateComment(updatedReply);
                console.log('Update reply response:', replyResponse);
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReplyChange = (index, newText) => {
        const updatedReplies = [...replyComments];
        updatedReplies[index].commentText = newText;
        setReplyComments(updatedReplies);
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
                articleGuid: commentToEdit.articleGuid,
                parentCommentGuid: commentToEdit.guid,
            });
            setCommentToEdit(commentToEdit)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShowAddReplyModal(false);
            setReplyText('');
            loadComments()
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await services.comment.deleteCommentById(commentToDelete);
            setReplyComments([]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            loadComments()
            setReplyText('');
        }
    };

    return (

        <Container className='edit-comment-container'>
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
                            required
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
                    <h1>Yorum Düzenle</h1>
                </Col>
            </Row>
            {loadingComments ? (
                <LoadingSpinner />
            ) : editingComment ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userName">
                        <Form.Label>Kullanıcı Adı</Form.Label>
                        <Form.Control
                            type="text"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="commentText">
                        <Form.Label>Yorum Metni</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {editingComment[0].replyCommentVmList.length > 0 ? (
                        <div>
                            <Form.Group controlId="replyOwner">
                                <Form.Label>Yanıtlayan</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={replyOwner}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="replyComment">
                                <Form.Label>Yanıt</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    required
                                />

                            </Form.Group>
                            <Button
                                variant="danger"
                                className="add-reply-button me-2"
                                onClick={() => {
                                    console.log(replyComments)
                                    setCommentToDelete(editingComment[0].replyCommentVmList[0].guid);
                                    setShowDeleteModal(true);
                                }}
                            >
                                Yanıtı sil
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="warning"
                            className="add-reply-button me-2"
                            onClick={() => {
                                setShowAddReplyModal(true);
                            }}
                        >
                            Yanıt ekle
                        </Button>
                    )}

                    <Button variant="primary" type="submit">Güncelle</Button>
                    <Button variant="secondary" onClick={() => navigate('/admin/comments')} className="ms-2">
                        <IoIosArrowBack /> Geri Dön
                    </Button>
                </Form>
            ) : (
                <Alert variant="info">
                    yorum bulunamadı.
                </Alert>
            )}
        </Container>
    );
};

export default EditCommentPage;
