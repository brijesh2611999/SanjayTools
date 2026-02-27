document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 8%';
            header.style.boxShadow = '0 10px 15px -3px rgba(15, 23, 42, 0.1)';
        } else {
            header.style.padding = '1.25rem 8%';
            header.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: none;
            z-index: 1000;
            backdrop-filter: blur(4px);
        `;
        document.body.appendChild(overlay);

        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            const isActive = navLinks.classList.contains('active');
            overlay.style.display = isActive ? 'block' : 'none';
            mobileToggle.setAttribute('aria-expanded', isActive);
            mobileToggle.innerHTML = isActive ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        mobileToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Entrance Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .feature-item, .about-content, .about-image, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });

    // Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Success! Your inquiry has been received. Our engineering team will contact you within 12 hours.');
                btn.innerHTML = 'Inquiry Sent Successfully';
                btn.style.background = '#48bb78';
                contactForm.reset();
            }, 1800);
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;
        const update = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        update();
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

    // Clients Slider for Mobile
    const clientsWrapper = document.querySelector('.clients-wrapper');
    const prevBtn = document.getElementById('prevClient');
    const nextBtn = document.getElementById('nextClient');

    if (clientsWrapper && prevBtn && nextBtn) {
        // Adjust scroll amount based on screen width
        const getScrollAmount = () => window.innerWidth < 480 ? 200 : 350;

        nextBtn.addEventListener('click', () => {
            clientsWrapper.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            clientsWrapper.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        // Hide arrows if not scrollable or on desktop? 
        // CSS already handles display: none for desktop
    }
});
