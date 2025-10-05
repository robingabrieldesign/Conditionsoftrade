document.addEventListener('DOMContentLoaded', function() {
    // Page transition effect
    setTimeout(function() {
        document.body.classList.remove('page-transition');
        document.body.classList.add('page-loaded');
    }, 100);
    
    // Add transition when navigating away
    window.addEventListener('beforeunload', function() {
        document.body.classList.remove('page-loaded');
        document.body.classList.add('page-transition-out');
    });
    
    // Vimeo video and sound control
    const iframe = document.getElementById('background-video');
    const player = new Vimeo.Player(iframe);
    const soundToggle = document.getElementById('sound-toggle');
    const soundText = document.getElementById('sound-text');

    player.setVolume(0);

    // Sound toggle functionality
    let isMuted = true; // Start muted

    soundToggle.addEventListener('click', function() {
        if (isMuted) {
            player.setVolume(1); // Unmute
            soundText.textContent = 'SOUND ON';
            isMuted = false;
        } else {
            player.setVolume(0); // Mute
            soundText.textContent = 'SOUND OFF';
            isMuted = true;
        }
    });

    // Add page transition for navigation links that trigger navigation
    const navLinks = document.querySelectorAll('.transition-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (!href || href.startsWith('#')) {
                return;
            }

            e.preventDefault();

            document.body.classList.remove('page-loaded');
            document.body.classList.add('page-transition-out');

            setTimeout(function() {
                window.location.href = href;
            }, 500); // Match to transition duration
        });
    });
});
