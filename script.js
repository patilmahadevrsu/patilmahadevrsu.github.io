// ========================================
// PATIL EXOTIC VEGETABLES - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ==================== TYPING EFFECT ====================
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const phrases = [
            'Fresh from Farm to Your Table',
            'Organic & Healthy',
            'Best Quality Guaranteed',
            'Direct from Farmers'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) charIndex--;
            else charIndex++;
            
            typingText.textContent = currentPhrase.substring(0, charIndex);
            
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // ==================== NAVBAR & NAVIGATION ====================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navbar && window) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
            updateActiveLink();
        });
    }

    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ==================== ACTIVE LINK LOGIC ====================
    function updateActiveLink() {
        const currentPath = window.location.pathname;
        const currentFilename = currentPath.split('/').pop() || 'index.html';
        
        if (currentFilename === 'products.html') {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes('products.html')) link.classList.add('active');
            });
            return;
        }

        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = 'home';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) currentSectionId = section.id;
        });

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSectionId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}` || (currentSectionId === 'home' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }

    // ==================== THEME TOGGLE ====================
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // ==================== ANIMATIONS (Intersection Observer) ====================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[class*="fade-in"], .product-card, .feature-card, .testimonial-card, .info-card, .timeline-item').forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // ==================== COUNTERS ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            const updateCount = () => {
                const current = parseInt(counter.innerText) || 0;
                const inc = target / 50;
                if (current < target) {
                    counter.innerText = Math.ceil(current + inc) + suffix;
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + suffix;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    updateCount();
                    counterObserver.unobserve(entries[0].target);
                }
            });
            counterObserver.observe(counter);
        });
    }
    animateCounters();

    // ==================== CONTACT FORM = [MODIFIED] ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const toast = document.getElementById('toast');
            if (toast) {
                toast.textContent = '✓ Message sent successfully! We\'ll contact you soon.';
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 3000);
            }
            contactForm.reset();
        });
    }

    // Initialize Active Link
    updateActiveLink();
    console.log('🌿 Patil Exotic Vegetables - Website Initialized Safely');
});

// Global Helpers
window.addToCart = function(productName) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = `${productName} added to cart! 🛒`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};