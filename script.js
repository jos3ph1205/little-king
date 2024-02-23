/* -----------
VIDEO CONTROLS
----------- */
const demoVideo = document.querySelector(".demo-video");
const video = document.querySelector("#video");

// PLAY STATE TOGGLE
const videoPlayState = demoVideo.querySelector(".ri-pause-line");
videoPlayState.addEventListener("click", (e) => {
   const target = e.target;

   if (target.classList.contains("ri-play-fill")) {
      video.play();
      target.classList.remove("ri-play-fill");
   } else {
      video.pause();
      target.classList.add("ri-play-fill");
   }
});

// RESTART BUTTON
const restart = demoVideo.querySelector(".restart");
const restartBtn = restart.children[0];

video.addEventListener("timeupdate", (e) => {
   if (video.currentTime == video.duration) {
      restart.classList.remove("hidden");
   } else {
      restart.classList.add("hidden");
   }
});

restartBtn.addEventListener("click", (e) => {
   video.play();
   restart.classList.add("hidden");
   videoPlayState.classList.remove("ri-play-fill");
});

// VOLUME CONTROL
const videoVolume = demoVideo.querySelector(".volume").children[0];

videoVolume.addEventListener("mousemove", (e) => {
   const target = e.target;
   video.volume = target.value;
});

// VOLUME MUTE TOGGLE
const videoVolumeMute = demoVideo.querySelector(".ri-volume-mute-fill").addEventListener("click", (e) => {
   const target = e.target;
   const previousVolume = video.volume;

   video.muted = !video.muted;

   if (target.classList.contains("ri-volume-up-fill")) {
      target.classList.remove("ri-volume-up-fill");
      videoVolume.setAttribute("disabled", true);
   } else {
      target.classList.add("ri-volume-up-fill");
      videoVolume.removeAttribute("disabled");
   }
});

// CURRENT TIME / DURATION
let currentTimeEl = demoVideo.querySelector(".current");
let durationEl = demoVideo.querySelector(".duration");

function currentTime() {
   let currentMinutes = Math.floor(video.currentTime / 60);
   let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
   let durationMinutes = Math.floor(video.duration / 60);
   let durationSeconds = Math.floor(video.duration - durationMinutes / 60);

   durationEl.innerHTML = `${durationMinutes}:${durationSeconds}`;
   currentTimeEl.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
}

video.addEventListener("timeupdate", (e) => {
   currentTime();

   if (video.currentTime == video.duration) {
      videoPlayState.classList.add("ri-play-fill");
   }
});

// FULLSCREEN TOGGLE
const fullscreenToggle = demoVideo.querySelector(".fullscreen");
fullscreenToggle.addEventListener("click", (e) => {
   const target = e.target;

   if (target.classList.contains("ri-fullscreen-line")) {
      demoVideo.requestFullscreen();
      target.classList.remove("ri-fullscreen-line");
   } else {
      document.exitFullscreen();
      target.classList.add("ri-fullscreen-line");
   }
});

document.addEventListener("fullscreenchange", (e) => {
   if (!document.webkitIsFullScreen) {
      fullscreenToggle.classList.add("ri-fullscreen-line");
   }
});

// PROGRESS BAR
const progressBar = demoVideo.querySelector(".progress-bar");
const progress = demoVideo.querySelector(".progress");

video.addEventListener("timeupdate", (e) => {
   const percentage = (video.currentTime / video.duration) * 100;
   progress.style.width = `${percentage}%`;
});

// PROGRESS BAR SCRUB
progressBar.addEventListener("click", (e) => {
   const progressTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
   video.currentTime = progressTime;
});

/* -----------------
PRODUCT ZOOM PREVIEW
----------------- */

// ZOOM PREVIEW
const panX = 50;
const panY = 80;

const thumbnail = document.querySelectorAll(".thumbnail").forEach((thumb) => {
   const image = thumb.querySelector("img");

   thumb.addEventListener("mousemove", (e) => {
      let x = e.offsetX - thumb.offsetWidth / 2;
      let y = e.offsetY - thumb.offsetHeight / 2;

      // console.log(`x: ${x} y: ${y}`);

      let translateX = ((x / thumb.offsetWidth) * panX).toFixed(1) * -1;
      let translateY = ((y / thumb.offsetWidth) * panY).toFixed(1) * -1;

      image.style.scale = "2.4";
      if (e.target == thumb) {
         image.style.transform = `translate(${translateX}%, ${translateY}%)`;
      }
   });

   thumb.addEventListener("mouseleave", (e) => {
      image.style.scale = "1";
      image.style.transform = `translateX(0%)`;
   });
});

// FULLSCREEN PREVIEW
const previewEl = document.querySelector(".fullscreen-preview");
const previewImage = previewEl.querySelector("img");

const fullscreenBtn = document.querySelectorAll(".preview-fullscreen").forEach((btn) => {
   const targetImageSrc = btn.previousElementSibling.getAttribute("src");

   btn.addEventListener("click", () => {
      previewEl.classList.toggle("disabled");
      previewImage.setAttribute("src", targetImageSrc);
   });
});

/* -------------
NAVBAR AUTO-HIDE
------------- */

const navbar = document.querySelector(".header");
let scrollY = "";

window.addEventListener("scroll", (e) => {
   scrollY = window.scrollY;

   if (scrollY > 0) {
      navbar.classList.remove("hidden");
   } else if (scrollY == 0) {
      navbar.classList.add("hidden");
   }
});

// HOVER TRIGGER
const trigger = document.querySelector('#nav-bar');

trigger.addEventListener('mouseover', e => {
   if (scrollY == 0) {
      navbar.classList.remove('hidden')
   }

   e.target.addEventListener('mouseleave', e => {
      if (scrollY == 0) {
         navbar.classList.add('hidden');
      }
   })
});

console.log("script.js connected.");
