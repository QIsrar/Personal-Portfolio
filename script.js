// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1100);
    }
});

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

// Start typing hero name after preloader
setTimeout(() => {
    typeHeroName();
}, 1300);

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

        setTimeout(renderNextChar, delay);
    }

    // Begin code snippet typing shortly after hero name typing starts
    setTimeout(renderNextChar, 2400);
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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('projectType').value;
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        // Submit via fetch for Netlify Forms
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `✓ Thank you <strong>${name}</strong>! Your message regarding <em>${service}</em> has been submitted. I will respond to <strong>${email}</strong> shortly.`;
            contactForm.reset();
        })
        .catch(() => {
            // Fallback response if not running on Netlify environment yet
            formStatus.className = 'form-status success';
            const mailtoUri = `mailto:qisrar951@gmail.com?subject=${encodeURIComponent(`[${service}] ${subject}`)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            formStatus.innerHTML = `✓ Thank you <strong>${name}</strong>! If submitting locally, you can also send directly via: <a href="${mailtoUri}" class="fallback-mail-link">Open in Email Client</a>.`;
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
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

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(25px)';
    element.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(element);
});

// ===== Console Welcome Note =====
console.log(
    '%c👋 Assalamualikum! Qazi Israr Ahmad Portfolio',
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
