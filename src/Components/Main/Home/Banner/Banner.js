import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner_05 from './../../../../imagesStatic/banner_05.jpg';
import Banner_07 from './../../../../imagesStatic/banner_07.jpg';
function Banner() {
    let currentSlide = 0;
    //auto Play
    let autoRunSlides = setInterval(() => {
        plusSlide(1);
    }, 4000);
    //initDots 
    const initDots = () => {
        const box = document.getElementsByClassName('dotsForBanner')[0];
        const totalBanner = document.getElementsByClassName('container__banner');
        for (let i = 0; i < totalBanner.length; i++) {
            let span = document.createElement('span');
            span.className = 'dot';
            span.addEventListener('click', () => {
                moveSlides(i);
            })
            box.appendChild(span);
        }
    }
    //moveDots
    const moveDots = (index) => {
        const box = document.getElementsByClassName('dotsForBanner')[0];
        const dots = box.getElementsByTagName('span');
        for (var i = 0; i < dots.length; i++) {
            if (i === index) {
                dots[i].style.width = '10px';
                dots[i].style.height = '10px';
                dots[i].style.background = '#e0e0e0';
            }
            else {
                dots[i].style.width = '12px';
                dots[i].style.height = '12px';
                dots[i].style.background = 'none';
            }
        }
    }
    //init slides
    const initalSlides = () => {
        const boxSlide = document.getElementsByClassName('container__banner-box')[0];
        const slides = boxSlide.getElementsByClassName('container__banner');
        slides[currentSlide].style.opacity = 1;
    }
    //when use click button
    const plusSlide = (n) => {
        handleContent();
        moveSlides(currentSlide + n);
    }
    //handle Logic moveSLide
    const moveSlides = (n) => {
        const boxSlide = document.getElementsByClassName('container__banner-box')[0];
        const slides = boxSlide.getElementsByClassName('container__banner');
        let current, next;
        const effect = {
            curent: '',
            next: ''
        }
        if (n > currentSlide) {
            if (n > slides.length - 1) { n = 0 }
            effect.curent = 'animate__zoomOutDown';
            effect.next = 'animate__zoomInDown';
        }
        else {
            if (n < 0) { n = slides.length - 1 }
            effect.curent = 'animate__rotateOutUpRight';
            effect.next = 'animate__rotateInUpRight';
        }
        if (n !== currentSlide) {
            next = slides[n];
            current = slides[currentSlide];
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = 0;
            }
            next.classList.add(effect.next);
            current.classList.add(effect.curent);
            slides[n].style.opacity = 1;
            next.addEventListener('animationend', () => {
                next.classList.remove(effect.next);
                current.classList.remove(effect.curent);
            });
            moveDots(n);
            handelShowContent(n, 0, 600);
            handelShowContent(n, 1, 800);
            handelShowContent(n, 2, 1000);
            handelShowContent(n, 3, 1200);
            currentSlide = n;
        }
    }

    //handele Content when moveSlide
    const handleContent = () => {
        const boxContent = document.getElementsByClassName('container__banner-content');
        for (let i = 0; i < boxContent.length; i++) {
            const contentForBanner = boxContent[i].getElementsByTagName('div');
            for (let j = 0; j < contentForBanner.length; j++) {
                contentForBanner[j].style.opacity = 0;
                contentForBanner[j].style.transform = 'translateX(-120%)';
            }
        }
    }
    //create timer when show content 
    const handelShowContent = (n, index, timer) => {
        const boxContent = document.getElementsByClassName('container__banner-content');
        setTimeout(() => {
            for (let i = 0; i < boxContent.length; i++) {
                if (n === i) {
                    const contentForBanner = boxContent[i].getElementsByTagName('div')[index];
                    contentForBanner.style.opacity = 1;
                    contentForBanner.style.transform = 'translateX(0%)';
                }
            }
        }, timer)
    }
    //when start
    useEffect(() => {
        //effect init slideshow 
        initDots();
        handleContent();
        initalSlides();
        handelShowContent(0, 0, 300);
        handelShowContent(0, 1, 500);
        handelShowContent(0, 2, 700);
        handelShowContent(0, 3, 900);
        moveDots(0);
        //end 
    })
    //this effect will run when component unmouting
    useEffect(() => {
        return () => {
            clearInterval(autoRunSlides);
        }
    });
    return (
        <div className="banner">
            <div className='container__banner-box'>
                <div className='container__banner animate__animated'>
                    <img src={Banner_05} className='banner__img' alt="image__banner" />
                    <div className='container__banner-content'>
                        <div><i className="fa fa-apple" aria-hidden="true"></i>MACBOOK PRO 2019</div>
                        <div>Hiệu năng bứt phá ,trải nghiệm tối đa</div>
                        <div>Intel core i5 | 13.3" | 256G</div>
                        <div><Link to='/Detail/laptop-macbook-pro-touch-16-inch-2019-i7-26ghz16gb512gb4gb-radeon-pro-5300m.7774.html'>Xem chi tiết</Link></div>
                    </div>
                </div>
                <div className='container__banner animate__animated'>
                    <img src={Banner_07} className='banner__img' alt="image__banner" />
                    <div className='container__banner-content'>
                        <div><i className="fa fa-apple" aria-hidden="true"></i>MACBOOK AIR 2020</div>
                        <div>Một sản phẩm nổi tiếng của apple</div>
                        <div>Intel core i5 | 13.3" | 128G</div>
                        <div><Link to='/Detail/laptop-apple-macbook-air-2020-i3-11ghz-8gb256gb-mwtj2saa.573.html'>Xem chi tiết</Link></div>
                    </div>
                </div>
            </div>
            <div className="derectional__box">
                <i onClick={() => plusSlide(-1)} className="fa fa-chevron-left" aria-hidden="true"></i>
                <i onClick={() => plusSlide(1)} className="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
            <div className='dotsForBanner'></div>
        </div>
    );
}

export default Banner;