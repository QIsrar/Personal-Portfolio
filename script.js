// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    }
});

// ===== Typing Animation for Hero Title =====
const typingName = document.getElementById('typingName');
const nameText = 'Qazi Israr Ahmad';
let charIndex = 0;

function typeCharacter() {
    if (typingName && charIndex < nameText.length) {
        typingName.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, 80);
    }
}

// Start typing after preloader
setTimeout(() => {
    typeCharacter();
}, 1400);

// ===== Navigation Scroll & Active Spy =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    setActiveNavLink();
});

// ===== Hamburger Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    });
}

// ===== Smooth Scrolling with Header Offset =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const offsetTop = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== Active Navigation Link Spy =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Project Filter Buttons =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('projectType').value;
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Processing...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `✓ Thank you <strong>${name}</strong>! Your inquiry regarding <em>${service}</em> has been prepared. I will respond to <strong>${email}</strong> promptly. You can also reach me instantly on WhatsApp!`;
            
            // Build mailto fallback link
            const mailtoUri = `mailto:qisrar951@gmail.com?subject=${encodeURIComponent(`[${service}] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            
            // Provide option to open email client directly
            const openMailBtn = document.createElement('a');
            openMailBtn.href = mailtoUri;
            openMailBtn.className = 'btn btn-secondary';
            openMailBtn.style.marginTop = '10px';
            openMailBtn.style.display = 'inline-block';
            openMailBtn.innerHTML = '<i class="fas fa-envelope-open-text"></i> Open in Your Email App';
            
            formStatus.appendChild(document.createElement('br'));
            formStatus.appendChild(openMailBtn);

            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// ===== Scroll Reveal Animations =====
const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
    '.project-card, .cert-card, .edu-card, .timeline-content, .contact-card, .stat-card, .skill-category-card'
);

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(element);
});

// ===== Console Welcome Note =====
console.log(
    '%c👋 Assalamualikum! Looking for Qazi Israr Ahmad?',
    'font-size: 16px; color: #00d4ff; font-weight: bold;'
);
console.log(
    '%c🚀 Full-Stack Web Developer & Digital Marketing Specialist',
    'font-size: 13px; color: #a855f7; font-weight: 600;'
);
console.log(
    '%c📧 Email: qisrar951@gmail.com | 📱 WhatsApp: +92 300 5064077',
    'font-size: 12px; color: #10b981;'
);
console.log(
    '%c🔗 Live Marketing Portfolio: https://appverse-technologies.com/qazi-israr-ahmad/',
    'font-size: 12px; color: #f59e0b;'
);
