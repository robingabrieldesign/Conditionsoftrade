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
    
    // Time display elements
    const laTimeElement = document.getElementById('la-time');
    const mnTimeElement = document.getElementById('mn-time');
    
    // Update time function
    function updateTimes() {
        const now = new Date();
        
        // LA time (PST/PDT)
        const laOptions = { 
            timeZone: 'America/Los_Angeles', 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const laTime = now.toLocaleTimeString('en-US', laOptions);
        laTimeElement.textContent = laTime;
        
        // MN time (CST/CDT) - Minnesota
        const mnOptions = { 
            timeZone: 'America/Chicago', 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const mnTime = now.toLocaleTimeString('en-US', mnOptions);
        mnTimeElement.textContent = mnTime;
    }
    
    // Update time immediately and then every second
    updateTimes();
    setInterval(updateTimes, 1000);
    
    // Add page transition for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Apply transition out effect
            document.body.classList.remove('page-loaded');
            document.body.classList.add('page-transition-out');
            
            // Navigate to the new page after transition completes
            setTimeout(function() {
                window.location.href = href;
            }, 500); // Match this to your transition duration
        });
    });
});