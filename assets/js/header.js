// Lightweight header controller
// All runtime code is wrapped in DOMContentLoaded and guarded so it won't error

//     init() {
//         this.bindEvents();
//         this.handleScroll();
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS if available
  if (typeof AOS !== "undefined" && AOS.init) {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }

  // Header scroll effect
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

  // Mobile menu toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
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
      if (lang === "fa") {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "fa");
      } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", "en");
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
        // Optional redirect behavior: uncomment if you want to redirect to separate pages
        // if (lang === 'fa') window.location.href = './indexFa.html'; else window.location.href = './index.html';
      });
    });

    document.addEventListener("click", () => {
      languageSelector.classList.remove("active");
    });
  }

  // Theme toggle (use Inazuma_WebTheme and data-web-theme on <html>)
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;
  if (themeToggle) {
    const stored = localStorage.getItem("Inazuma_WebTheme") || "light";
    htmlEl.setAttribute("data-web-theme", stored === "dark" ? "dark" : "light");
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-web-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-web-theme", next);
      localStorage.setItem("Inazuma_WebTheme", next);
    });
  }

  // Create particles for hero background
  function createParticles() {
    const container = document.getElementById("particlesContainer");
    if (!container) return;
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      const delay = Math.random() * 15;
      const duration = 15 + Math.random() * 10;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      container.appendChild(particle);
    }
  }
  createParticles();

  // Watch intro button (guard)
  const watchIntroBtn = document.getElementById("watchIntroBtn");
  if (watchIntroBtn) {
    watchIntroBtn.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.style.cssText = `position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.8);display: flex;align-items: center;justify-content: center;z-index: 10000;`;
      const videoContainer = document.createElement("div");
      videoContainer.style.cssText = `width: 80%;max-width: 800px;background: #000;border-radius: 10px;overflow: hidden;position: relative;`;
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = '<i class="lni lni-close"></i>';
      closeBtn.style.cssText = `position: absolute;top: 10px;right: 10px;background: rgba(255,255,255,0.2);border: none;color: white;width: 40px;height: 40px;border-radius: 50%;display: flex;align-items: center;justify-content: center;cursor: pointer;z-index: 10;`;
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
document.documentElement.setAttribute("dir", "rtl");
