import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './blogCard.css';

const HomePageBlogCard = ({ data }) => {
    const { title, writerName, updateDatetime } = data;
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    const date = new Date(updateDatetime);
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('tr-TR', options);

    return (

        <div className='blogCardContainer' style={{ backgroundImage: `url("/img/grey-column.jpg")` }}>
            <Link to={`/blog/${formattedTitle}`} state={{ data }} className='card-link'>
                <div className='cardContent'>
                    <div></div>
                    <div className="blog-meta-date ">
                        <span>{formattedDate}</span>
                    </div>
                    <div>
                        <h4>{title}</h4>
                    </div>
                    <div className="blog-meta-author">
                        <span>Yazan: {writerName}</span>
                    </div>
                </div>
            </Link>
        </div >
    );
};
export default HomePageBlogCard;
