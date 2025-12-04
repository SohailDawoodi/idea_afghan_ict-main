// Lineicons CDN برای نسخه 4
const loadLineicons = () => {
    if (!document.querySelector('link[href*="lineicons"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.lineicons.com/4.0/lineicons.css';
        document.head.appendChild(link);
    }
};

// تابع ایجاد مدل TV با آیکون‌های Lineicons 4
function createGlassTVModal(videoSrc = "./assets/video/video_2025-11-12_15-25-19.mp4") {
    // بارگذاری Lineicons اگر وجود ندارد
    loadLineicons();
    
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

    // ایجاد آیکون‌های Lineicons 4 با ایمنی بالا
    const createIcon = (iconName, additionalClasses = '') => {
        const icon = document.createElement('i');
        icon.className = `lni lni-${iconName} ${additionalClasses}`.trim();
        return icon;
    };

    // دکمه بستن با آیکون صحیح
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.appendChild(createIcon('cross-circle')); // آیکون ضربدر دایره‌ای

    const tvStand = document.createElement("div");
    tvStand.className = "glass-tv-stand";

    const tvGlow = document.createElement("div");
    tvGlow.className = "tv-glow";

    const tvBrand = document.createElement("div");
    tvBrand.className = "tv-brand";
    tvBrand.textContent = "IDEA Afghan";

    const tvSpeakers = document.createElement("div");
    tvSpeakers.className = "tv-speakers";
    for (let i = 0; i < 20; i++) {
        const speaker = document.createElement("div");
        speaker.className = "tv-speaker";
        tvSpeakers.appendChild(speaker);
    }

    const controls = document.createElement("div");
    controls.className = "tv-controls";

    // دکمه پلی
    const playBtn = document.createElement("button");
    playBtn.className = "tv-control-btn";
    playBtn.appendChild(createIcon('play', 'tv-control-icon'));

    // دکمه پاز
    const pauseBtn = document.createElement("button");
    pauseBtn.className = "tv-control-btn";
    pauseBtn.appendChild(createIcon('pause', 'tv-control-icon'));

    // دکمه صدا
    const volumeBtn = document.createElement("button");
    volumeBtn.className = "tv-control-btn";
    volumeBtn.appendChild(createIcon('volume-high', 'tv-control-icon'));

    // دکمه تمام‌صفحه
    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.className = "tv-control-btn";
    fullscreenBtn.appendChild(createIcon('full-screen', 'tv-control-icon'));

    // دکمه کنترل صدا (برای تغییر حالت)
    const muteBtn = document.createElement("button");
    muteBtn.className = "tv-control-btn";
    muteBtn.style.display = 'none';
    muteBtn.appendChild(createIcon('volume-mute', 'tv-control-icon'));

    controls.appendChild(playBtn);
    controls.appendChild(pauseBtn);
    controls.appendChild(volumeBtn);
    controls.appendChild(muteBtn);
    controls.appendChild(fullscreenBtn);

    // ایجاد ویدئو
    const video = document.createElement("video");
    video.style.cssText = "width: 100%; height: 100%; object-fit: contain;";
    video.controls = false;
    video.autoplay = false; // تغییر به false برای کنترل بهتر
    video.playsInline = true; // برای iOS
    video.preload = "metadata";
    video.src = videoSrc;
    video.type = "video/mp4";
    
    // افزودن تریک‌های کنترل ویدئو
    const videoControls = document.createElement("div");
    videoControls.className = "video-controls-overlay";
    videoControls.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        padding: 10px;
        display: flex;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 3;
    `;
    
    const progressBar = document.createElement("input");
    progressBar.type = "range";
    progressBar.className = "video-progress";
    progressBar.min = "0";
    progressBar.max = "100";
    progressBar.value = "0";
    progressBar.style.cssText = `
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,0.2);
        outline: none;
    `;
    
    const timeDisplay = document.createElement("span");
    timeDisplay.className = "video-time";
    timeDisplay.style.cssText = `
        color: white;
        font-size: 12px;
        font-family: monospace;
        min-width: 80px;
        display: flex;
        align-items: center;
    `;
    
    videoControls.appendChild(progressBar);
    videoControls.appendChild(timeDisplay);

    // المان‌های دکوراسیون دیوار
    const wallPlantLeft = document.createElement("div");
    wallPlantLeft.className = "wall-decoration wall-plant plant-left";

    const wallPlantRight = document.createElement("div");
    wallPlantRight.className = "wall-decoration wall-plant plant-right";

    const wallShelfLeft = document.createElement("div");
    wallShelfLeft.className = "wall-decoration wall-shelf shelf-left";

    const wallShelfRight = document.createElement("div");
    wallShelfRight.className = "wall-decoration wall-shelf shelf-right";

    // المان‌های محیط TV
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

    // مدیریت رویدادهای صفحه‌کلید
    const handleKeyDown = (e) => {
        if (e.key === "Escape") closeVideo();
        if (e.key === " ") {
            e.preventDefault();
            togglePlayPause();
        }
        if (e.key === "f" || e.key === "F") toggleFullscreen();
        if (e.key === "m" || e.key === "M") toggleMute();
    };

    // تابع بستن ویدئو
    const closeVideo = () => {
        modal.style.opacity = "0";
        tvContainer.style.transform = "scale(0.8) perspective(1000px) rotateX(5deg)";
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            video.pause();
            video.src = ""; // آزاد کردن منابع
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        }, 400);
    };

    // توابع کنترل ویدئو
    const togglePlayPause = () => {
        if (video.paused) {
            video.play();
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        } else {
            video.pause();
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        }
    };

    const toggleMute = () => {
        video.muted = !video.muted;
        if (video.muted) {
            volumeBtn.style.display = 'none';
            muteBtn.style.display = 'flex';
        } else {
            volumeBtn.style.display = 'flex';
            muteBtn.style.display = 'none';
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            tvScreen.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const updateProgress = () => {
        if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.value = progress;
            
            // فرمت زمان
            const formatTime = (seconds) => {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            };
            
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    };

    // اتصال رویدادها
    closeBtn.addEventListener("click", closeVideo);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeVideo();
    });

    playBtn.addEventListener("click", () => {
        video.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    });

    pauseBtn.addEventListener("click", () => {
        video.pause();
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });

    volumeBtn.addEventListener("click", () => {
        video.muted = true;
        volumeBtn.style.display = 'none';
        muteBtn.style.display = 'flex';
    });

    muteBtn.addEventListener("click", () => {
        video.muted = false;
        volumeBtn.style.display = 'flex';
        muteBtn.style.display = 'none';
    });

    fullscreenBtn.addEventListener("click", toggleFullscreen);

    progressBar.addEventListener("input", (e) => {
        if (video.duration) {
            video.currentTime = (e.target.value / 100) * video.duration;
        }
    });

    // رویدادهای ویدئو
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);
    video.addEventListener("ended", () => {
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    });
    
    // نمایش کنترل‌ها روی هاور
    tvScreen.addEventListener("mouseenter", () => {
        videoControls.style.opacity = "1";
    });
    
    tvScreen.addEventListener("mouseleave", () => {
        videoControls.style.opacity = "0";
    });

    document.addEventListener("keydown", handleKeyDown);

    // مونتاژ DOM
    tvScreen.appendChild(video);
    tvScreen.appendChild(reflection);
    tvScreen.appendChild(videoControls);
    
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
    modal.appendChild(wallPlantLeft);
    modal.appendChild(wallPlantRight);
    modal.appendChild(wallShelfLeft);
    modal.appendChild(wallShelfRight);
    
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    // فعال‌سازی انیمیشن‌ها
    setTimeout(() => {
        modal.classList.add("active");
    }, 10);

    // تلاش برای پخش ویدئو
    video.load(); // ابتدا ویدئو را لود می‌کند
    
    // پخش خودکار (با کنترل خطا)
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        }).catch(error => {
            console.log("Autoplay prevented:", error);
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        });
    }
}

// تابع برای اضافه کردن استایل CSS برای آیکون‌ها
const addTVModalStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .tv-control-icon {
            font-size: 1.2rem;
            transition: transform 0.2s;
        }
        
        .tv-control-btn:hover .tv-control-icon {
            transform: scale(1.2);
        }
        
        .close-modal i {
            font-size: 1.4rem;
        }
        
        /* استایل برای کنترل‌های ویدئو */
        .video-progress::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
        }
        
        .video-progress::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
            border: none;
        }
        
        .video-controls-overlay:hover {
            opacity: 1 !important;
        }
        
        /* ریسپانسیو برای آیکون‌ها */
        @media (max-width: 768px) {
            .tv-control-icon {
                font-size: 1rem;
            }
            
            .close-modal i {
                font-size: 1.2rem;
            }
        }
        
        @media (max-width: 480px) {
            .tv-control-icon {
                font-size: 0.9rem;
            }
            
            .close-modal i {
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
};

// بارگذاری استایل‌ها هنگام لود صفحه
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTVModalStyles);
} else {
    addTVModalStyles();
}

// استفاده:
// document.getElementById("videoTrigger").addEventListener("click", function(e) {
//     e.preventDefault();
//     createGlassTVModal("./assets/video/video_2025-11-12_15-25-19.mp4");
// });