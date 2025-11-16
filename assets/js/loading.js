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

// // Enhanced JavaScript for interactive elements
// document.addEventListener('DOMContentLoaded', function() {
  
//   // Services Section Animation
//   const serviceItems = document.querySelectorAll('.service-item');
//   serviceItems.forEach(item => {
//     item.addEventListener('mouseenter', function() {
//       this.style.transform = 'translateY(-10px)';
//     });
    
//     item.addEventListener('mouseleave', function() {
//       this.style.transform = 'translateY(0)';
//     });
//   });
  
//   // About Section Tabs
//   const tabButtons = document.querySelectorAll('.tab-btn');
//   const tabPanels = document.querySelectorAll('.tab-panel');
  
//   tabButtons.forEach(button => {
//     button.addEventListener('click', function() {
//       const targetTab = this.getAttribute('data-tab');
      
//       // Remove active class from all buttons and panels
//       tabButtons.forEach(btn => btn.classList.remove('active'));
//       tabPanels.forEach(panel => panel.classList.remove('active'));
      
//       // Add active class to current button and panel
//       this.classList.add('active');
//       document.getElementById(targetTab).classList.add('active');
//     });
//   });
  
//   // Video Modal Functionality
//   const videoTrigger = document.getElementById('videoTrigger');
//   const videoModal = document.getElementById('videoModal');
//   const closeModal = document.getElementById('closeModal');
//   const introVideo = document.getElementById('introVideo');
  
//   if (videoTrigger && videoModal) {
//     videoTrigger.addEventListener('click', function() {
//       videoModal.classList.add('active');
//       document.body.style.overflow = 'hidden';
      
//       // Play video when modal opens
//       setTimeout(() => {
//         if (introVideo) {
//           const playPromise = introVideo.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(error => {
//               console.log('Autoplay prevented:', error);
//             });
//           }
//         }
//       }, 500);
//     });
    
//     closeModal.addEventListener('click', function() {
//       videoModal.classList.remove('active');
//       document.body.style.overflow = 'auto';
      
//       // Pause video when modal closes
//       if (introVideo) introVideo.pause();
//     });
    
//     // Close modal when clicking outside
//     videoModal.addEventListener('click', function(e) {
//       if (e.target === videoModal) {
//         videoModal.classList.remove('active');
//         document.body.style.overflow = 'auto';
        
//         // Pause video when modal closes
//         if (introVideo) introVideo.pause();
//       }
//     });
//   }
  
//   // Scroll Reveal Animation
//   // const scrollRevealElements = document.querySelectorAll('.scroll-revealed');
  
//   // const scrollObserver = new IntersectionObserver(function(entries) {
//   //   entries.forEach(entry => {
//   //     if (entry.isIntersecting) {
//   //       entry.target.style.animation = 'fadeIn 0.8s ease forwards';
//   //       scrollObserver.unobserve(entry.target);
//   //     }
//   //   });
//   // }, {
//   //   threshold: 0.1,
//   //   rootMargin: '0px 0px -50px 0px'
//   // });
  
//   // 
  
// });