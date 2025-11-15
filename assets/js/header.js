// Enhanced header controller with improved functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS if available
  if (typeof AOS !== "undefined" && AOS.init) {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // Sticky header functionality
  const header = document.getElementById("mainHeader");
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
          header.classList.add("hidden");
        } else {
          header.classList.remove("hidden");
        }
      } else {
        header.classList.remove("scrolled", "hidden");
      }
      lastScrollY = window.scrollY;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // Mobile menu toggle - activates at 980px
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  
  function toggleMobileMenu() {
    if (window.innerWidth <= 980) {
      if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          mobileToggle.classList.toggle("active");
          document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileToggle.classList.remove("active");
            document.body.style.overflow = "";
          });
        });
      }
    } else {
      // Remove event listeners for desktop
      if (mobileToggle && navMenu) {
        mobileToggle.removeEventListener("click", null);
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  }

  // Initial setup and on resize
  toggleMobileMenu();
  window.addEventListener("resize", toggleMobileMenu);

  // Language selector
  const languageSelector = document.getElementById("languageSelector");
  if (languageSelector) {
    const languageBtn = languageSelector.querySelector(".language-btn");
    const langOptions = languageSelector.querySelectorAll(".lang-option");
    const currentLang = languageBtn ? languageBtn.querySelector("span") : null;

    function updateLanguage(lang) {
      langOptions.forEach((opt) => opt.classList.remove("active"));
      const el = document.querySelector(`.lang-option[data-lang="${lang}"]`);
      if (el) el.classList.add("active");
      if (currentLang) currentLang.textContent = lang === "en" ? "EN" : "FA";
      localStorage.setItem("language", lang);
      
      // Update direction and language attributes
      if (lang === "fa") {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "fa");
        document.body.classList.add("rtl");
        document.body.classList.remove("ltr");
      } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", "en");
        document.body.classList.add("ltr");
        document.body.classList.remove("rtl");
      }
    }

    // Set initial language from localStorage or default to English
    const initialLang = localStorage.getItem("language") || "en";
    updateLanguage(initialLang);

    if (languageBtn) {
      languageBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        languageSelector.classList.toggle("active");
      });
    }

    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const lang = option.getAttribute("data-lang");
        updateLanguage(lang);
        languageSelector.classList.remove("active");
      });
    });

    document.addEventListener("click", () => {
      languageSelector.classList.remove("active");
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;
  if (themeToggle) {
    const stored = localStorage.getItem("Inazuma_WebTheme") || "light";
    htmlEl.setAttribute("data-web-theme", stored === "dark" ? "dark" : "light");
    
    // Set initial theme classes
    if (stored === "dark") {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-web-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-web-theme", next);
      
      // Update body class for compatibility
      if (next === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      
      localStorage.setItem("Inazuma_WebTheme", next);
    });
  }

  // Enhanced particle system for hero background
  function createEnhancedParticles() {
    const container = document.getElementById("particlesContainer");
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    const particleCount = 80;
    const particleTypes = ['circle', 'triangle', 'square', 'line', 'star'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      
      particle.classList.add("particle", `particle-${type}`);
      
      // Random size based on type
      let size;
      switch(type) {
        case 'circle':
          size = Math.random() * 10 + 3;
          break;
        case 'triangle':
          size = Math.random() * 8 + 4;
          break;
        case 'square':
          size = Math.random() * 8 + 3;
          break;
        case 'line':
          size = Math.random() * 15 + 5;
          break;
        case 'star':
          size = Math.random() * 6 + 2;
          break;
        default:
          size = Math.random() * 6 + 2;
      }
      
      particle.style.width = type === 'line' ? `${size}px` : `${size}px`;
      particle.style.height = type === 'line' ? '1px' : `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 20;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      const opacity = Math.random() * 0.7 + 0.1;
      particle.style.opacity = opacity;
      
      // Add random rotation for variety
      if (type !== 'circle') {
        const rotation = Math.random() * 360;
        particle.style.setProperty('--rotation', `${rotation}deg`);
      }
      
      container.appendChild(particle);
    }
  }
  
  createEnhancedParticles();

  // Enhanced hero animations
  function initHeroAnimations() {
    const heroImage = document.querySelector('.hero-image');
    const floatingElements = document.querySelectorAll('.floating-element');
    const heroContainer = document.querySelector('.hero-image-container');
    
    if (heroImage && heroContainer) {
      // Add parallax effect to hero image
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px) scale(1.02)`;
      });
      
      // Hover effects for hero container
      heroContainer.addEventListener('mouseenter', () => {
        heroContainer.style.transform = 'translateY(-10px) scale(1.02)';
        heroContainer.style.boxShadow = '0 30px 80px rgba(61, 99, 221, 0.4)';
      });
      
      heroContainer.addEventListener('mouseleave', () => {
        heroContainer.style.transform = 'translateY(0) scale(1)';
        heroContainer.style.boxShadow = '';
      });
    }
    
    // Enhanced floating elements animation
    floatingElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.7}s`;
      element.style.animationDuration = `${8 + index * 1.5}s`;
      
      // Add interactive hover effect
      element.addEventListener('mouseenter', () => {
        element.style.transform = 'scale(1.2) rotate(10deg)';
        element.style.filter = 'brightness(1.3)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.filter = '';
      });
    });
    
    // Background shape animations
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      shape.style.animationDelay = `${index * 2}s`;
    });
  }
  
  initHeroAnimations();

  // Watch intro button
  const watchIntroBtn = document.getElementById("watchIntroBtn");
  if (watchIntroBtn) {
    watchIntroBtn.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.className = "video-modal";
      modal.style.cssText = `position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.9);display: flex;align-items: center;justify-content: center;z-index: 10000;`;
      
      const videoContainer = document.createElement("div");
      videoContainer.className = "video-container";
      videoContainer.style.cssText = `width: 90%;max-width: 900px;background: #000;border-radius: 15px;overflow: hidden;position: relative;box-shadow: 0 20px 60px rgba(0,0,0,0.5);`;
      
      const closeBtn = document.createElement("button");
      closeBtn.className = "video-close";
      closeBtn.innerHTML = '<i class="lni lni-close"></i>';
      closeBtn.style.cssText = `position: absolute;top: 15px;right: 15px;background: rgba(255,255,255,0.2);border: none;color: white;width: 40px;height: 40px;border-radius: 50%;display: flex;align-items: center;justify-content: center;cursor: pointer;z-index: 10;transition: all 0.3s ease;`;
      
      closeBtn.addEventListener("mouseenter", () => {
        closeBtn.style.background = "rgba(255,255,255,0.3)";
        closeBtn.style.transform = "scale(1.1)";
      });
      
      closeBtn.addEventListener("mouseleave", () => {
        closeBtn.style.background = "rgba(255,255,255,0.2)";
        closeBtn.style.transform = "scale(1)";
      });
      
      const video = document.createElement("video");
      video.style.cssText = `width: 100%; display: block;`;
      video.controls = true;
      video.src = "./assets/video/video_2025-11-12_15-25-19.mp4";
      
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal);
        video.pause();
      });
      
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          video.pause();
        }
      });
      
      videoContainer.appendChild(closeBtn);
      videoContainer.appendChild(video);
      modal.appendChild(videoContainer);
      document.body.appendChild(modal);
      
      // Auto play with error handling
      video.play().catch((e) => console.log("Autoplay prevented:", e));
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav link based on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  function updateActiveNavLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100)
        current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`)
        link.classList.add("active");
    });
  }
  window.addEventListener("scroll", updateActiveNavLink);
});