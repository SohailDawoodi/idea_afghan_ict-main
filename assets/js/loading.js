// Optimized Loading Animation
document.addEventListener("DOMContentLoaded", function () {
    const loadingPage = document.getElementById("loadingPage");
    const mainContent = document.getElementById("mainContent");
    const loadingPercentage = document.getElementById("loadingPercentage");
    const progressBar = document.getElementById("progressBar");

    let progress = 0;
    const targetProgress = 100;
    const duration = 2000; // 2 seconds total
    const steps = 20;
    const increment = targetProgress / steps;
    const stepDuration = duration / steps;

    const updateProgress = () => {
        progress += increment;
        if (progress > targetProgress) progress = targetProgress;

        loadingPercentage.textContent = Math.floor(progress) + "%";
        progressBar.style.width = progress + "%";

        if (progress < targetProgress) {
            setTimeout(updateProgress, stepDuration);
        } else {
            setTimeout(() => {
                loadingPage.classList.add("fade-out");
                setTimeout(() => {
                    loadingPage.style.display = "none";
                    mainContent.style.display = "block";
                    // Initialize animations after loading
                    initPageAnimations();
                }, 800);
            }, 300);
        }
    };

    // Start progress animation
    setTimeout(updateProgress, 100);
});

// Initialize page animations after load
function initPageAnimations() {
    // Use Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-item, .team-member, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
