// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navRight = document.querySelector('.nav-right');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (nav) {
                nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            }
            if (navRight) {
                navRight.style.display = navRight.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }

    // Product Card Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Category Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would add filtering logic
            console.log('Filter:', this.textContent);
        });
    });

    // Smooth Scroll
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

    // Header Shadow on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Shopping Cart Counter (example)
    let cartCount = 0;
    const cartLink = document.querySelector('a[href="cart.html"]');
    
    function updateCartCount() {
        if (cartLink) {
            cartLink.textContent = `BAG (${cartCount})`;
        }
    }

    // Add to cart functionality would go here
    window.addToCart = function(productName) {
        cartCount++;
        updateCartCount();
        console.log('Added to cart:', productName);
        alert(`${productName}이(가) 장바구니에 추가되었습니다.`);
    };

    // Image Lazy Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Form Validation (if forms are added later)
    window.validateForm = function(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });

        return isValid;
    };

    // Newsletter Subscription (example)
    window.subscribeNewsletter = function(email) {
        if (!email || !email.includes('@')) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return false;
        }
        
        console.log('Newsletter subscription:', email);
        alert('뉴스레터 구독이 완료되었습니다!');
        return true;
    };

    // Product Quick View (can be expanded)
    window.quickView = function(productId) {
        console.log('Quick view for product:', productId);
        // Modal popup logic would go here
    };

    // Initialize
    console.log('Name of Vessels - Website Initialized');
});

// Scroll Animation - Fade In on Scroll
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Product Slider Function
let currentSlide = 0;

function slideProducts(direction) {
    const slider = document.querySelector('.product-slider');
    if (!slider) return;

    const slideWidth = slider.querySelector('.product-slide').offsetWidth + 30; // width + gap
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    currentSlide += direction * slideWidth;
    
    // Boundary check
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > maxScroll) {
        currentSlide = maxScroll;
    }
    
    slider.scrollTo({
        left: currentSlide,
        behavior: 'smooth'
    });
}

// Touch/Swipe support for product slider
let touchStartX = 0;
let touchEndX = 0;

const productSlider = document.querySelector('.product-slider');
if (productSlider) {
    productSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    productSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        slideProducts(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        slideProducts(-1); // Swipe right
    }
}

// Gallery Item Click (optional - can add lightbox later)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        console.log('Gallery item clicked:', this.querySelector('img').src);
        // Add lightbox functionality here if needed
    });
});
