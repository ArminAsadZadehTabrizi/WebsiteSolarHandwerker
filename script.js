// ====================================
// Solar Calculator Logic
// ====================================

document.addEventListener('DOMContentLoaded', function () {
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
    slider.addEventListener('input', function () {
        numberInput.value = this.value;
        updateSavings();
    });

    numberInput.addEventListener('input', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function () {
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
            link.addEventListener('click', function () {
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

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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

document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
// Project Details Modal
// ====================================

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('projectModal');
    const modalOverlay = document.getElementById('projectModalOverlay');
    const modalClose = document.getElementById('projectModalClose');
    const modalImg = document.getElementById('projectModalImg');
    const modalTitle = document.getElementById('projectModalTitle');
    const modalDesc = document.getElementById('projectModalDesc');
    const modalDetailsText = document.getElementById('projectModalDetailsText');
    const referenceCards = document.querySelectorAll('.reference-card');

    if (!modal || referenceCards.length === 0) return;

    /**
     * Open modal and populate with project data
     * @param {HTMLElement} card - The clicked reference card element
     */
    function openModal(card) {
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const details = card.getAttribute('data-details');
        const img = card.getAttribute('data-img');

        // Populate modal content
        modalTitle.textContent = title || 'Projekt';
        modalDesc.textContent = desc || '';
        modalDetailsText.textContent = details?.replace(/\|/g, '\n') || '';
        modalImg.src = img || '';
        modalImg.alt = title || 'Project Image';

        // Show modal with smooth transition
        modal.style.display = 'flex';
        // Force reflow to enable animation
        modal.offsetHeight;
        modal.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close modal
     */
    function closeModal() {
        modal.classList.remove('active');

        // Wait for fade-out animation before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Add click event to all reference cards
    referenceCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent if clicking on a link inside the card
            if (e.target.tagName === 'A') return;
            openModal(this);
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Projektdetails öffnen');

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(this);
            }
        });
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // ESC key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Prevent modal content clicks from closing modal
    const modalContent = document.querySelector('.project-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Modal CTA: Close modal first, then smooth-scroll to contact section
    const modalCta = document.getElementById('projectModalCta');
    if (modalCta) {
        modalCta.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Close the modal immediately
            closeModal();

            // Smooth-scroll to the contact section after modal closes
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 350);
            }
        });
    }
});


// ====================================
// Scroll Animation on Reveal (Optional Enhancement)
// ====================================

document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
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
