import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './homePageBlogCard.css';

const HomePageBlogCard = ({ data }) => {
    const { title, writerName, updateDatetime } = data;
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    const date = new Date(updateDatetime);
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('tr-TR', options);

    return (
        <Link to={`/blog/${formattedTitle}`} state={{ data }} className='card-link'>

            <div className='qwerty'>
                <div className="hp-blog-meta-date ">
                    <span>{formattedDate}</span>
                </div>
            </div>

            <div className='homePageCard' style={{ backgroundImage: `url("/img/grey-column.jpg")` }}>
                <div className='hp-cardContent'>

                    <div>
                        <h4>{title}</h4>
                    </div>
                    <div className="hp-blog-meta-author">
                        <span>Yazan: {writerName}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default HomePageBlogCard;
