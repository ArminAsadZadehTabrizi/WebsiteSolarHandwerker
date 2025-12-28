// ====================================
// Solar Calculator Logic
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('stromverbrauch');
    const numberInput = document.getElementById('stromverbrauchNumber');
    const ersparnisDisplay = document.getElementById('ersparnis');
    
    // Price per kWh in euros
    const PRICE_PER_KWH = 0.40;
    const YEARS = 20;
    
    /**
     * Calculate savings based on yearly consumption
     * @param {number} consumption - Yearly electricity consumption in kWh
     * @returns {string} Formatted savings amount
     */
    function calculateSavings(consumption) {
        const savings = consumption * PRICE_PER_KWH * YEARS;
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(savings);
    }
    
    /**
     * Update the savings display
     */
    function updateSavings() {
        const consumption = parseInt(slider.value);
        const savings = calculateSavings(consumption);
        ersparnisDisplay.textContent = savings;
    }
    
    // Sync slider and number input
    slider.addEventListener('input', function() {
        numberInput.value = this.value;
        updateSavings();
    });
    
    numberInput.addEventListener('input', function() {
        // Ensure value is within range
        let value = parseInt(this.value);
        if (value < 1000) value = 1000;
        if (value > 10000) value = 10000;
        
        slider.value = value;
        this.value = value;
        updateSavings();
    });
    
    // Initial calculation
    updateSavings();
});


// ====================================
// Mobile Navigation Toggle
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle active class on button for animation
            this.classList.toggle('active');
            
            // Toggle active class on nav for visibility
            mainNav.classList.toggle('active');
            
            // Update aria-label for accessibility
            const isActive = this.classList.contains('active');
            this.setAttribute('aria-label', isActive ? 'Menü schließen' : 'Menü öffnen');
        });
        
        // Close menu when clicking on a navigation link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-label', 'Menü öffnen');
            });
        });
    }
});


// ====================================
// Contact Form Handling (Optional)
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to your backend
            console.log('Form Data:', data);
            
            // Show success message (customize as needed)
            alert('Vielen Dank für Ihre Anfrage! Wir werden uns schnellstmöglich bei Ihnen melden.');
            
            // Reset form
            contactForm.reset();
            
            // In production, you would send this data to your server:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                alert('Vielen Dank für Ihre Anfrage!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Es gab einen Fehler. Bitte versuchen Sie es erneut.');
            });
            */
        });
    }
});


// ====================================
// Smooth Scroll Enhancement
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset (account for sticky header)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// ====================================
// Scroll Animation on Reveal (Optional Enhancement)
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (optional, can be commented out)
    const animatedElements = document.querySelectorAll('.service-card, .trust-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
