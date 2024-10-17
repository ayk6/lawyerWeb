import './add-reply-comment.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { utils } from '../../../utils/utils';
import { Button } from 'react-bootstrap';

const AddReplyComment = ({ handleCommentSubmit, articleGuid, parentCommentGuid }) => {

    const initialValues = {
        ...utils.initialValues.commentReplyFormInitialValues,
        articleGuid,
        parentCommentGuid
    };

    const [loading, setLoading] = useState(false);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={utils.validations.commentReplyFormValidationSchema}
            onSubmit={handleCommentSubmit}
        >
            {({ isValid, touched }) => (
                <Form className="comment-form">
                    <Field
                        as="textarea"
                        name="commentText"
                        className={`comment-input input ${touched.commentText && 'touched'}`}
                        placeholder="Yanıt ekle..."
                    />
                    <ErrorMessage name="commentText" component="div" className="error" />

                    <div className='buttons'>
                        <Button type="submit" className="comment-submit" disabled={!isValid || loading}>
                            {loading ? 'Gönderiliyor...' : 'Gönder'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddReplyComment;
