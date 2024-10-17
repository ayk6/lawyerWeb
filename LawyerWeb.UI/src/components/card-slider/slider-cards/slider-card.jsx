import React from 'react'
import "./slider-card.scss"

const SliderCard = ({ cardData }) => {
    return (
        <div className='slider-card-div slider-card-img' style={{ backgroundImage: `url(${cardData.img})` }}>
            <div className='slider-card-text'>
                <h4>{cardData.name}</h4>
            </div>
        </div>
    )
}

export default SliderCard;
