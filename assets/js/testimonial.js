
// testimonials.js - Enhanced for professional carousel
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // State variables
    let currentIndex = 0;
    let autoRotateInterval;
    const rotationTime = 8000; // 8 seconds
    const cardsPerView = 3; // Show 3 cards at a time on desktop
    
    // Calculate how many cards to show based on screen size
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }
    
    // Initialize carousel
    function initCarousel() {
        // Start auto rotation
        startAutoRotation();
        
        // Add event listeners for navigation buttons
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // Add event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Pause auto rotation on hover
        track.addEventListener('mouseenter', pauseAutoRotation);
        track.addEventListener('mouseleave', startAutoRotation);
        
        // Touch events for mobile
        let startX = 0;
        let endX = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            pauseAutoRotation();
        });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoRotation();
        });
        
        function handleSwipe() {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    goToNextSlide();
                } else {
                    goToPrevSlide();
                }
            }
        }
        
        // Initial update
        updateCarousel();
    }

    // Update carousel display
    function updateCarousel() {
        const visibleCards = getCardsPerView();
        
        // Update cards
        cards.forEach((card, index) => {
            const isActive = index >= currentIndex && index < currentIndex + visibleCards;
            card.classList.toggle('active', isActive);
            
            // Add animation delay based on position
            card.style.animationDelay = `${(index % visibleCards) * 0.1}s`;
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Calculate transform for track to show the current set of cards
        const cardWidth = cards[0].offsetWidth;
        const gap = 30; // Should match CSS gap value
        const containerWidth = track.parentElement.offsetWidth;
        const totalCardWidth = cardWidth + gap;
        const offset = -(currentIndex * totalCardWidth);
        
        track.style.transform = `translateX(${offset}px)`;
    }

    // Navigation functions
    function goToSlide(index) {
        const maxIndex = Math.max(0, cards.length - getCardsPerView());
        currentIndex = Math.min(Math.max(0, index), maxIndex);
        updateCarousel();
        resetAutoRotation();
    }

    function goToPrevSlide() {
        const visibleCards = getCardsPerView();
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
        resetAutoRotation();
    }

    function goToNextSlide() {
        const visibleCards = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
        updateCarousel();
        resetAutoRotation();
    }

    // Auto rotation functions
    function startAutoRotation() {
        autoRotateInterval = setInterval(goToNextSlide, rotationTime);
    }

    function pauseAutoRotation() {
        clearInterval(autoRotateInterval);
    }

    function resetAutoRotation() {
        pauseAutoRotation();
        startAutoRotation();
    }

    // Initialize the carousel
    initCarousel();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Recalculate current index to prevent overflow
        const visibleCards = getCardsPerView();
        const maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);
        updateCarousel();
    });
});