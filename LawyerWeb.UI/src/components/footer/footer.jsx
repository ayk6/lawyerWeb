import React from 'react'
import "./footer.css"
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const social = {
        facebook: "my facebook",
        twitter: "my twitter",
        youtube: "my youtube"
    }
    const { pathname } = useLocation();

    return (

        <footer className="footer">
            <Container>
                <Row className='footer-grid'>
                    <Col sm={4} className="footer-logo-section col-xs-12">
                        <Link className='logo' to={"/"}>
                            <h5>LAWYER WEB</h5>
                        </Link>
                        <div><FaPhoneAlt /> 05.. ... .. ..</div>
                        <div><FaMapMarkerAlt /> adress</div>
                        <div><i class="fa fa-envelope" aria-hidden="true"></i> mail</div>
                        <div className="footer-social">
                            <ul>
                                <li>
                                    <a href={social ? social.facebook : "/"}>
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={social ? social.twitter : "/"}>
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href={social ? social.youtube : "/"}>
                                        <i className="fa fa-youtube"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={4} className="footer-section fs-menu">
                        <div className="footer-section-header"><h5 >MENÜ</h5></div>
                        <div><Link to={"about"} className={pathname === "/about" ? "active" : ""}><FaAngleRight /> HAKKIMIZDA</Link></div>
                        <div><Link to={"team"} className={pathname === "/team" ? "active" : ""}><FaAngleRight /> EKİBİMİZ</Link></div>
                        <div><Link to={"blog"} className={pathname === "/blog" ? "active" : ""}><FaAngleRight /> BLOG</Link></div>
                        <div><Link to={"career"} className={pathname === "/career" ? "active" : ""}><FaAngleRight /> KARİYER</Link></div>
                        <div><Link to={"contact"} className={pathname === "/contact" ? "active" : ""}><FaAngleRight /> İLETİŞİM</Link></div>

                    </Col>
                    <Col sm={4} className="footer-section col-xs-12 fs-corp">
                        <div className="footer-section-header"><h5 >KURUMSAL</h5></div>
                        <div>
                            <Link to={"corporate"}><FaAngleRight /> Kullanım Koşulları</Link>
                        </div>
                        <div>
                            <Link to={"corporate"}><FaAngleRight /> Gizlilik & Güvenlik</Link>
                        </div>
                        <div>
                            <Link to={"corporate"}><FaAngleRight /> KVKK Metni</Link>
                        </div>

                    </Col>
                </Row>
            </Container>
            <div class="copyright">
                <p>&copy; 2024 Lawyer Web. All rights reserved <span class="separator">||</span> <span class="developed">Developed by ....</span></p>
            </div>

        </footer>

    )
}

export default Footer