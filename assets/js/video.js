function createGlassTVModal(videoSrc = "./assets/video/video_2025-11-12_15-25-19.mp4") {
            const modal = document.createElement("div");
            modal.className = "glass-tv-modal";
            
            const tvContainer = document.createElement("div");
            tvContainer.className = "glass-tv-container";

            const tvFrame = document.createElement("div");
            tvFrame.className = "glass-tv-frame";

            const tvScreen = document.createElement("div");
            tvScreen.className = "glass-tv-screen";

            const reflection = document.createElement("div");
            reflection.className = "glass-reflection";

            const closeBtn = document.createElement("button");
            closeBtn.innerHTML = '<i class="las la-times"></i>';
            closeBtn.className = "close-modal";

            const tvStand = document.createElement("div");
            tvStand.className = "glass-tv-stand";

            const tvGlow = document.createElement("div");
            tvGlow.className = "tv-glow";

            const tvBrand = document.createElement("div");
            tvBrand.className = "tv-brand";
            tvBrand.textContent = "IDEA AFG";

            const tvSpeakers = document.createElement("div");
            tvSpeakers.className = "tv-speakers";
            for (let i = 0; i < 20; i++) {
                const speaker = document.createElement("div");
                speaker.className = "tv-speaker";
                tvSpeakers.appendChild(speaker);
            }

            const controls = document.createElement("div");
            controls.className = "tv-controls";

            const playBtn = document.createElement("button");
            playBtn.className = "tv-control-btn";
            playBtn.innerHTML = '<i class="las la-play"></i>';

            const pauseBtn = document.createElement("button");
            pauseBtn.className = "tv-control-btn";
            pauseBtn.innerHTML = '<i class="las la-pause"></i>';

            const volumeBtn = document.createElement("button");
            volumeBtn.className = "tv-control-btn";
            volumeBtn.innerHTML = '<i class="las la-volume-up"></i>';

            const fullscreenBtn = document.createElement("button");
            fullscreenBtn.className = "tv-control-btn";
            fullscreenBtn.innerHTML = '<i class="las la-expand"></i>';

            controls.appendChild(playBtn);
            controls.appendChild(pauseBtn);
            controls.appendChild(volumeBtn);
            controls.appendChild(fullscreenBtn);

            const video = document.createElement("video");
            video.style.cssText = "width: 100%; display: block;";
            video.controls = false;
            video.autoplay = true;
            video.src = videoSrc;
            video.type = "video/mp4";

            // Wall decoration elements
            const wallPlantLeft = document.createElement("div");
            wallPlantLeft.className = "wall-decoration wall-plant plant-left";

            const wallPlantRight = document.createElement("div");
            wallPlantRight.className = "wall-decoration wall-plant plant-right";

            const wallShelfLeft = document.createElement("div");
            wallShelfLeft.className = "wall-decoration wall-shelf shelf-left";

            const wallShelfRight = document.createElement("div");
            wallShelfRight.className = "wall-decoration wall-shelf shelf-right";

            // TV Surround Elements
            const tvSurround = document.createElement("div");
            tvSurround.className = "tv-surround-elements";
            
            const tvEl1 = document.createElement("div");
            tvEl1.className = "tv-element tv-el-1";
            
            const tvEl2 = document.createElement("div");
            tvEl2.className = "tv-element tv-el-2";
            
            const tvEl3 = document.createElement("div");
            tvEl3.className = "tv-element tv-el-3";
            
            const tvEl4 = document.createElement("div");
            tvEl4.className = "tv-element tv-el-4";
            
            tvSurround.appendChild(tvEl1);
            tvSurround.appendChild(tvEl2);
            tvSurround.appendChild(tvEl3);
            tvSurround.appendChild(tvEl4);

            const handleKeyDown = (e) => {
                if (e.key === "Escape") closeVideo();
            };

            const closeVideo = () => {
                modal.style.opacity = "0";
                tvContainer.style.transform = "scale(0.8) perspective(1000px) rotateX(5deg)";
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                    video.pause();
                    document.removeEventListener("keydown", handleKeyDown);
                    document.body.style.overflow = "auto";
                }, 400);
            };

            closeBtn.addEventListener("click", closeVideo);
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeVideo();
            });

            playBtn.addEventListener("click", () => {
                video.play();
            });

            pauseBtn.addEventListener("click", () => {
                video.pause();
            });

            volumeBtn.addEventListener("click", () => {
                video.muted = !video.muted;
                volumeBtn.innerHTML = video.muted ? 
                    '<i class="las la-volume-mute"></i>' : 
                    '<i class="las la-volume-up"></i>';
            });

            fullscreenBtn.addEventListener("click", () => {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });

            document.addEventListener("keydown", handleKeyDown);

            tvScreen.appendChild(video);
            tvScreen.appendChild(reflection);
            tvFrame.appendChild(tvScreen);
            tvFrame.appendChild(tvSpeakers);
            tvFrame.appendChild(tvBrand);
            tvFrame.appendChild(closeBtn);
            tvFrame.appendChild(controls);
            tvContainer.appendChild(tvFrame);
            tvContainer.appendChild(tvStand);
            tvContainer.appendChild(tvGlow);
            tvContainer.appendChild(tvSurround);
            modal.appendChild(tvContainer);
            
            // Add wall decorations to modal
            modal.appendChild(wallPlantLeft);
            modal.appendChild(wallPlantRight);
            modal.appendChild(wallShelfLeft);
            modal.appendChild(wallShelfRight);
            
            document.body.appendChild(modal);
            document.body.style.overflow = "hidden";

            // Trigger animations
            setTimeout(() => {
                modal.classList.add("active");
            }, 10);

            // Attempt to play video
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented:", error);
                    playBtn.style.display = "flex";
                });
            }
        }

        // Add event listeners for video buttons
        document.getElementById("videoTrigger").addEventListener("click", function(e) {
            e.preventDefault();
            createGlassTVModal("./assets/video/video_2025-11-12_15-25-19.mp4");
        });