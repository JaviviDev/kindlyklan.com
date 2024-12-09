document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 80,
        disable: 'mobile'
    });

    // Configuración inicial del header y hero
    const header = document.querySelector('header');
    const hero = document.querySelector('#hero');
    
    if (header && hero) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.zIndex = '1000';
        hero.style.marginTop = '80px';
    }

    // Smooth Scrolling
    const smoothScrollButtons = document.querySelectorAll('.smooth-scroll');
    smoothScrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Funcionalidad del Carrusel
    const initCarousel = (carouselSelector) => {
        const carousel = document.querySelector(carouselSelector);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-slides, .carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button.next');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        const indicatorsContainer = carousel.querySelector('.carousel-indicators');

        let currentIndex = 0;
        let intervalId = null;

        // Crear indicadores
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = Array.from(indicatorsContainer.children);

        // Actualizar slides
        const updateSlides = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
                indicators[index].classList.toggle('active', index === currentIndex);
            });
            
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
        };

        // Siguiente slide
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        };

        // Slide anterior
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        };

        // Ir a un slide específico
        const goToSlide = (index) => {
            currentIndex = index;
            updateSlides();
            resetInterval();
        };

        // Reiniciar intervalo
        const resetInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, 5000);
        };

        // Event listeners para botones
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Soporte táctil
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(intervalId);
        }, { passive: true });

        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
            }
            resetInterval();
        }, { passive: true });

        // Pausar en hover
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', resetInterval);

        // Iniciar autoplay
        resetInterval();
    };

    // Inicializar carruseles
    setTimeout(() => {
        initCarousel('.carousel-container');
        initCarousel('.video-carousel');
    }, 100);

    // Transición suave del video de fondo
    const video = document.querySelector('.video-background');
    if (video) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                video.classList.add('fade-out');
            }, 2000);
        });
    }

    // Estilos dinámicos
    const style = document.createElement('style');
    style.innerHTML = `
        header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            z-index: 1000 !important;
            background: rgba(32, 35, 42, 0.95) !important;
        }
        
        #hero {
            padding-top: 80px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .animate-heading {
            opacity: 1 !important;
            transform: none !important;
        }
        
        .video-background.fade-out {
            opacity: 0.3;
            transition: opacity 2s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // Cargar Header y Footer
    fetch('header.html')
        .then(response => response.text())
        .then(data => document.getElementById('header-placeholder').innerHTML = data);

    fetch('footer.html')
        .then(response => response.text())
        .then(data => document.getElementById('footer-placeholder').innerHTML = data);

    // Mostrar/Ocultar Descripción
    const toggleButton = document.getElementById('toggle-description');
    const shortDescription = document.getElementById('short-description');
    const longDescription = document.getElementById('long-description');

    toggleButton.addEventListener('click', () => {
        if (longDescription.classList.contains('hidden')) {
            longDescription.classList.remove('hidden');
            toggleButton.textContent = 'Mostrar menos';
        } else {
            longDescription.classList.add('hidden');
            toggleButton.textContent = 'Mostrar más';
        }
    });

    // Carrusel
    const carousel = document.querySelector('.carousel');
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');

    let currentIndex = 0;

    const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Soporte táctil
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            currentIndex = (currentIndex + 1) % slides.length;
        } else if (endX - startX > 50) {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateCarousel();
    });
});

// Modificar en scripts.js
const initVideoCarousel = () => {
    const carousel = document.querySelector('.video-carousel');
    const track = carousel.querySelector('.video-track');
    const items = carousel.querySelectorAll('.video-item');
    const prev = carousel.querySelector('.video-nav.prev');
    const next = carousel.querySelector('.video-nav.next');
    
    let position = 0;
    const itemWidth = items[0].offsetWidth + 20; // Including gap
    const visibleItems = Math.floor(track.offsetWidth / itemWidth);
    
    // Navigation
    const move = (direction) => {
        const limit = -(items.length - visibleItems) * itemWidth;
        position = Math.max(Math.min(position + (direction * itemWidth), 0), limit);
        track.style.transform = `translateX(${position}px)`;
    };
    
    prev.addEventListener('click', () => move(1));
    next.addEventListener('click', () => move(-1));
    
    // Touch support
    let touchStart = 0;
    let touchEnd = 0;
    
    track.addEventListener('touchstart', e => {
        touchStart = e.changedTouches[0].clientX;
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
        touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) move(-1);
        if (touchEnd - touchStart > 50) move(1);
    }, { passive: true });
    
    // Video modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <iframe width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    
    const iframe = modal.querySelector('iframe');
    const close = modal.querySelector('.modal-close');
    
    items.forEach(item => {
        item.addEventListener('click', () => {
            const videoUrl = item.querySelector('.video-thumbnail').dataset.video;
            iframe.src = videoUrl;
            modal.classList.add('active');
        });
    });
    
    close.addEventListener('click', () => {
        modal.classList.remove('active');
        iframe.src = '';
    });
    
    // Window resize handling
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            position = 0;
            track.style.transform = `translateX(0)`;
        }, 250);
    });
};

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', initVideoCarousel);
//                    <a href="" class="project-link">Ver más</a>
function redirectToPartner() {
    window.location.href = 'https://holy.gg';
  }