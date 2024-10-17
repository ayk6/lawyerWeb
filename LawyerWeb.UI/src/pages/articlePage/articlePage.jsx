import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../components/pageHeader/page-header';
import AddComment from '../../components/comment/addComment/add-comment';
import Comment from '../../components/comment/comment';
import "./articlePage.css"
import { services } from '../../services/services';
import { useToasts } from 'react-toast-notifications';
import ShareButtons from '../../components/shareButtons/shareButtons';

const ArticlePage = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        if (data) {
            fetchComments();
        }
    }, [data]);

    const fetchComments = async () => {
        setLoading(true);
        try {
            console.log(data)
            const result = await services.comment.getCommentByArticleId(data.guid);
            setComments(result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const response = await services.comment.postComment(values);
            console.log('Comment submitted:', response);
            addToast('Yorum kaydedildi.', { appearance: 'success' });
            resetForm();
            fetchComments();
        } catch (error) {
            console.error('Error updating comment:', error);
            let errorMessage = 'Yorum kaydedilirken bir hata oluştu.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            addToast(`Yorum kaydedilemedi:\n ${errorMessage}`, { appearance: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleCommentDelete = async (id) => {
        setLoading(true);
        try {
            const response = await services.comment.deleteCommentById(id);
            addToast('Yorum silindi.', { appearance: 'success' });
            fetchComments();
        } catch (error) {
            addToast(`Yorum silinemedi!`, { appearance: 'error' });
            console.error('Error submitting comment:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!data) {
        return <p>Veri bulunamadı!</p>;
    }

    const { guid, title, content, writerName, updateDatetime } = data;
    const date = new Date(updateDatetime);
    const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '.');

    return (
        <>
            <PageHeader title="LAWYER WEB BLOG" />
            <div className="article-container container">
                <h5 className='article-date'>{formattedDate}</h5>
                <h1 className="article-title">{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <h4 className="article-author">Yazan: {writerName}</h4>
                <ShareButtons articleUrl={window.location.href} />

            </div>

            <div className="article-comment-container container">
                <AddComment articleGuid={guid} handleCommentSubmit={handleCommentSubmit} />
                {loading ? (
                    <p>Loading comments...</p>
                ) : (
                    comments && comments.length ? (
                        <div>
                            {comments.map((comment) => (
                                <Comment
                                    key={comment.guid}
                                    comment={comment}
                                    articleGuid={guid}
                                    handleCommentDelete={handleCommentDelete}
                                    handleCommentSubmit={handleCommentSubmit}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='no-comment'>
                            <p>Henüz yorum bulunmamaktadır. İlk yorum yapan siz olun.</p>
                        </div>
                    )
                )}

            </div>
        </>
    );
};

export default ArticlePage;
