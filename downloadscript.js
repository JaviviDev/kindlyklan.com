document.addEventListener("DOMContentLoaded", () => {
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

            assets.forEach(asset => {
                const name = asset.name.toLowerCase();

                if (name.includes('.dmg') && !name.includes('.blockmap') && name.includes('x64')) {
                    downloadApple.href = asset.browser_download_url;
                    console.log('Archivo macOS asignado:', asset.browser_download_url);
                } else if (name.includes('.exe') && !name.includes('.blockmap')) {
                    downloadWindows.href = asset.browser_download_url;
                    console.log('Archivo Windows asignado:', asset.browser_download_url);
                } else if (name.includes('.appimage') && !name.includes('.blockmap')) {
                    downloadLinux.href = asset.browser_download_url;
                    console.log('Archivo Linux asignado:', asset.browser_download_url);
                }
            });
        })
        .catch(error => console.error('Error fetching the latest release:', error));
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
