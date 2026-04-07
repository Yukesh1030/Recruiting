document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

    // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Statistics Counter Animation
    const startCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = value + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.textContent = target + suffix;
            }
        };
        requestAnimationFrame(animate);
    };

    // Scroll Animation Array Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.10 // Adjusted for better mobile trigger
        };

        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Trigger counters if this element contains them
                    const countersInEntry = entry.target.querySelectorAll('.counter');
                    countersInEntry.forEach(counter => startCounter(counter));
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 15, 25, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(17, 24, 39, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });
    // Candidate Search Filter (TalentPool.html)
    const candidateSearchInput = document.getElementById('candidateSearchInput');
    if (candidateSearchInput) {
        candidateSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const candidateCards = document.querySelectorAll('.candidate-card');
            
            candidateCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});
