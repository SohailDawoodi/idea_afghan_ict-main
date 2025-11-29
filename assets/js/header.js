// Optimized Header Controller - FIXED MOBILE TOGGLE
document.addEventListener("DOMContentLoaded", () => {
    // Performance variables
    let lastScrollY = window.scrollY;
    let ticking = false;
    const header = document.getElementById("mainHeader");
    const scrollThreshold = 100;

    // Apply theme immediately
    const applyTheme = () => {
        const savedTheme = localStorage.getItem("Inazuma_WebTheme") || "light";
        document.documentElement.setAttribute("data-web-theme", savedTheme);
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
    };
    applyTheme();

    // High-performance scroll handler
    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > scrollThreshold) {
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

    // Optimized scroll with throttling
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Smooth scrolling optimization
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

    // Mobile menu with better performance - FIXED
    const mobileToggle = document.getElementById("mobileToggle");
    const navMenu = document.getElementById("navMenu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            // Only toggle on mobile screens
            if (window.innerWidth <= 980) {
                navMenu.classList.toggle("active");
                mobileToggle.classList.toggle("active");
                document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
            }
        });

        // Close menu on link click - FIXED
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 980) {
                    navMenu.classList.remove("active");
                    mobileToggle.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        });

        // Close menu on resize to desktop - FIXED
        window.addEventListener("resize", () => {
            if (window.innerWidth > 980) {
                navMenu.classList.remove("active");
                mobileToggle.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    // Enhanced theme toggle
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-web-theme") || "light";
            const next = current === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-web-theme", next);
            document.body.classList.toggle("dark-theme", next === "dark");
            localStorage.setItem("Inazuma_WebTheme", next);
        });
    }

    // Language selector with better performance
    const languageSelector = document.getElementById("languageSelector");
    if (languageSelector) {
        const languageBtn = languageSelector.querySelector(".language-btn");
        const langOptions = languageSelector.querySelectorAll(".lang-option");

        const updateLanguage = (lang) => {
            langOptions.forEach(opt => opt.classList.remove("active"));
            const activeOption = document.querySelector(`.lang-option[data-lang="${lang}"]`);
            if (activeOption) activeOption.classList.add("active");
            
            const currentLangSpan = languageBtn.querySelector("span");
            if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();

            // Update document attributes
            document.documentElement.setAttribute("lang", lang);
            document.documentElement.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
            document.body.classList.toggle("rtl", lang === "fa");
            
            localStorage.setItem("language", lang);
        };

        // Initialize language
        updateLanguage(localStorage.getItem("language") || "en");

        // Language selector events
        if (languageBtn) {
            languageBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                languageSelector.classList.toggle("active");
            });
        }

        langOptions.forEach(option => {
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

    // Active nav link highlighting with Intersection Observer
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-link");
        
        let current = "";
        const scrollPos = window.scrollY + 100;

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

    // Initialize active nav on load
    updateActiveNavLink();


    // TV-style video modal
    // const watchIntroBtn = document.getElementById("watchIntroBtn");
    // const videoTrigger = document.getElementById("videoTrigger");
    
    // const createVideoModal = () => {
    //     const modal = document.createElement("div");
    //     modal.className = "tv-modal-overlay active";
    //     modal.style.cssText = `
    //         position: fixed;
    //         top: 0;
    //         left: 0;
    //         width: 100%;
    //         height: 100%;
    //         background: rgba(0,0,0,0.95);
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         z-index: 10000;
    //     `;

    //     const tvContainer = document.createElement("div");
    //     tvContainer.className = "tv-modal enhanced";
    //     tvContainer.style.cssText = `
    //         width: 90%;
    //         max-width: 900px;
    //         background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
    //         border: 15px solid #000;
    //         border-radius: 15px;
    //         padding: 30px;
    //         box-shadow: 
    //             0 0 30px rgba(255, 215, 0, 0.3),
    //             inset 0 0 20px rgba(0, 0, 0, 0.8);
    //         position: relative;
    //         transform: scale(0.9);
    //         transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    //     `;

    //     const tvScreen = document.createElement("div");
    //     tvScreen.className = "tv-screen enhanced";
    //     tvScreen.style.cssText = `
    //         position: relative;
    //         background: #000;
    //         border-radius: 8px;
    //         overflow: hidden;
    //         box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.9);
    //     `;
        
    //     const closeBtn = document.createElement("button");
    //     closeBtn.innerHTML = '<i class="las la-times"></i>';
    //     closeBtn.className = "close-modal";
    //     closeBtn.style.cssText = `
    //         position: absolute;
    //         top: 15px;
    //         right: 15px;
    //         width: 40px;
    //         height: 40px;
    //         background: rgba(255,255,255,0.2);
    //         border: none;
    //         border-radius: 50%;
    //         color: white;
    //         font-size: 1.2rem;
    //         cursor: pointer;
    //         z-index: 10;
    //         transition: all 0.3s ease;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //     `;

    //     const video = document.createElement("video");
    //     video.style.cssText = "width: 100%; display: block;";
    //     video.controls = true;
    //     video.autoplay = true;
    //     video.src = "./assets/video/تبلیغات شرکت آیدیا افغان2.mp4";
    //     video.type = "video/mp4";

    //     const handleKeyDown = (e) => {
    //         if (e.key === "Escape") closeVideo();
    //     };

    //     const closeVideo = () => {
    //         modal.style.opacity = "0";
    //         tvContainer.style.transform = "scale(0.9)";
    //         setTimeout(() => {
    //             if (modal.parentNode) {
    //                 document.body.removeChild(modal);
    //             }
    //             video.pause();
    //             document.removeEventListener("keydown", handleKeyDown);
    //             document.body.style.overflow = "auto";
    //         }, 300);
    //     };

    //     closeBtn.addEventListener("click", closeVideo);
    //     modal.addEventListener("click", (e) => {
    //         if (e.target === modal) closeVideo();
    //     });

    //     document.addEventListener("keydown", handleKeyDown);

    //     tvScreen.appendChild(video);
    //     tvContainer.appendChild(closeBtn);
    //     tvContainer.appendChild(tvScreen);
    //     modal.appendChild(tvContainer);
    //     document.body.appendChild(modal);
    //     document.body.style.overflow = "hidden";

    //     // Add TV stand
    //     const tvStand = document.createElement("div");
    //     tvStand.className = "tv-stand";
    //     tvStand.style.cssText = `
    //         position: absolute;
    //         bottom: -40px;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         width: 150px;
    //         height: 15px;
    //         background: linear-gradient(to bottom, #8B4513, #A0522D, #8B4513);
    //         border-radius: 8px 8px 0 0;
    //         box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    //     `;
    //     tvContainer.appendChild(tvStand);

    //     // Add screen reflection
    //     const screenReflection = document.createElement("div");
    //     screenReflection.className = "screen-reflection";
    //     screenReflection.style.cssText = `
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         right: 0;
    //         bottom: 0;
    //         background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
    //         pointer-events: none;
    //         z-index: 1;
    //     `;
    //     tvScreen.appendChild(screenReflection);

    //     // Add TV glow effect
    //     const tvGlow = document.createElement("div");
    //     tvGlow.className = "tv-glow";
    //     tvGlow.style.cssText = `
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         right: 0;
    //         bottom: 0;
    //         border-radius: 15px;
    //         box-shadow: 0 0 60px 15px rgba(255, 215, 0, 0.4);
    //         opacity: 0;
    //         animation: tvGlow 4s infinite;
    //         pointer-events: none;
    //         z-index: -1;
    //     `;
    //     tvContainer.appendChild(tvGlow);

    //     // Add glow animation
    //     const glowStyles = `
    //         @keyframes tvGlow {
    //             0%, 100% { opacity: 0; }
    //             50% { opacity: 1; }
    //         }
    //     `;
    //     const glowStyleSheet = document.createElement("style");
    //     glowStyleSheet.textContent = glowStyles;
    //     document.head.appendChild(glowStyleSheet);

    //     // Trigger animations
    //     setTimeout(() => {
    //         modal.style.opacity = "1";
    //         tvContainer.style.transform = "scale(1)";
    //     }, 10);

    //     // Attempt to play video
    //     const playPromise = video.play();
    //     if (playPromise !== undefined) {
    //         playPromise.catch(error => {
    //             console.log("Autoplay prevented:", error);
    //         });
    //     }
    // };

    // // Add event listeners for video buttons
    // if (watchIntroBtn) {
    //     watchIntroBtn.addEventListener("click", function(e) {
    //         e.preventDefault();
    //         createVideoModal();
    //     });
    // }

    // if (videoTrigger) {
    //     videoTrigger.addEventListener("click", function(e) {
    //         e.preventDefault();
    //         createVideoModal();
    //     });
    // }
    // for video model 
//     function createGlassTVModal(videoSrc = "./assets/video/video_2025-11-12_15-25-19.mp4") {
//     const modal = document.createElement("div");
//     modal.className = "glass-tv-modal";
//     modal.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0,0,0,0.95);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 10000;
//     `;

//     const tvContainer = document.createElement("div");
//     tvContainer.className = "glass-tv-container";
//     tvContainer.style.cssText = `
//         width: 90%;
//         max-width: 1000px;
//         position: relative;
//     `;

//     const tvFrame = document.createElement("div");
//     tvFrame.className = "glass-tv-frame";

//     const tvScreen = document.createElement("div");
//     tvScreen.className = "glass-tv-screen";

//     const reflection = document.createElement("div");
//     reflection.className = "glass-reflection";

//     const closeBtn = document.createElement("button");
//     closeBtn.innerHTML = '<i class="las la-times"></i>';
//     closeBtn.className = "close-modal";

//     const tvStand = document.createElement("div");
//     tvStand.className = "glass-tv-stand";

//     const tvGlow = document.createElement("div");
//     tvGlow.className = "tv-glow";

//     const tvBrand = document.createElement("div");
//     tvBrand.className = "tv-brand";
//     tvBrand.textContent = "IDEA AFG";

//     const tvSpeakers = document.createElement("div");
//     tvSpeakers.className = "tv-speakers";
//     for (let i = 0; i < 20; i++) {
//         const speaker = document.createElement("div");
//         speaker.className = "tv-speaker";
//         tvSpeakers.appendChild(speaker);
//     }

//     const controls = document.createElement("div");
//     controls.className = "tv-controls";

//     const playBtn = document.createElement("button");
//     playBtn.className = "tv-control-btn";
//     playBtn.innerHTML = '<i class="las la-play"></i>';

//     const pauseBtn = document.createElement("button");
//     pauseBtn.className = "tv-control-btn";
//     pauseBtn.innerHTML = '<i class="las la-pause"></i>';

//     const volumeBtn = document.createElement("button");
//     volumeBtn.className = "tv-control-btn";
//     volumeBtn.innerHTML = '<i class="las la-volume-up"></i>';

//     const fullscreenBtn = document.createElement("button");
//     fullscreenBtn.className = "tv-control-btn";
//     fullscreenBtn.innerHTML = '<i class="las la-expand"></i>';

//     controls.appendChild(playBtn);
//     controls.appendChild(pauseBtn);
//     controls.appendChild(volumeBtn);
//     controls.appendChild(fullscreenBtn);

//     const video = document.createElement("video");
//     video.style.cssText = "width: 100%; display: block;";
//     video.controls = false;
//     video.autoplay = true;
//     video.src = videoSrc; // استفاده از پارامتر ورودی
//     video.type = "video/mp4";

//     const handleKeyDown = (e) => {
//         if (e.key === "Escape") closeVideo();
//     };

//     const closeVideo = () => {
//         modal.style.opacity = "0";
//         tvContainer.style.transform = "scale(0.8)";
//         setTimeout(() => {
//             if (modal.parentNode) {
//                 document.body.removeChild(modal);
//             }
//             video.pause();
//             document.removeEventListener("keydown", handleKeyDown);
//             document.body.style.overflow = "auto";
//         }, 400);
//     };

//     closeBtn.addEventListener("click", closeVideo);
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) closeVideo();
//     });

//     playBtn.addEventListener("click", () => {
//         video.play();
//     });

//     pauseBtn.addEventListener("click", () => {
//         video.pause();
//     });

//     volumeBtn.addEventListener("click", () => {
//         video.muted = !video.muted;
//         volumeBtn.innerHTML = video.muted ? 
//             '<i class="las la-volume-mute"></i>' : 
//             '<i class="las la-volume-up"></i>';
//     });

//     fullscreenBtn.addEventListener("click", () => {
//         if (video.requestFullscreen) {
//             video.requestFullscreen();
//         } else if (video.webkitRequestFullscreen) {
//             video.webkitRequestFullscreen();
//         } else if (video.msRequestFullscreen) {
//             video.msRequestFullscreen();
//         }
//     });

//     document.addEventListener("keydown", handleKeyDown);

//     tvScreen.appendChild(video);
//     tvScreen.appendChild(reflection);
//     tvFrame.appendChild(tvScreen);
//     tvFrame.appendChild(tvSpeakers);
//     tvFrame.appendChild(tvBrand);
//     tvFrame.appendChild(closeBtn);
//     tvFrame.appendChild(controls);
//     tvContainer.appendChild(tvFrame);
//     tvContainer.appendChild(tvStand);
//     tvContainer.appendChild(tvGlow);
//     modal.appendChild(tvContainer);
//     document.body.appendChild(modal);
//     document.body.style.overflow = "hidden";

//     // Trigger animations
//     setTimeout(() => {
//         modal.classList.add("active");
//     }, 10);

//     // Attempt to play video
//     const playPromise = video.play();
//     if (playPromise !== undefined) {
//         playPromise.catch(error => {
//             console.log("Autoplay prevented:", error);
//             // Show play button if autoplay is blocked
//             playBtn.style.display = "flex";
//         });
//     }
// }

// // Add event listeners for video buttons
// document.getElementById("videoTrigger").addEventListener("click", function(e) {
//     e.preventDefault();
//     createGlassTVModal("./assets/video/video_2025-11-12_15-25-19.mp4");
// });

// // Add event listener for watchIntroBtn
// const watchIntroBtn = document.getElementById("watchIntroBtn");
// if (watchIntroBtn) {
//     watchIntroBtn.addEventListener("click", function(e) {
//         e.preventDefault();
//         // اینجا می‌توانید آدرس ویدیوی متفاوتی قرار دهید
//         createGlassTVModal("./assets/video/تبلیغات شرکت آیدیا افغان2.mp4");
//     });
// }

// Add event listeners for video buttons
document.getElementById("videoTrigger").addEventListener("click", function(e) {
    e.preventDefault();
    createGlassTVModal("./assets/video/video_2025-11-12_15-25-19.mp4");
});

// Add event listener for watchIntroBtn
const watchIntroBtn = document.getElementById("watchIntroBtn");
if (watchIntroBtn) {
    watchIntroBtn.addEventListener("click", function(e) {
        e.preventDefault();
        createGlassTVModal("./assets/video/تبلیغات شرکت آیدیا افغان2.mp4");
    });
}

    // Tab functionality for About section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Initialize Lottie animations
    const initLottieAnimations = () => {
        // Check if Lottie is available
        if (typeof lottie !== 'undefined') {
            // Animation container for hero section
            const animationContainer = document.getElementById('heroAnimation');
            if (animationContainer) {
                // Load Lottie animation
                const animation = lottie.loadAnimation({
                    container: animationContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: 'https://assets1.lottiefiles.com/packages/lf20_ukaaBq.json' // Replace with your animation URL
                });
                
                // Adjust animation for dark/light mode
                const adjustAnimationForTheme = () => {
                    const isDark = document.body.classList.contains('dark-theme');
                    // You can adjust animation colors based on theme if needed
                    // This would require a custom Lottie animation with dynamic colors
                };
                
                // Listen for theme changes
                const themeToggle = document.getElementById('themeToggle');
                if (themeToggle) {
                    themeToggle.addEventListener('click', adjustAnimationForTheme);
                }
                
                adjustAnimationForTheme();
            }
        } else {
            // Fallback animation if Lottie is not available
            const animationContainer = document.getElementById('heroAnimation');
            if (animationContainer) {
                animationContainer.innerHTML = `
                    <div class="fallback-animation">
                        <div class="animation-circle design"></div>
                        <div class="animation-circle development"></div>
                        <div class="animation-circle marketing"></div>
                        <div class="animation-circle accounting"></div>
                        <div class="animation-circle mobile"></div>
                        <div class="central-icon">
                            <i class="las la-rocket"></i>
                        </div>
                    </div>
                `;
            }
        }
    };

    initLottieAnimations();
});
