// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== SCROLL ANIMATIONS (Intersection Observer) ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
});

// ========== TESTIMONIALS SLIDER ==========
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let scrollAmount = 0;

if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 40;
        scrollAmount += cardWidth;
        if (scrollAmount > track.scrollWidth - track.clientWidth) {
            scrollAmount = 0;
        }
        track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 40;
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) {
            scrollAmount = track.scrollWidth - track.clientWidth;
        }
        track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
}

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========== GOOGLE REVIEWS WIDGET LAZY LOAD ==========
// EmbedSocial widget script is already in HTML, but we can add a fallback
document.addEventListener('DOMContentLoaded', () => {
    const embedContainer = document.querySelector('.embedsocial-hashtag');
    
    // If widget doesn't load within 5 seconds, show fallback message
    setTimeout(() => {
        if (embedContainer && embedContainer.children.length === 0) {
            embedContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-light);">
                    <i class="fab fa-google" style="font-size: 3rem; color: var(--gold); margin-bottom: 15px;"></i>
                    <p style="font-size: 1.1rem; margin-bottom: 10px;">Google Reviews</p>
                    <p style="font-size: 0.9rem;">Widget yükleniyor... Lütfen Google Business Profile bağlantınızı kontrol edin.</p>
                    <p style="font-size: 0.85rem; margin-top: 10px;">
                        <a href="https://embedsocial.com" target="_blank" style="color: var(--gold);">EmbedSocial</a> 
                        üzerinden widget kodunuzu alabilirsiniz.
                    </p>
                </div>
            `;
        }
    }, 5000);
});
