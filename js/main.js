// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for stats
const counterSection = document.querySelector('.stats');
if (counterSection) {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50;
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }
    
    window.addEventListener('scroll', () => {
        const sectionPos = counterSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        if (sectionPos < screenPos && !animated) {
            animated = true;
            animateCounters();
        }
    });
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Gallery Filter (untuk halaman portfolio)
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('galleryGrid');

if (galleryGrid) {
    // Sample gallery data
    const galleryItems = [
        { category: 'akad', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', title: 'Akad Nikah di Masjid' },
        { category: 'akad', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400', title: 'Prosesi Akad Adat' },
        { category: 'resepsi', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400', title: 'Resepsi Outdoor' },
        { category: 'resepsi', img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400', title: 'Resepsi Mewah' },
        { category: 'dekorasi', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400', title: 'Dekorasi Minimalis' },
        { category: 'dekorasi', img: 'https://images.unsplash.com/photo-1583939172811-8f6e8b7c6b3c?w=400', title: 'Dekorasi Bunga' },
        { category: 'prewed', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', title: 'Pre-wedding Beach' },
        { category: 'prewed', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400', title: 'Pre-wedding Forest' }
    ];
    
    function renderGallery(filter = 'all') {
        const filtered = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
        galleryGrid.innerHTML = filtered.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.img}" alt="${item.title}">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                </div>
            </div>
        `).join('');
        
        // Add lightbox functionality
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                openLightbox(img.src, img.alt);
            });
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });
    
    renderGallery();
}

// Lightbox
const lightbox = document.getElementById('lightbox');
function openLightbox(src, caption) {
    if (lightbox) {
        lightbox.classList.add('active');
        lightbox.querySelector('.lightbox-img').src = src;
        if (lightbox.querySelector('.lightbox-caption')) {
            lightbox.querySelector('.lightbox-caption').textContent = caption;
        }
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Modal functions
function openPackageModal(packageType) {
    const modal = document.getElementById('packageModal');
    if (modal) {
        const selectedSpan = document.getElementById('selectedPackage');
        if (selectedSpan) selectedSpan.textContent = packageType;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePackageModal() {
    const modal = document.getElementById('packageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('packageModal');
    if (event.target === modal) {
        closePackageModal();
    }
    if (event.target === lightbox) {
        closeLightbox();
    }
}

// Form submissions
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Tim Jadi Tenang akan segera menghubungi Anda dalam 1x24 jam.');
        this.reset();
    });
}

const packageForm = document.getElementById('packageBookingForm');
if (packageForm) {
    packageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Kami akan mengirimkan detail booking ke WhatsApp Anda.');
        closePackageModal();
        this.reset();
    });
}

// Active link highlight based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});