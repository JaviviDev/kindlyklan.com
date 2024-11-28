document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Smooth Scrolling
    const smoothScrollButtons = document.querySelectorAll('.smooth-scroll');
    smoothScrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate Headings on Scroll
    const animateHeadings = document.querySelectorAll('.animate-heading');
    const observerOptions = {
        threshold: 0.1
    };

    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateHeadings.forEach(heading => {
        headingObserver.observe(heading);
    });

    // Carousel Functionality
    const initializeCarousel = (carouselSelector) => {
        const carousel = document.querySelector(carouselSelector);
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button.next');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        let slideWidth = slides[0].getBoundingClientRect().width;

        // Arrange the slides next to one another
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        const nextSlide = () => {
            const currentSlide = track.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;
            if(!nextSlide){
                nextSlide = slides[0];
            }
            moveToSlide(track, currentSlide, nextSlide);
        };

        const prevSlideFunc = () => {
            const currentSlide = track.querySelector('.current-slide');
            let prevSlide = currentSlide.previousElementSibling;
            if(!prevSlide){
                prevSlide = slides[slides.length -1];
            }
            moveToSlide(track, currentSlide, prevSlide);
        };

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlideFunc);

        // Auto Slide
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause on Hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach(setSlidePosition);
            const currentSlide = track.querySelector('.current-slide');
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        });
    };

    // Initialize Project Carousel
    initializeCarousel('.carousel');

    // Initialize Featured Videos Carousel
    initializeCarousel('.video-carousel');

    // Initialize Parallax.js
    const scene = document.getElementById('particles-js');
    if(scene){
        new Parallax(scene, {
            relativeInput: true
        });
    }

    // Smooth Transition from Video to Content
    const video = document.querySelector('.video-background');
    window.addEventListener('load', () => {
        setTimeout(() => {
            video.classList.add('fade-out');
            const loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.classList.remove('active');
        }, 2000); // Adjust delay as needed
    });

    // CSS for fade-out
    const style = document.createElement('style');
    style.innerHTML = `
        .video-background.fade-out {
            opacity: 0;
            transition: opacity 2s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});