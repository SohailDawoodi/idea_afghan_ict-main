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
