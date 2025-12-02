// testimonials.js - Professional Responsive Carousel
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // State variables
    let currentSlide = 0;
    let autoRotateInterval;
    const rotationTime = 5000;
    let cardsPerView = 1;
    let totalSlides = 0;
    let cardWidth = 0;
    let gap = 30;
    let isMobile = false;
    let isTablet = false;
    let isDesktop = false;
    
    // Detect device type
    function detectDevice() {
        const width = window.innerWidth;
        isMobile = width <= 768;
        isTablet = width > 768 && width <= 1024;
        isDesktop = width > 1024;
    }
    
    // Calculate cards per view based on device
    function calculateCardsPerView() {
        detectDevice();
        
        if (isMobile) {
            return 1; // 1 card on mobile
        } else if (isTablet) {
            return 2; // 2 cards on tablet
        } else {
            return 3; // 3 cards on desktop
        }
    }
    
    // Initialize carousel
    function initCarousel() {
        cardsPerView = calculateCardsPerView();
        totalSlides = Math.ceil(cards.length / cardsPerView);
        
        // Create dynamic indicators
        createIndicators();
        
        // Calculate card width
        calculateCardWidth();
        
        // Set initial positions
        updateTrackWidth();
        updateCarousel();
        
        // Start auto rotation
        startAutoRotation();
        
        // Add event listeners
        setupEventListeners();
    }
    
    // Calculate optimal card width
    function calculateCardWidth() {
        const container = track.parentElement;
        const containerWidth = container.offsetWidth;
        const containerPadding = parseInt(window.getComputedStyle(container).paddingLeft) + 
                               parseInt(window.getComputedStyle(container).paddingRight);
        
        const availableWidth = containerWidth - containerPadding;
        
        // Adjust gap based on device
        gap = isMobile ? 20 : 30;
        
        // Calculate card width
        if (cardsPerView === 1) {
            // On mobile: card takes 90% of available width
            cardWidth = availableWidth * 0.9;
        } else if (cardsPerView === 2) {
            // On tablet: 2 cards with equal width
            cardWidth = (availableWidth - gap) / 2;
            cardWidth = Math.min(cardWidth, 350);
        } else {
            // On desktop: 3 cards with equal width
            cardWidth = (availableWidth - (gap * 2)) / 3;
            cardWidth = Math.min(cardWidth, 320);
        }
        
        // Ensure minimum width
        cardWidth = Math.max(cardWidth, 280);
        
        // Apply card width
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
        });
    }
    
    // Update track width
    function updateTrackWidth() {
        const totalWidth = (cardWidth + gap) * cards.length;
        track.style.width = `${totalWidth}px`;
    }
    
    // Create dynamic indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('data-slide', i);
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        // Calculate translateX value
        let translateX;
        
        if (isMobile) {
            // On mobile: center the current card
            translateX = -currentSlide * (cardWidth + gap);
        } else {
            // On tablet/desktop: show multiple cards
            translateX = -currentSlide * (cardWidth + gap) * cardsPerView;
        }
        
        // Apply transform with smooth transition
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update active state for cards
        updateActiveCards();
        
        // Update indicators
        updateIndicators();
    }
    
    // Update active cards
    function updateActiveCards() {
        cards.forEach((card, index) => {
            const isActive = checkIfCardIsActive(index);
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-hidden', !isActive);
            
            if (isActive) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                card.style.zIndex = '2';
            } else {
                card.style.opacity = '0.7';
                card.style.transform = 'scale(0.95)';
                card.style.zIndex = '1';
            }
        });
    }
    
    // Check if card should be active
    function checkIfCardIsActive(index) {
        if (isMobile) {
            // On mobile: only one card is active
            return index === currentSlide;
        } else {
            // On tablet/desktop: multiple cards are active
            const startIndex = currentSlide * cardsPerView;
            const endIndex = startIndex + cardsPerView;
            return index >= startIndex && index < endIndex;
        }
    }
    
    // Update indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }
    
    // Navigation functions
    function goToSlide(slideIndex) {
        currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1));
        updateCarousel();
        resetAutoRotation();
    }
    
    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoRotation();
    }
    
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
        resetAutoRotation();
    }
    
    // Auto rotation functions
    function startAutoRotation() {
        if (!isMobile) { // Only auto rotate on non-mobile
            autoRotateInterval = setInterval(goToNextSlide, rotationTime);
        }
    }
    
    function pauseAutoRotation() {
        clearInterval(autoRotateInterval);
    }
    
    function resetAutoRotation() {
        pauseAutoRotation();
        if (!isMobile) {
            startAutoRotation();
        }
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // Indicators
        indicatorsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                goToSlide(slideIndex);
            }
        });
        
        // Pause auto rotation on hover
        if (!isMobile) {
            track.addEventListener('mouseenter', pauseAutoRotation);
            track.addEventListener('mouseleave', startAutoRotation);
        }
        
        // Touch/swipe events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            pauseAutoRotation();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    goToNextSlide();
                } else {
                    goToPrevSlide();
                }
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
                e.preventDefault();
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
                e.preventDefault();
            }
        });
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldCardsPerView = cardsPerView;
            cardsPerView = calculateCardsPerView();
            totalSlides = Math.ceil(cards.length / cardsPerView);
            
            // Recalculate dimensions
            calculateCardWidth();
            updateTrackWidth();
            
            // Adjust current slide if needed
            if (oldCardsPerView !== cardsPerView) {
                currentSlide = Math.min(currentSlide, totalSlides - 1);
                createIndicators();
            }
            
            updateCarousel();
        }, 150);
    });
    
    // Initialize carousel
    initCarousel();
    
    // Add accessibility
    track.setAttribute('role', 'region');
    track.setAttribute('aria-label', 'Testimonials carousel');
    cards.forEach((card, index) => {
        card.setAttribute('role', 'group');
        card.setAttribute('aria-label', `Testimonial ${index + 1}`);
    });
});