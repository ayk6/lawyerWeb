import React, { useRef, useState, useEffect } from 'react';
import './card-slider.scss'
import SliderCard from './slider-cards/slider-card';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Carousel = () => {
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const firstCardRef = useRef(null);
    const [cardPerView, setCardPerView] = useState(1);

    useEffect(() => {
        if (carouselRef.current) {
            const firstCardWidth = firstCardRef.current.offsetWidth;
            const cardPerView = Math.round(carouselRef.current.offsetWidth / firstCardWidth);
            setCardPerView(cardPerView);

            const carouselChildrens = [...carouselRef.current.children];
            carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
                carouselRef.current.insertAdjacentHTML("afterbegin", card.outerHTML);
            });
            carouselChildrens.slice(0, cardPerView).forEach(card => {
                carouselRef.current.insertAdjacentHTML("beforeend", card.outerHTML);
            });

            carouselRef.current.classList.add("no-transition");
            carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
            carouselRef.current.classList.remove("no-transition");
        }
    }, []);

    const dragStart = (e) => {
        setIsDragging(true);
        carouselRef.current.classList.add("dragging");
        setStartX(e.pageX);
        setStartScrollLeft(carouselRef.current.scrollLeft);
    };

    const dragging = (e) => {
        if (!isDragging) return;
        carouselRef.current.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
        setIsDragging(false);
        carouselRef.current.classList.remove("dragging");
    };

    const sliderCardsData = [
        { name: "Sigorta Hukuku", img: "img/slider/insurance.jpg" },
        { name: "Ceza hukuku", img: "img/slider/handcuffs-books.jpg" },
        { name: "Uluslararası Hukuk", img: "img/slider/globe-desk.jpg" },
        { name: "Aile Hukuku", img: "img/slider/family-law.jpg" },
        { name: "Fikri Mülkiyet", img: "img/slider/int-prop-law.jpg" },
        { name: "Bilişim Hukuku", img: "img/slider/IT-law.jpg" },
    ];

    const infiniteScroll = () => {
        if (carouselRef.current.scrollLeft === 0) {
            carouselRef.current.classList.add("no-transition");
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth - (2 * carouselRef.current.offsetWidth);
            carouselRef.current.classList.remove("no-transition");
        } else if (Math.ceil(carouselRef.current.scrollLeft) === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
            carouselRef.current.classList.add("no-transition");
            carouselRef.current.scrollLeft = carouselRef.current.offsetWidth;
            carouselRef.current.classList.remove("no-transition");
        }
        clearTimeout(timeoutId);
        if (!carouselRef.current.parentNode.matches(":hover")) {
            autoPlay();
        }
    };

    const autoPlay = () => {
        if (!isAutoPlay || !carouselRef.current) return;
        setTimeoutId(setTimeout(() => {
            if (!carouselRef.current) return;
            carouselRef.current.scrollLeft += firstCardRef.current.offsetWidth;
        }, 2500));
    };

    useEffect(() => {
        autoPlay();
        return () => clearTimeout(timeoutId);
    }, [isAutoPlay]);

    const scrollLeft = () => {
        carouselRef.current.scrollLeft -= firstCardRef.current.offsetWidth;
    };

    const scrollRight = () => {
        carouselRef.current.scrollLeft += firstCardRef.current.offsetWidth;
    };

    const handleMouseEnter = () => {
        setIsAutoPlay(false);
        clearTimeout(timeoutId);
    };

    const handleMouseLeave = () => {
        setIsAutoPlay(true);
        autoPlay();
    };


    return (
        <div className="card-slider-container container">
            <button className="card-slider-button left" onClick={scrollLeft}>
                <IoIosArrowBack />
            </button>
            <div className="card-slider "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <ul ref={carouselRef} className="carousel"
                    onMouseDown={dragStart}
                    onMouseMove={dragging}
                    onMouseUp={dragStop}
                    onScroll={infiniteScroll}>
                    {sliderCardsData.map((card, index) => (
                        <li key={index} ref={index === 0 ? firstCardRef : null} className="card">
                            <SliderCard cardData={card} />
                        </li>
                    ))}
                </ul>
            </div>
            <button className="card-slider-button right" onClick={scrollRight}>
                <IoIosArrowForward />
            </button>
        </div>

    );
};

export default Carousel;
