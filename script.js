// ========== SMOOTH SCROLLING & NAVBAR ==========
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    burger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        burger.classList.toggle('active');

        // Animate burger
        const spans = burger.querySelectorAll('span');
        if (burger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            burger?.classList.remove('active');

            const spans = burger?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar?.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
            // Scroll down
            navbar?.classList.remove('scroll-up');
            navbar?.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
            // Scroll up
            navbar?.classList.remove('scroll-down');
            navbar?.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // ========== ANIMATE ON SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== SCROLL INDICATOR CLICK ==========
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator?.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });

    // ========== HERO TITLE TYPING EFFECT ==========
    const heroWords = document.querySelectorAll('.hero-title .word');

    heroWords.forEach((word, index) => {
        const text = word.getAttribute('data-word');
        word.textContent = '';

        setTimeout(() => {
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < text.length) {
                    word.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        }, index * 800);
    });

    // ========== PRINCIPLE CARDS HOVER EFFECT ==========
    const principleCards = document.querySelectorAll('.principle-card');

    principleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.staff-item .count');

    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========== PARALLAX EFFECT FOR HERO ==========
    const heroSection = document.querySelector('.hero');
    const floatingShapes = document.querySelectorAll('.floating-shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = heroSection?.offsetHeight || 0;

        if (scrolled < heroHeight) {
            floatingShapes.forEach((shape, index) => {
                const speed = 0.05 + (index * 0.02);
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
            });
        }
    });

    // ========== TARIFF BOX INTERACTION ==========
    const tariffBoxes = document.querySelectorAll('.tariff-box');

    tariffBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            tariffBoxes.forEach(b => {
                if (b !== this) {
                    b.style.opacity = '0.7';
                    b.style.transform = 'scale(0.95)';
                }
            });
        });

        box.addEventListener('mouseleave', function() {
            tariffBoxes.forEach(b => {
                b.style.opacity = '1';
                b.style.transform = 'scale(1)';
            });
        });
    });

    // ========== SERVICE ITEMS TILT EFFECT ==========
    const serviceItems = document.querySelectorAll('.service-item');

    serviceItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ========== PHONE NUMBERS ANIMATION ==========
    const phoneItems = document.querySelectorAll('.phone-item');

    phoneItems.forEach((phone, index) => {
        phone.style.animationDelay = `${index * 0.1}s`;
        phone.classList.add('phone-fade-in');
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========== PRELOADER FADE OUT ==========
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ========== FEATURE CARDS STAGGER ANIMATION ==========
    const featureCards = document.querySelectorAll('.feature-card');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        staggerObserver.observe(card);
    });

    // ========== DYNAMIC YEAR IN FOOTER ==========
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // ========== ADD GRADIENT ANIMATION TO BUTTONS ==========
    const primaryButtons = document.querySelectorAll('.btn-primary');

    primaryButtons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });

    // ========== SCROLL TO TOP BUTTON ==========
    const createScrollToTop = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '↑';
        btn.className = 'scroll-to-top';
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #FFB627, #FFCA28);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 5px 20px rgba(255, 182, 39, 0.4);
        `;

        document.body.appendChild(btn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 10px 30px rgba(255, 182, 39, 0.6)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(255, 182, 39, 0.4)';
        });
    };

    createScrollToTop();

    // ========== CONSOLE EASTER EGG ==========
    console.log('%c MY HELPER ', 'background: linear-gradient(135deg, #FFB627, #FFCA28); color: #FFFFFF; font-size: 30px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Управляющая компания нового поколения ', 'color: #FFB627; font-size: 14px; font-weight: bold;');
    console.log('%c Сайт создан с любовью ❤️ ', 'color: #666; font-size: 12px;');
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
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

// Throttle function for expensive operations
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
