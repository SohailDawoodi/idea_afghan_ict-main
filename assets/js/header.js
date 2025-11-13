// class Header {
//     constructor() {
//         this.header = document.getElementById('mainHeader');
//         this.navMenu = document.getElementById('navMenu');
//         this.mobileToggle = document.getElementById('mobileToggle');
//         this.lastScrollY = window.scrollY;
//         this.scrollDirection = 'down';
        
//         this.init();
//     }
    
//     init() {
//         this.bindEvents();
//         this.handleScroll();
//     }
    
//     bindEvents() {
//         // Mobile menu toggle
//         this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        
//         // Close mobile menu when clicking on links
//         document.querySelectorAll('.nav-link').forEach(link => {
//             link.addEventListener('click', () => this.closeMobileMenu());
//         });
        
//         // Scroll event
//         window.addEventListener('scroll', () => this.handleScroll());
        
//         // Language selector
//         this.initLanguageSelector();
//     }
    
//     toggleMobileMenu() {
//         this.navMenu.classList.toggle('active');
//         this.mobileToggle.classList.toggle('active');
//         document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
//     }
    
//     closeMobileMenu() {
//         this.navMenu.classList.remove('active');
//         this.mobileToggle.classList.remove('active');
//         document.body.style.overflow = '';
//     }
    
//     handleScroll() {
//         const currentScrollY = window.scrollY;
//         this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
//         if (currentScrollY > 100) {
//             this.header.classList.add('scrolled');
//             if (this.scrollDirection === 'down' && currentScrollY > 200) {
//                 this.header.classList.add('hidden');
//             } else {
//                 this.header.classList.remove('hidden');
//             }
//         } else {
//             this.header.classList.remove('scrolled', 'hidden');
//         }
        
//         this.lastScrollY = currentScrollY;
//     }
    
//     initLanguageSelector() {
//         const languageSelector = document.getElementById('languageSelector');
//         const languageBtn = languageSelector.querySelector('.language-btn');
//         const langOptions = languageSelector.querySelectorAll('.lang-option');
        
//         languageBtn.addEventListener('click', (e) => {
//             e.stopPropagation();
//             languageSelector.classList.toggle('active');
//         });
        
//         langOptions.forEach(option => {
//             option.addEventListener('click', () => {
//                 const lang = option.getAttribute('data-lang');
//                 this.changeLanguage(lang);
//                 languageSelector.classList.remove('active');
//             });
//         });
        
//         // Close dropdown when clicking outside
//         document.addEventListener('click', () => {
//             languageSelector.classList.remove('active');
//         });
//     }
    
//     changeLanguage(lang) {
//         const currentLang = document.querySelector('.current-lang');
//         const activeOption = document.querySelector('.lang-option.active');
        
//         if (activeOption) {
//             activeOption.classList.remove('active');
//         }
        
//         document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
//         currentLang.textContent = lang.toUpperCase();
        
//         // Here you would typically load language files
//         console.log('Language changed to:', lang);
//     }
// }

// // Initialize header when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new Header();
// });
 
        // Initialize AOS
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        // Header scroll effect
        const header = document.getElementById('mainHeader');
        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateHeader() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                if (window.scrollY > lastScrollY && window.scrollY > 200) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('scrolled', 'hidden');
            }
            lastScrollY = window.scrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Language selector
        const languageSelector = document.getElementById('languageSelector');
        const languageBtn = languageSelector.querySelector('.language-btn');
        const langOptions = languageSelector.querySelectorAll('.lang-option');
        const currentLang = languageBtn.querySelector('span');

        // Set initial language from localStorage or default to English
        let currentLanguage = localStorage.getItem('language') || 'en';
        updateLanguage(currentLanguage);

        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('active');
        });

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                updateLanguage(lang);
                languageSelector.classList.remove('active');
            });
        });

        function updateLanguage(lang) {
            // Remove active class from all options
            langOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            document.querySelector(`.lang-option[data-lang="${lang}"]`).classList.add('active');
            
            // Update button text
            currentLang.textContent = lang === 'en' ? 'EN' : 'FA';
            
            // Save to localStorage
            localStorage.setItem('language', lang);
            
            // Here you would typically load language files
            console.log('Language changed to:', lang);
            
            // Update text direction for RTL languages
            if (lang === 'fa') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'fa');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            languageSelector.classList.remove('active');
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check for saved theme preference or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Save theme preference
            const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });

        // Create particles for hero background
        function createParticles() {
            const container = document.getElementById('particlesContainer');
            const particleCount = 40;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 2px and 8px
                const size = Math.random() * 6 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay and duration
                const delay = Math.random() * 15;
                const duration = 15 + Math.random() * 10;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                
                // Random opacity
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                container.appendChild(particle);
            }
        }

        // Initialize particles
        createParticles();

        // Watch intro button
        const watchIntroBtn = document.getElementById('watchIntroBtn');
        watchIntroBtn.addEventListener('click', () => {
            // Create a modal for video
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            
            const videoContainer = document.createElement('div');
            videoContainer.style.cssText = `
                width: 80%;
                max-width: 800px;
                background: #000;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="lni lni-close"></i>';
            closeBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10;
            `;
            
            const video = document.createElement('video');
            video.style.cssText = `width: 100%; display: block;`;
            video.controls = true;
            video.src = './assets/video/video_2025-11-12_15-25-19.mp4'; // Replace with actual video path
            
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                video.pause();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    video.pause();
                }
            });
            
            videoContainer.appendChild(closeBtn);
            videoContainer.appendChild(video);
            modal.appendChild(videoContainer);
            document.body.appendChild(modal);
            
            // Play video
            video.play().catch(e => console.log('Autoplay prevented:', e));
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add active class to nav links based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveNavLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        window.addEventListener('scroll', updateActiveNavLink);
