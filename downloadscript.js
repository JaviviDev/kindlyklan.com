document.addEventListener("DOMContentLoaded", () => {
    const downloadButtons = {
        apple: document.getElementById('download-apple'),
        windows: document.getElementById('download-windows'),
        linux: document.getElementById('download-linux')
    };
    AOS.init({
        duration: 1000,
        once: true
    });

    const container = document.querySelector('.container');
    const loadingScreen = document.getElementById('loading-screen');

    async function fetchReleases() {
        try {
            const response = await fetch('https://api.github.com/repos/javivi09dev/KindlyKlanLauncher/releases/latest');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            console.log('Release data:', data);

            data.assets.forEach(asset => {
                const name = asset.name.toLowerCase();
                const url = asset.browser_download_url;

                if (name.includes('.dmg') && !name.includes('.blockmap') && name.includes('x64')) {
                    downloadButtons.apple.href = url;
                    downloadButtons.apple.dataset.version = data.tag_name;
                } else if (name.includes('.exe') && !name.includes('.blockmap')) {
                    downloadButtons.windows.href = url;
                    downloadButtons.windows.dataset.version = data.tag_name;
                } else if (name.includes('.appimage') && !name.includes('.blockmap')) {
                    downloadButtons.linux.href = url;
                    downloadButtons.linux.dataset.version = data.tag_name;
                }
            });

            // Add version numbers to buttons
            Object.values(downloadButtons).forEach(button => {
                if (button.dataset.version) {
                    const span = document.createElement('span');
                    span.className = 'version';
                    span.textContent = ` (${button.dataset.version})`; 
                    button.appendChild(span);
                }
            });

        } catch (error) {
            console.error('Error fetching releases:', error);
            showError('Error loading download links. Please try again later.');
        }
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        container.prepend(errorDiv);
    }

    // Inicializar
    fetchReleases();
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('active');
            container.classList.add('visible');
        }, 1000);
    });
    Object.values(downloadButtons).forEach(button => {
        button.addEventListener('click', (e) => {
            const platform = button.id.replace('download-', '');
            console.log(`Download started for ${platform}`);
        });
    });
});
