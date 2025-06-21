let play = document.getElementById("played");
let audio = document.getElementById("audio");
let Img = document.getElementById("img");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let volumeup = document.getElementById("volume-up");
let volumedown = document.getElementById("volume-down");
let duration = document.getElementById("duration");
let currentTime = document.getElementById("current-Time");
let progress = document.getElementById("seek-bar");
let trackNameDisplay = document.getElementById("track-name");

function formattime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}
let Audiotracks = [
    "kissik.mp3",
    "thragadhi.mp3",
    "siri.mp3"
];
let tracknames = [
    "kssik.jpg",
    "tharagadhi.jpg",
    "sirivennela.jpg"
];
let tracklist = [
    "kissik pushpa2",
    "tharagadhi",
    "sirivennela"
];

let currentindex = 0;

audio.src = Audiotracks[currentindex];
Img.src = tracknames[currentindex];
trackNameDisplay.textContent = tracklist[currentindex];

audio.addEventListener("loadedmetadata", function () {
    duration.textContent = formattime(audio.duration);
    currentTime.textContent = formattime(audio.currentTime);
    progress.max = 100;
});

audio.addEventListener("timeupdate", function () {
    currentTime.textContent = formattime(audio.currentTime);
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", function () {
    let seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    currentTime.textContent = formattime(seekTime);
});
play.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        played.className = "bi bi-pause-fill";
        Img.classList.add("rotate");
    } else {
        audio.pause();
        played.className = "bi bi-play-fill";
        Img.classList.remove("rotate");
    }
});
next.addEventListener("click", function () {
    currentindex = (currentindex + 1) % Audiotracks.length;
    audio.src = Audiotracks[currentindex];
    Img.src = tracknames[currentindex];
    trackNameDisplay.textContent = tracklist[currentindex];
    audio.play();
    played.className = "bi bi-pause-fill";
    Img.classList.add("rotate");
});

prev.addEventListener("click", function () {
    currentindex = (currentindex - 1 + Audiotracks.length) % Audiotracks.length;
    audio.src = Audiotracks[currentindex];
    Img.src = tracknames[currentindex];
    trackNameDisplay.textContent = tracklist[currentindex];
    audio.play();
    played.className = "bi bi-pause-fill";
    Img.classList.add("rotate");
});

volumeup.addEventListener("click", function () {
    if (audio.volume < 1) {
        audio.volume = Math.min(1, Math.round((audio.volume + 0.1) * 10) / 10);
        console.log("Volume Up:", audio.volume);
    }
});

volumedown.addEventListener("click", function () {
    if (audio.volume > 0) {
        audio.volume = Math.max(0, Math.round((audio.volume - 0.1) * 10) / 10);
        console.log("Volume Down:", audio.volume);
    }
});
