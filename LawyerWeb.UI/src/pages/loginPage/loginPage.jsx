import React, { useEffect, useState, useRef } from 'react';
import "./loginPage.scss";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from '../../utils/utils';
import { useFormik } from 'formik';
import { services } from '../../services/services';
import { loginFailure, loginSuccess } from '../../redux/userSlice';
import { useToasts } from 'react-toast-notifications';

const LoginPage = () => {
    const { user } = useSelector((state) => state.user);
    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isFirstRender = useRef(true);

    const formik = useFormik({
        initialValues: utils.initialValues.loginFormInitialValues,
        validationSchema: utils.validations.loginFormValidationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const data = await services.user.login(values);
                services.encryptedLocalStorage.setItem("lawyerToken", data.token);
                const responseUser = await services.user.getUser();
                dispatch(loginSuccess(responseUser));
                addToast('Giriş Başarılı', { appearance: 'success' });
                navigate("/admin/categories");

                if (values.rememberMe) {
                    localStorage.setItem('username', values.username);
                    localStorage.setItem('password', values.password);
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                }
            } catch (error) {
                dispatch(loginFailure());
                addToast('Giriş Başarısız', { appearance: 'error' });
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (isFirstRender.current) {
            const savedUsername = localStorage.getItem('username');
            const savedPassword = localStorage.getItem('password');

            if (savedUsername && savedPassword) {
                formik.setFieldValue('username', savedUsername);
                formik.setFieldValue('password', savedPassword);
                formik.setFieldValue('rememberMe', true);
            }
            isFirstRender.current = false;
        }
    }, []);

    return (
        <Container className="login-container">
            <Row className="login-form-container">
                <Col xs={10} sm={6} lg={4} className="login-col m-0 col-xs-9">
                    <FaUsers size={200} className="user-icon" />
                    <Form noValidate className="login-form" onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Kullanıcı adı</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.username}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.password}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="rememberMe" className="rememberMe">
                            <Form.Check
                                type="checkbox"
                                label="Beni hatırla?"
                                name="rememberMe"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Button className="btn btn-custom login-btn" type="submit" variant="primary" block disabled={loading || user}>
                            {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
