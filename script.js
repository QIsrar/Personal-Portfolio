// ===== Motion preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== Typing Animation for Hero Title =====
const typingName = document.getElementById('typingName');
const nameText = 'Qazi Israr Ahmad';
let charIndex = 0;

function typeHeroName() {
    if (typingName && charIndex < nameText.length) {
        typingName.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeHeroName, 75);
    }
}

// Type the hero name (the full name stays in the HTML for SEO, no-JS and reduced motion)
if (typingName && !prefersReducedMotion) {
    typingName.textContent = '';
    setTimeout(typeHeroName, 200);
}

// ===== Runtime Code Snippet Typing Animation =====
// Matches the exact code structure in screenshot:
// interface DigitalSpecialist {
//   name: 'Qazi Israr Ahmad';
//   education: 'BS CS @ COMSATS (CGPA 3.33)';
//   primaryPillars: ['Web Development', 'Digital Marketing & SEO'];
//   techStack: ['Next.js', 'TypeScript', 'MERN', 'Supabase', 'Tailwind'];
//   marketing: ['Technical SEO', 'Google Ads', 'Meta Ads', 'CRO'];
//   certifications: ['Agentic AI', 'Threat 2 Thought', 'Robotics World'];
//   deliverable: () => 'Code that scales + Campaigns that convert';
// }

const codeTokens = [
    { text: 'interface ', type: 'keyword' },
    { text: 'DigitalSpecialist ', type: 'type' },
    { text: '{\n', type: 'plain' },
    { text: '  name', type: 'property' },
    { text: ': ', type: 'plain' },
    { text: "'Qazi Israr Ahmad'", type: 'string' },
    { text: ';\n', type: 'plain' },
    { text: '  education', type: 'property' },
    { text: ': ', type: 'plain' },
    { text: "'BS CS @ COMSATS (CGPA 3.33)'", type: 'string' },
    { text: ';\n', type: 'plain' },
    { text: '  primaryPillars', type: 'property' },
    { text: ': [', type: 'plain' },
    { text: "'Web Development'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Digital Marketing & SEO'", type: 'string' },
    { text: '];\n', type: 'plain' },
    { text: '  techStack', type: 'property' },
    { text: ': [', type: 'plain' },
    { text: "'Next.js'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'TypeScript'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'MERN'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Supabase'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Tailwind'", type: 'string' },
    { text: '];\n', type: 'plain' },
    { text: '  marketing', type: 'property' },
    { text: ': [', type: 'plain' },
    { text: "'Technical SEO'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Google Ads'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Meta Ads'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'CRO'", type: 'string' },
    { text: '];\n', type: 'plain' },
    { text: '  certifications', type: 'property' },
    { text: ': [', type: 'plain' },
    { text: "'Agentic AI'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Threat 2 Thought'", type: 'string' },
    { text: ', ', type: 'plain' },
    { text: "'Robotics World'", type: 'string' },
    { text: '];\n', type: 'plain' },
    { text: '  deliverable', type: 'property' },
    { text: ': () => ', type: 'plain' },
    { text: "'Code that scales + Campaigns that convert'", type: 'string' },
    { text: ';\n', type: 'plain' },
    { text: '}', type: 'plain' }
];

function typeRuntimeCodeSnippet() {
    const codeContainer = document.getElementById('runtimeCodeSnippet');
    if (!codeContainer) return;

    let currentTokenIndex = 0;
    let currentCharIndex = 0;
    let currentSpan = null;

    function renderNextChar() {
        if (currentTokenIndex >= codeTokens.length) {
            // Typing complete, keep cursor blinking
            return;
        }

        const token = codeTokens[currentTokenIndex];

        if (currentCharIndex === 0) {
            currentSpan = document.createElement('span');
            if (token.type === 'keyword') currentSpan.className = 'code-keyword';
            else if (token.type === 'type') currentSpan.className = 'code-type';
            else if (token.type === 'property') currentSpan.className = 'code-property';
            else if (token.type === 'string') currentSpan.className = 'code-string';
            else if (token.type === 'plain') currentSpan.className = 'code-bracket';
            codeContainer.appendChild(currentSpan);
        }

        const char = token.text.charAt(currentCharIndex);
        currentSpan.textContent += char;
        currentCharIndex++;

        let delay = 18;
        if (char === '\n') delay = 90;
        else if (char === ';') delay = 60;
        else if (char === ',') delay = 40;

        if (currentCharIndex >= token.text.length) {
            currentTokenIndex++;
            currentCharIndex = 0;
        }

        if (!prefersReducedMotion) setTimeout(renderNextChar, delay);
    }

    // Begin code snippet typing shortly after hero name typing starts
    if (prefersReducedMotion) {
        while (currentTokenIndex < codeTokens.length) renderNextChar();
    } else {
        setTimeout(renderNextChar, 1300);
    }
}

typeRuntimeCodeSnippet();

// ===== Dynamic Stats Counter Animation on Scroll =====
let statsAnimated = false;

function animateStatNumbers() {
    const statCards = document.querySelectorAll('.stat-number');
    statCards.forEach(card => {
        const target = parseFloat(card.getAttribute('data-target'));
        const suffix = card.getAttribute('data-suffix') || '';
        const decimals = parseInt(card.getAttribute('data-decimals') || '0', 10);
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            if (decimals > 0) {
                card.textContent = currentVal.toFixed(decimals) + suffix;
            } else {
                card.textContent = Math.floor(currentVal) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                if (decimals > 0) {
                    card.textContent = target.toFixed(decimals) + suffix;
                } else {
                    card.textContent = target + suffix;
                }
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

const statsSection = document.getElementById('statsSection');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStatNumbers();
            }
        });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
}

// ===== Navigation Scroll & Active Spy =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Keep the mobile menu positioned right under the navbar
function setNavHeight() {
    if (navbar) document.documentElement.style.setProperty('--nav-h', navbar.offsetHeight + 'px');
}
setNavHeight();
window.addEventListener('resize', setNavHeight);
window.addEventListener('load', setNavHeight);

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
    const setMenu = (open) => {
        navMenu.classList.toggle('active', open);
        hamburger.classList.toggle('toggle', open);
        hamburger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('menu-open', open);
    };
    const toggleMenu = () => setMenu(!navMenu.classList.contains('active'));

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking on any menu link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    // Close menu when clicking outside or pressing Escape
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
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

// ===== Contact Form Handling (Netlify Forms & Mailto Fallback) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('projectType').value;
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        formStatus.className = 'form-status';
        formStatus.textContent = '';
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
        submitBtn.disabled = true;

        try {
            // Submit via fetch for Netlify Forms (works once the site is deployed on Netlify)
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(contactForm)).toString()
            });
            if (!response.ok) throw new Error('Form request failed: ' + response.status);

            formStatus.className = 'form-status success';
            formStatus.textContent = `\u2713 Thank you, ${name}! Your message has been sent. I will reply to ${email} soon.`;
            contactForm.reset();
        } catch (err) {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, your message could not be sent. Please try again, or contact me directly: ';
            const mail = document.createElement('a');
            mail.className = 'fallback-mail-link';
            mail.textContent = 'send an email';
            mail.href = `mailto:qisrar951@gmail.com?subject=${encodeURIComponent(`[${service}] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            const wa = document.createElement('a');
            wa.className = 'fallback-mail-link';
            wa.textContent = 'WhatsApp';
            wa.href = 'https://wa.me/923005064077';
            wa.target = '_blank';
            wa.rel = 'noopener noreferrer';
            formStatus.append(mail, document.createTextNode(' or '), wa, document.createTextNode('.'));
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            formStatus.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
        }
    });
}

// ===== Scroll Reveal Animations =====
const observerOptions = {
    threshold: 0.1,
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

if (!prefersReducedMotion) elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(element);
});

// ===== Console Welcome Note =====
console.log(
    '%c👋 Assalamualaikum! Qazi Israr Ahmad Portfolio',
    'font-size: 16px; color: #00d4ff; font-weight: bold;'
);
console.log(
    '%c💼 Web Developer & Digital Marketing Specialist',
    'font-size: 13px; color: #a855f7; font-weight: 600;'
);
console.log(
    '%c📧 Email: qisrar951@gmail.com | 📱 WhatsApp: +92 300 5064077',
    'font-size: 12px; color: #10b981;'
);

// ===== Accessibility: hide decorative icons from screen readers =====
document.querySelectorAll('i.fas, i.fab, i.far').forEach(icon => icon.setAttribute('aria-hidden', 'true'));