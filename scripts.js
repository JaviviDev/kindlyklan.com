document.addEventListener("DOMContentLoaded", () => {
    particlesJS.load('particles-js', 'particles-config.json', function() {
        console.log('particles.js loaded - callback');
    });

    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
    });

    const parallaxContainer = document.getElementById('parallax-container');
    if (parallaxContainer) {
        const parallaxInstance = new Parallax(parallaxContainer);
    } else {
        console.error('Parallax container not found');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Función que mueve el carrusel de los proyectos
    let currentSlide = 0;

    window.moveCarousel = function(direction) {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width;

        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        const amountToMove = -currentSlide * slideWidth;

        track.style.transform = `translateX(${amountToMove}px)`;
    }

    function autoMoveCarousel() {
        moveCarousel(1);
        setTimeout(autoMoveCarousel, 5000); // Cambia cada 5 segundos
    }

    autoMoveCarousel();
});