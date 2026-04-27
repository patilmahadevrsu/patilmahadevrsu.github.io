// ========================================
// PATIL EXOTIC VEGETABLES - JAVASCRIPT
// ========================================

// ==================== TYPING EFFECT ====================

const typingText = document.getElementById('typingText');
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
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }
    
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

// Start typing effect when page loads
if (typingText) {
    type();
}

// ==================== NAVBAR FUNCTIONALITY ====================

const navbar = document.querySelector('.navbar');
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveLink();
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ACTIVE LINK HIGHLIGHT ====================

// ==================== ACTIVE LINK HIGHLIGHT (URL & SCROLL AWARE) ====================

function updateActiveLink() {
    const currentPath = window.location.pathname;
    const currentFilename = currentPath.split('/').pop() || 'index.html';
    
    // 1. First, handle dedicated pages (URL based)
    if (currentFilename === 'products.html') {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes('products.html')) {
                link.classList.add('active');
            }
        });
        return; // Stop here for dedicated pages
    }

    // 2. Handle single-page scroll logic (for index.html)
    const sections = document.querySelectorAll('section[id]');
    let currentSectionId = 'home'; // Default to home

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // If the top of the section is near the top of the viewport
        if (rect.top <= 200 && rect.bottom >= 200) {
            currentSectionId = section.id;
        }
    });

    // Special case: If we are at the very bottom of the page, highlight Contact
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

// ==================== DARK MODE TOGGLE ====================

const darkModeToggle = document.getElementById('darkModeToggle');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.style.animation || 'none';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[class*="fade-in"], [class*="slide"]').forEach(el => {
    observer.observe(el);
});

// ==================== NUMBER COUNTER ANIMATION ====================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Start animation when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

animateCounters();

// ==================== ADD TO CART FUNCTIONALITY ====================

function addToCart(productName) {
    const toast = document.getElementById('toast');
    toast.textContent = `${productName} added to cart! 🛒`;
    toast.classList.add('show');
    
    // Remove animation class to allow re-triggering
    toast.style.animation = 'none';
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease forwards';
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== FORM SUBMISSION ====================

const contactForm = document.getElementById('contactForm');

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Show success message
    const toast = document.getElementById('toast');
    toast.textContent = '✓ Message sent successfully! We\'ll contact you soon.';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
    
    // Reset form
    contactForm.reset();
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email });
}

// ==================== SCROLL REVEAL ANIMATIONS ====================

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -75px 0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Apply scroll reveal to products, features, testimonials
document.querySelectorAll('.product-card, .feature-card, .testimonial-card, .info-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.classList.add('reveal-item');
    revealOnScroll.observe(el);
});

// Add reveal animation styles
const style = document.createElement('style');
style.textContent = `
    .reveal-item.reveal {
        animation: slideUp 0.8s ease forwards !important;
        opacity: 1 !important;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== LAZY LOADING IMAGES ====================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PARALLAX EFFECT ====================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[class*="parallax"]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        
        if (scrollPosition + window.innerHeight > elementOffset) {
            const yPos = (scrollPosition - elementOffset) * 0.5;
            element.style.backgroundPosition = `center ${yPos}px`;
        }
    });
});

// ==================== MOBILE MENU CLOSE ON SCROLL ====================

window.addEventListener('scroll', () => {
    const hamburger = document.getElementById('hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    }
});

// ==================== PREVENT BODY SCROLL WHEN MENU IS OPEN ====================

hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// ==================== ACCESSIBILITY - KEYBOARD NAVIGATION ====================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown') {
        const sections = Array.from(document.querySelectorAll('section')).map(s => s.id);
        const currentSectionIndex = navLinks.findIndex(link => link.classList.contains('active'));
        
        if (currentSectionIndex < sections.length - 1) {
            const nextSection = document.querySelector(`#${sections[currentSectionIndex + 1]}`);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// ==================== PRELOAD IMAGES ====================

function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1488459716781-6918f33ce719?w=1600&q=80',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300&q=80',
        'https://images.unsplash.com/photo-1566996122193-25ea014d70a5?w=300&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);

// ==================== PERFORMANCE OPTIMIZATION ====================

// Debounce function for scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    updateActiveLink();
}, 100));

// ==================== PAGE LOAD ANIMATION ====================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    const animatedElements = document.querySelectorAll('[class*="fade-in"], [class*="slide"]');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Update active link on page load
    updateActiveLink();
    
    // Log initialization
    console.log('🌿 Patil Exotic Vegetables - Website Initialized');
});

// ==================== SERVICE WORKER REGISTRATION ====================

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// ==================== ANALYTICS ====================

function trackEvent(eventName, eventData) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: button.textContent.trim()
        });
    });
});

// ==================== EXPORT FUNCTIONS ====================

window.addToCart = addToCart;
window.handleFormSubmit = handleFormSubmit;