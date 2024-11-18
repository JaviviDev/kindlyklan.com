document.addEventListener("DOMContentLoaded", () => {
    particlesJS.load('particles-js', 'particles-config.json', function() {
        console.log('particles.js loaded - callback');
            console.log('Script cargado correctamente.');

            const downloadApple = document.getElementById('download-apple');
            const downloadWindows = document.getElementById('download-windows');
            const downloadLinux = document.getElementById('download-linux');

            // Fetch de los releases de GitHub
            fetch('https://api.github.com/repos/javivi09dev/KindlyKlanLauncher/releases/latest')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Datos del release:', data); // Debug
                    const assets = data.assets;

                    // Mapear los archivos según el sistema operativo
                    assets.forEach(asset => {
                        const name = asset.name.toLowerCase();

                        if (name.includes('.dmg') && name.includes('x64')) {
                            // Archivo para macOS x64
                            downloadApple.href = asset.browser_download_url;
                        } else if (name.includes('.exe')) {
                            // Archivo para Windows
                            downloadWindows.href = asset.browser_download_url;
                        } else if (name.includes('.appimage')) {
                            // Archivo para Linux
                            downloadLinux.href = asset.browser_download_url;
                        }
                    });
                })
                .catch(error => console.error('Error fetching the latest release:', error));
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
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.querySelector('.container');

    // Eliminar el cargador después de que la página se haya cargado
    setTimeout(() => {
        loadingScreen.classList.add('active'); // Aplica el efecto de difuminado y desaparece el cargador
        content.style.opacity = '1'; // Muestra el contenido de la página
    }, 1000); // Tiempo de espera para que la animación de carga sea visible
});