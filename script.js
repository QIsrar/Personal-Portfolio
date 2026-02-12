// ===== Preloader =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 2000);
});

// ===== Typing Animation =====
const typingName = document.getElementById('typingName');
const nameText = 'Qazi Israr Ahmad';
let charIndex = 0;

function typeCharacter() {
    if (charIndex < nameText.length) {
        typingName.textContent += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, 100);
    }
}

// Start typing after preloader
setTimeout(() => {
    typeCharacter();
}, 2200);

// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

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

window.addEventListener('scroll', setActiveNavLink);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Simulate form submission (in production, this would be an actual API call)
    setTimeout(() => {
        // Success simulation
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }, 1500);

    // Error handling example (uncomment to test)
    /*
    setTimeout(() => {
        formStatus.className = 'form-status error';
        formStatus.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
    */
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
const elementsToAnimate = document.querySelectorAll('.project-card, .achievement-card, .timeline-item, .contact-card');

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===== Code Snippet Animation =====
const codeSnippet = document.querySelector('.code-snippet code');
if (codeSnippet) {
    const codeText = codeSnippet.innerHTML;
    codeSnippet.innerHTML = '';
    let codeCharIndex = 0;

    function typeCode() {
        if (codeCharIndex < codeText.length) {
            codeSnippet.innerHTML = codeText.substring(0, codeCharIndex + 1);
            codeCharIndex++;
            
            // Variable speed for more natural typing
            const delay = codeText.charAt(codeCharIndex) === '\n' ? 200 : 30;
            setTimeout(typeCode, delay);
        }
    }

    // Start typing code after name animation
    setTimeout(() => {
        typeCode();
    }, 3500);
}

// ===== Parallax Effect for Hero Orb =====
const glowingOrb = document.querySelector('.glowing-orb');
if (glowingOrb) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        glowingOrb.style.transform = `translateY(${rate}px)`;
    });
}

// ===== Easter Egg: Konami Code =====
let konamiCode = '';
const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';

document.addEventListener('keydown', (e) => {
    konamiCode += e.key;
    
    if (konamiSequence.indexOf(konamiCode) < 0) {
        konamiCode = e.key;
    }
    
    if (konamiCode === konamiSequence) {
        // Activate rainbow mode!
        document.body.style.animation = 'rainbow 3s infinite';
        
        // Add CSS animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show message
        alert('🎉 Easter Egg Activated! Rainbow mode enabled!');
        konamiCode = '';
        
        // Disable after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// ===== Cursor Trail Effect (Optional - Performance Intensive) =====
// Uncomment if you want a subtle cursor trail effect

/*
const cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift().remove();
    }
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});

// Add CSS for cursor trail
const trailStyle = document.createElement('style');
trailStyle.innerHTML = `
    .cursor-trail {
        position: absolute;
        width: 5px;
        height: 5px;
        background: var(--neon-blue);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        animation: fadeTrail 0.5s forwards;
        z-index: 9999;
    }
    
    @keyframes fadeTrail {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);
*/

// ===== Performance Optimization: Lazy Loading =====
document.addEventListener('DOMContentLoaded', () => {
    // Add loading="lazy" to any images if they exist
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c💼 Looking for someone who understands both code AND conversion?', 'font-size: 14px; color: #a855f7;');
console.log('%c📧 Let\'s connect: qazi.israr@qityrix.com', 'font-size: 14px; color: #ec4899;');
console.log('%c🚀 Built with passion, optimized for results.', 'font-size: 14px; color: #00d4ff;');
