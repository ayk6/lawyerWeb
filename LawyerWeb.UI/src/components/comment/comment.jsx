import React, { useState } from 'react';
import './comment.css';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FaReply, FaTrash } from 'react-icons/fa';
import AddReplyComment from './addReplyComment/add-reply-comment';
import { RiCloseLine } from 'react-icons/ri';

const Comment = ({ comment, handleCommentSubmit, articleGuid, handleCommentDelete, isNested = false }) => {
    const { userName, updateDatetime, commentText, replyCommentVmList, guid } = comment;
    const { user } = useSelector((state) => state.user);
    const date = new Date(updateDatetime);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleReplyClick = () => {
        setShowReplyModal(true);
    };

    const handleCloseReplyModal = () => {
        setShowReplyModal(false);
        setReplyText('');
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        await handleCommentDelete(guid);
        setShowDeleteModal(false);
    };

    const profileImage = isNested ? "/img/LawProfile.png" : "/img/NoProfile.png";

    return (
        <div className='comment-container'>
            <div className="article-comment-card">
                <div className="comment-media">
                    <div className="media-body">
                        <div className="comment-header">
                            <div className="user-info">
                                <img className="rounded-circle" alt="Profile" src={profileImage} />
                                <div>
                                    <h5>{userName}</h5>
                                    <span className='comment-time'>
                                        {formattedDate}
                                    </span>
                                </div>
                            </div>
                            <span className='admin-buttons'>
                                {user && (
                                    <>
                                        {showReplyModal ? (
                                            <Button onClick={handleCloseReplyModal} variant='danger' className="comment-reply-close" title='yanıt bölmesini kapat'>
                                                <RiCloseLine />
                                            </Button>
                                        ) : (
                                            replyCommentVmList.length === 0 && (
                                                <div className="comment-reply">
                                                    <Button variant="link" onClick={handleReplyClick} title='yorumu yanıtla'>
                                                        <FaReply /> yanıtla
                                                    </Button>
                                                </div>
                                            )
                                        )}
                                        <Button onClick={handleShowDeleteModal} variant='danger' className="comment-delete" title='yorumu sil'>
                                            <FaTrash />
                                        </Button>
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="comment-body">
                            {commentText}
                        </div>
                    </div>
                </div>
                {
                    replyCommentVmList && replyCommentVmList.length > 0 && (
                        <div className="nested-comment">
                            {replyCommentVmList.map(reply => (
                                <Comment
                                    key={reply.guid}
                                    comment={reply}
                                    handleCommentDelete={handleCommentDelete}
                                    isNested={true} />
                            ))}
                        </div>
                    )
                }
                {showReplyModal && <>
                    <AddReplyComment
                        handleCommentSubmit={handleCommentSubmit}
                        parentCommentGuid={guid}
                        articleGuid={articleGuid} />
                </>}
            </div >
            <div className={`modal fade ${showDeleteModal ? 'in' : ''}`} tabIndex="-1" role="dialog" style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={handleCloseDeleteModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3 className="modal-title">Yorumu Sil</h3>
                        </div>
                        <div className="modal-body">
                            <p>Yorumu silmek istediğinizden emin misiniz?</p>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-danger" onClick={handleDelete}>Sil</Button>
                            <Button type="button" className="btn btn-default" onClick={handleCloseDeleteModal}>İptal</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Comment;
