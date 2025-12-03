// Optimized Header Controller
document.addEventListener("DOMContentLoaded", () => {
    // Core elements
    const header = document.getElementById("mainHeader");
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");
    const themeToggle = document.getElementById("themeToggle");
    const languageSelector = document.getElementById("languageSelector");
    const navLinks = document.querySelectorAll(".nav-link");
    const videoTrigger = document.getElementById("videoTrigger");
    const watchIntroBtn = document.getElementById("watchIntroBtn");
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    // Apply saved theme
    const applyTheme = () => {
        const savedTheme = localStorage.getItem("Inazuma_WebTheme") || "light";
        document.documentElement.setAttribute("data-web-theme", savedTheme);
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
    };
    applyTheme();

    // Header scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add("scrolled");
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add("hidden");
            } else {
                header.classList.remove("hidden");
            }
        } else {
            header.classList.remove("scrolled", "hidden");
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            mobileToggle.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 980) {
                    navMenu.classList.remove("active");
                    mobileToggle.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && 
                !navMenu.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                mobileToggle.classList.remove("active");
                document.body.style.overflow = "";
            }
        });

        // Close menu on resize to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 980) {
                navMenu.classList.remove("active");
                mobileToggle.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-web-theme") || "light";
            const next = current === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-web-theme", next);
            document.body.classList.toggle("dark-theme", next === "dark");
            localStorage.setItem("Inazuma_WebTheme", next);
        });
    }

    // Language selector
    if (languageSelector) {
        const languageBtn = languageSelector.querySelector(".language-btn");
        const langOptions = languageSelector.querySelectorAll(".lang-option");

        const updateLanguage = (lang) => {
            // Update active class
            langOptions.forEach(opt => opt.classList.remove("active"));
            const activeOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (activeOption) activeOption.classList.add("active");
            
            // Update button text
            const currentLangSpan = languageBtn.querySelector("span");
            if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();

            // Update document attributes
            document.documentElement.setAttribute("lang", lang);
            document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
            document.body.classList.toggle("rtl", lang === "fa");
            
            // Save to localStorage
            localStorage.setItem("language", lang);
        };

        // Initialize language
        const savedLang = localStorage.getItem("language") || "en";
        updateLanguage(savedLang);

        // Language selector toggle
        if (languageBtn) {
            languageBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                languageSelector.classList.toggle("active");
            });
        }

        // Language selection
        langOptions.forEach(option => {
            option.addEventListener("click", () => {
                const lang = option.getAttribute("data-lang");
                updateLanguage(lang);
                languageSelector.classList.remove("active");
            });
        });

        // Close language selector when clicking outside
        document.addEventListener("click", (e) => {
            if (languageSelector.classList.contains("active") && 
                !languageSelector.contains(e.target)) {
                languageSelector.classList.remove("active");
            }
        });
    }

    // Active nav link highlighting
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll("section[id]");
        const scrollPos = window.scrollY + 100;
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    // Throttled scroll for active nav
    let navScrollTimeout;
    window.addEventListener("scroll", () => {
        if (!navScrollTimeout) {
            navScrollTimeout = setTimeout(() => {
                updateActiveNavLink();
                navScrollTimeout = null;
            }, 50);
        }
    });

    // Initialize active nav
    updateActiveNavLink();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Video buttons
    if (videoTrigger) {
        videoTrigger.addEventListener("click", function(e) {
            e.preventDefault();
            createGlassTVModal("./assets/video/video_2025-11-12_15-25-19.mp4");
        });
    }

    if (watchIntroBtn) {
        watchIntroBtn.addEventListener("click", function(e) {
            e.preventDefault();
            createGlassTVModal("./assets/video/تبلیغات شرکت آیدیا افغان2.mp4");
        });
    }

    // Tab functionality for About section
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Footer functionality
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Add hover effect to social icons on mobile
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('touchstart', function() {
            this.classList.add('hovered');
            setTimeout(() => {
                this.classList.remove('hovered');
            }, 300);
        });
    });
    
    // Add click animation to footer links
    const footerLinks = document.querySelectorAll('.footer-links li a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Add click animation
            this.style.transform = 'translateX(10px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
});