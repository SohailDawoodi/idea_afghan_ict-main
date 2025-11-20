// Enhanced Team Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const teamCards = document.querySelectorAll('.team-card');
  
  // Initialize team cards
  function initTeamCards() {
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);
        
    teamCards.forEach(card => {
      // Pause animation initially
      card.style.animationPlayState = 'paused';
      observer.observe(card);
      
      // Add magnetic hover effect
      card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on mouse position
        const rotateY = ((x - rect.width / 2) / rect.width) * 8;
        const rotateX = ((y - rect.height / 2) / rect.height) * -8;
        
        this.style.transform = `translateY(-15px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Add ripple effect to social links
        const socialLinks = this.querySelectorAll('.social-link');
        socialLinks.forEach((link, index) => {
          link.style.transitionDelay = `${index * 0.1}s`;
        });
      });
      
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Dynamic glow position
        const glow = this.querySelector('.card-glow');
        if (glow) {
          const glowX = (x / rect.width) * 100;
          const glowY = (y / rect.height) * 100;
          glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, 
            rgba(61, 99, 221, 0.4) 0%, 
            rgba(61, 99, 221, 0.2) 30%, 
            transparent 70%)`;
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
        
        // Reset social links delay
        const socialLinks = this.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
          link.style.transitionDelay = '0s';
        });
        
        // Reset glow position
        const glow = this.querySelector('.card-glow');
        if (glow) {
          glow.style.background = `radial-gradient(circle at center, 
            rgba(61, 99, 221, 0.4) 0%, 
            rgba(61, 99, 221, 0.2) 30%, 
            transparent 70%)`;
        }
      });
      
      // Add click effect for touch devices
      card.addEventListener('click', function(e) {
        if (!e.target.closest('.social-link')) {
          this.style.transform = 'scale(0.98)';
          setTimeout(() => {
            this.style.transform = 'scale(1.02)';
          }, 150);
        }
      });

      // Ensure social links are always visible and functional
      const socialLinks = card.querySelectorAll('.social-link');
      socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent card click when clicking social links
          e.preventDefault();
          
          // Add click feedback
          this.style.transform = 'scale(0.9)';
          setTimeout(() => {
            this.style.transform = 'scale(1.1)';
          }, 100);
          
          // Here you can add actual link functionality
          const socialType = Array.from(this.classList).find(cls => 
            cls.includes('linkedin') || cls.includes('whatsapp') || cls.includes('instagram')
          );
          
          if (socialType) {
            console.log(`Opening ${socialType} link`);
            // window.open(link.getAttribute('href'), '_blank');
          }
        });
        
        link.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.2) translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1) translateY(0)';
        });
      });
    });
  }
  
  // Add CSS for additional effects
  const style = document.createElement('style');
  style.textContent = `
    .team-card.in-view {
      animation-play-state: running;
    }
    
    .social-link {
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      cursor: pointer;
    }

    /* Ensure social links are always above other content */
    .member-social {
      position: relative;
      z-index: 100;
    }

    .social-link {
      z-index: 101;
      position: relative;
    }

    /* Fix for hover content visibility */
    .hover-content {
      display: block !important;
      visibility: visible !important;
    }

    .team-card:hover .hover-content {
      display: block !important;
      visibility: visible !important;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize team section
  initTeamCards();
  
  // Add parallax effect to background shapes
  function initParallax() {
    const shapes = document.querySelectorAll('.bg-shape');
    
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      
      shapes.forEach((shape, index) => {
        const speed = 0.03 * (index + 1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
  
  initParallax();

  // Handle theme changes
  function handleThemeChange() {
    const isDark = document.body.classList.contains('dark-theme');
    
    teamCards.forEach(card => {
      const description = card.querySelector('.member-description p');
      if (description) {
        if (isDark) {
          description.style.color = 'var(--light-text)';
          description.style.background = 'rgba(30, 41, 59, 0.95)';
        } else {
          description.style.color = 'var(--dark-text)';
          description.style.background = 'rgba(255, 255, 255, 0.95)';
        }
      }
    });
  }

  // Observe theme changes
  const themeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        setTimeout(handleThemeChange, 100);
      }
    });
  });

  themeObserver.observe(document.body, {
    attributes: true
  });

  // Initial theme setup
  setTimeout(handleThemeChange, 500);
  
  // Force hover content to be visible on load for testing
  setTimeout(() => {
    teamCards.forEach(card => {
      const hoverContent = card.querySelector('.hover-content');
      if (hoverContent) {
        hoverContent.style.display = 'block';
        hoverContent.style.visibility = 'visible';
      }
    });
  }, 1000);
});

// Additional function to debug social links
function debugSocialLinks() {
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, index) => {
    const socialLinks = card.querySelectorAll('.social-link');
    console.log(`Card ${index + 1} has ${socialLinks.length} social links`);
    
    socialLinks.forEach(link => {
      link.style.border = '2px solid red'; // Visual debug
    });
  });
}

// Run debug on load
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(debugSocialLinks, 2000);
});