import React, { useEffect, useState } from 'react';
import './charachter.css';
import averroes from './assets/averroes.png';
import epicor from './assets/epicor.png';
import pyth from './assets/pyth.png';
import raphaello from './assets/raphaello.png';
import socrate from './assets/socrate.png';
import zeno from './assets/zeno.png';
import Home from '../ft_home/home';
import { useNavigate } from 'react-router-dom';

const Charachter = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Move the slider definition inside the useEffect hook
        const slider = document.querySelector("[data-slider]");
        if (!slider) return; // Check if slider exists

        const track = slider.querySelector("[data-slider-track]");
        const prev = slider.querySelector("[data-slider-prev]");
        const next = slider.querySelector("[data-slider-next]");

        const handlePrevClick = () => {
            next.removeAttribute("disabled");

            track.scrollTo({
                left: track.scrollLeft - track.firstElementChild.offsetWidth,
                behavior: "smooth"
            });
        };

        const handleNextClick = () => {
            prev.removeAttribute("disabled");

            track.scrollTo({
                left: track.scrollLeft + track.firstElementChild.offsetWidth,
                behavior: "smooth"
            });
        };

        const handleScroll = () => {
            const trackScrollWidth = track.scrollWidth;
            const trackOuterWidth = track.clientWidth;

            prev.removeAttribute("disabled");
            next.removeAttribute("disabled");

            if (track.scrollLeft <= 0) {
                prev.setAttribute("disabled", "");
            }

            if (track.scrollLeft === trackScrollWidth - trackOuterWidth) {
                next.setAttribute("disabled", "");
            }
        };

        if (track) {
            prev.addEventListener("click", handlePrevClick);
            next.addEventListener("click", handleNextClick);
            track.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (track) {
                prev.removeEventListener("click", handlePrevClick);
                next.removeEventListener("click", handleNextClick);
                track.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const [selectedSlide, setSelectedSlide] = useState(null); // State to store the selected slide

    // Function to handle click on a slide
    const handleSlideClick = (slideName) => {
        // Set the selected slide based on the slide name
        setSelectedSlide(slideName);
        navigate('../Home');
    };

    return (
        <div className="charachter">
            <div className="Char">
                <div className="slider" data-slider>
                    <div className="slider-title">
                        <div>
                            <p className="title-">Shop By Category</p>
                            <p className="main_title">Our Collections</p>
                        </div>
                        <div className="slider__buttons">
                            <button className="slider__button" data-slider-prev disabled>
                                <i className="fa fa-angle-left"></i>
                            </button>
                            <button className="slider__button" data-slider-next>
                                <i className="fa fa-angle-right"></i>
                            </button>
                        </div>
                    </div>

                    <ul className="slider__track" data-slider-track>
                        <li>
                            <div className="slide" onClick={() => handleSlideClick('Averroes')}>
                                <img src={averroes} className="slideimg" />
                                <div className="slide_content">
                                    <p>Averroes</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="slide" onClick={() => handleSlideClick('Max Jett')}>
                                <img src={zeno} className="slideimg" />
                                <div className="slide_content">
                                    <p>Max Jett</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Charachter;
