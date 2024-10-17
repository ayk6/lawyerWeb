import './add-comment.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { utils } from '../../../utils/utils';
import { Button } from 'react-bootstrap';

const AddComment = ({ articleGuid, handleCommentSubmit }) => {
    const [loading, setLoading] = useState(false);

    const initialValues = {
        ...utils.initialValues.commentFormInitialValues,
        articleGuid
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={utils.validations.commentFormValidationSchema}
            onSubmit={handleCommentSubmit}
        >

            {({ isValid, touched }) => (
                <Form className="comment-form">

                    <h4>Bir yanıt yazın...</h4>
                    <span>(Telefon numaranız yayınlanmayacak)</span>
                    <Field
                        as="textarea"
                        name="commentText"
                        className={`comment-input input ${touched.commentText && 'touched'}`}
                        placeholder="Yanıt ekle..."
                    />
                    <ErrorMessage name="commentText" component="div" className="error" />

                    <div className='name-phone-section'>
                        <div className='name-section'>
                            <Field
                                type="text"
                                name="userName"
                                className={`user-name-input input ${touched.userName && 'touched'}`}
                                placeholder="Adınız*"
                            />
                            <ErrorMessage name="userName" component="div" className="error" />
                        </div>
                        <div className='phone-section'>
                            <Field name="userMobileNo">
                                {({ field }) => (
                                    <InputMask
                                        {...field}
                                        mask="(999) 999-9999"
                                        className={`user-mobile-input input ${touched.userMobileNo && 'touched'}`}
                                        placeholder="Telefon Numaranız*"
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="userMobileNo" component="div" className="error" />
                        </div>
                    </div>

                    <Button type="submit" className="comment-submit" disabled={!isValid || loading}>
                        {loading ? 'Gönderiliyor...' : 'Gönder'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default AddComment;
