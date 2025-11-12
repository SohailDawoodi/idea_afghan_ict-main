document.addEventListener("DOMContentLoaded", function () {
  const loadingPage = document.getElementById("loadingPage");
  const mainContent = document.getElementById("mainContent");
  const loadingPercentage = document.getElementById("loadingPercentage");
  const progressBar = document.getElementById("progressBar");
  const reloadButton = document.getElementById("reloadButton");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 100) progress = 100;

    loadingPercentage.textContent = Math.floor(progress) + "%";
    progressBar.style.width = progress + "%";

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingPage.classList.add("fade-out");
        setTimeout(() => {
          loadingPage.style.display = "none";
          mainContent.style.display = "block";
        }, 800);
      }, 500);
    }
  }, 200);
});

// language section 
document.addEventListener('DOMContentLoaded', function() {
            const languageSelector = document.getElementById('languageSelector');
            const languageButton = languageSelector.querySelector('.language-button');
            const languageOptions = document.querySelectorAll('.language-option');
            const currentLanguage = languageButton.querySelector('.current-language');
            
            // Function to detect user's preferred language
            function detectUserLanguage() {
                const userLang = navigator.language || navigator.userLanguage;
                
                // Check if the language is Persian/Dari
                if (userLang.startsWith('fa') || userLang.startsWith('ar') || userLang.startsWith('ps')) {
                    return 'fa';
                } else {
                    return 'en';
                }
            }
            
            // Get current page language from URL or set default
            function getCurrentPageLanguage() {
                const path = window.location.pathname;
                if (path.includes('indexFa.html')) {
                    return 'fa';
                }
                return 'en'; 
            }
            
            // Set initial language based on current page
            const currentPageLang = getCurrentPageLanguage();
            const userLanguage = detectUserLanguage();
            
            // Update UI based on current page language
            if (currentPageLang === 'fa') {
                currentLanguage.textContent = 'فارسی';
                languageOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-lang') === 'fa') {
                        option.classList.add('active');
                    }
                });
            } else {
                currentLanguage.textContent = 'English';
                languageOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-lang') === 'en') {
                        option.classList.add('active');
                    }
                });
            }
            
            // Toggle dropdown
            languageButton.addEventListener('click', function(e) {
                e.stopPropagation();
                languageSelector.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                languageSelector.classList.remove('active');
            });
            
            // Handle language selection
            languageOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    const selectedLang = this.getAttribute('data-lang');
                    const currentLang = getCurrentPageLanguage();
                    
                    // If selecting the same language, just close dropdown
                    if (selectedLang === currentLang) {
                        languageSelector.classList.remove('active');
                        return;
                    }
                    
                    // Remove active class from all options
                    languageOptions.forEach(opt => opt.classList.remove('active'));
                    
                    // Add active class to selected option
                    this.classList.add('active');
                    
                    // Update button text
                    currentLanguage.textContent = this.querySelector('.language-name').textContent;
                    
                    // Close dropdown
                    languageSelector.classList.remove('active');
                    
                    // Redirect to the selected language page
                    if (selectedLang === 'fa') {
                        window.location.href = 'indexFa.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                });
            });
        });
