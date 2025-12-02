// Team Section JavaScript - Final Version
document.addEventListener("DOMContentLoaded", function () {
  const teamCards = document.querySelectorAll(".team-card");
  const loadMoreBtn = document.getElementById("loadMoreTeam");

  // Initialize team cards
  function initTeamCards() {
    // Hide extra cards initially
    hideExtraCards();

    teamCards.forEach((card) => {
      // Mobile tap functionality
      card.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          // Prevent social link clicks from triggering card toggle
          if (e.target.closest(".social-link")) return;

          const isActive = this.classList.contains("active");
          // Remove active class from all cards
          teamCards.forEach((c) => c.classList.remove("active"));
          // Toggle active state on clicked card
          if (!isActive) {
            this.classList.add("active");
          }
        }
      });

      // Add keyboard support
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click();
        }
      });

      // Social links interaction
      const socialLinks = card.querySelectorAll(".social-link");
      socialLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        // بهبود افکت هاور
        link.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-5px) scale(1.15)";
          this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
        });

        link.addEventListener("mouseleave", function () {
          this.style.transform = "";
        });
      });
    });
  }

  // Load More functionality
  function initLoadMore() {
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener("click", function () {
      // Show loading state
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="las la-spinner la-spin"></i> Loading...';
      this.disabled = true;

      // Show hidden cards
      const hiddenCards = document.querySelectorAll(".team-card.hidden");

      hiddenCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove("hidden");
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";

          // Trigger animation
          requestAnimationFrame(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          });
        }, index * 100);
      });

      // Hide button after showing all cards
      setTimeout(() => {
        loadMoreBtn.style.display = "none";
        // Restore button text (optional)
        this.innerHTML = originalText;
        this.disabled = false;
      }, hiddenCards.length * 100 + 500);
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

  // Initialize
  initTeamCards();
  initLoadMore();

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Remove active class on desktop
      if (window.innerWidth > 768) {
        teamCards.forEach((card) => card.classList.remove("active"));
      }
    }, 250);
  });
});
