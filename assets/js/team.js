// Enhanced Team Section JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const teamCards = document.querySelectorAll(".team-card");
  const loadMoreBtn = document.getElementById("loadMoreTeam");

  // Initialize team cards
  function initTeamCards() {
    // Hide cards beyond the first 8
    hideExtraCards();

    teamCards.forEach((card) => {
      // Add click effect for touch devices
      card.addEventListener("click", function (e) {
        if (!e.target.closest(".social-link")) {
          if (window.innerWidth <= 768) {
            // Toggle active state on mobile
            const isActive = this.classList.contains("active");
            teamCards.forEach((c) => c.classList.remove("active"));
            if (!isActive) {
              this.classList.add("active");
              
              // Add haptic feedback if available
              if (navigator.vibrate) {
                navigator.vibrate(50);
              }
            }
          }
        }
      });

      // Add keyboard navigation support
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });

      // Enhanced social links with better animations
      const socialLinks = card.querySelectorAll(".social-link");
      socialLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.stopPropagation();

          // Enhanced click feedback
          this.style.transform = "scale(0.85)";
          setTimeout(() => {
            this.style.transform = "";
          }, 150);

          // Haptic feedback for mobile
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
        });

        link.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-5px) scale(1.15)";
        });

        link.addEventListener("mouseleave", function () {
          this.style.transform = "";
        });

        // Add focus styles for accessibility
        link.addEventListener("focus", function () {
          this.style.outline = "2px solid var(--primary-color)";
          this.style.outlineOffset = "2px";
        });

        link.addEventListener("blur", function () {
          this.style.outline = "none";
        });
      });
    });

    // Add intersection observer for animation triggers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
        }
      });
    }, observerOptions);

    teamCards.forEach(card => {
      observer.observe(card);
    });
  }

  // Enhanced Load More functionality
  function initLoadMore() {
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", function () {
      // Add loading state
      this.innerHTML = '<i class="las la-spinner la-spin"></i> Loading...';
      this.disabled = true;

      // Show all hidden cards with staggered animation
      const hiddenCards = document.querySelectorAll(".team-card.hidden");
      
      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("hidden");
          card.style.animation = "cardSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
          
          // Trigger reflow for animation
          card.offsetHeight;
        }, index * 100);
      });

      // Hide the button after showing all cards
      setTimeout(() => {
        loadMoreBtn.style.display = "none";
        
        // Dispatch custom event for analytics
        window.dispatchEvent(new CustomEvent('teamMembersLoaded', {
          detail: { count: hiddenCards.length }
        }));
      }, hiddenCards.length * 100 + 500);
    });

    // Add keyboard support for load more button
    loadMoreBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  }

  function hideExtraCards() {
    teamCards.forEach((card, index) => {
      if (index >= 8) {
        card.classList.add("hidden");
      }
    });

    // Hide button if there are no extra cards
    if (teamCards.length <= 8 && loadMoreBtn) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Add enhanced CSS for additional effects
  const style = document.createElement("style");
  style.textContent = `
    .team-card.active .hover-content {
      opacity: 1 !important;
      transform: translateY(0) !important;
      transform: translateZ(30px) !important;
    }
    
    .team-card.active .card-image {
      height: 45% !important;
      filter: brightness(0.8) contrast(1.1) !important;
      transform: translateZ(20px) !important;
    }
    
    .team-card.active .main-info {
      transform: translateY(-180px) !important;
      opacity: 0.8 !important;
    }
    
    .team-card.active::before {
      opacity: 1 !important;
    }
    
    .team-card.active .card-glow {
      opacity: 1 !important;
    }
    
    .team-card.active::after {
      box-shadow: 0 0 0 8px rgba(61, 99, 221, 0.3) !important;
      animation: focusPulse 2s infinite !important;
    }
    
    /* Enhanced focus styles for accessibility */
    .team-card:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 4px;
    }
    
    /* Smooth scrolling for card animations */
    .team-card {
      scroll-margin-top: 20px;
    }
  `;
  document.head.appendChild(style);

  // Initialize team section
  initTeamCards();
  initLoadMore();

  // Add resize handler for responsive behavior
  let resizeTimeout;
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Re-initialize cards on resize to handle mobile/desktop transitions
      teamCards.forEach(card => {
        if (window.innerWidth > 768) {
          card.classList.remove("active");
        }
      });
    }, 250);
  });
});