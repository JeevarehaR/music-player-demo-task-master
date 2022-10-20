// data
const music_list = [
  {
    img: "https://i.ytimg.com/vi/MJmxdlCtFWU/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBgBwsqLjtQ3kwEBFdAQk1BA1Z6cw",
    name: "Two Two Two",
    film: "Kaathuvaakula Rendu Kaadhal",
    artist: "Anirudh",
    music: "music/Two Two Two.mp3",
  },
  {
    img: "https://i0.wp.com/99lyricstore.com/wp-content/uploads/2021/10/jugnu-lyrics-badshah.jpg",
    name: "Jugnu",
    film: "Badshah",
    artist: "Nikhita Gandhi | Akanksha Sharma",
    music: "music/Jugnu.mp3",
  },
  {
    img: "https://i.ytimg.com/vi/WgrLE4Fqxeo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLChxO0w-PnVS3BHxzppCEkDJLYItw",
    name: "Bullet",
    film: "The Warrior",
    artist: "DSP",
    music: "music/Bullet.mp3",
  },
  {
    img: "https://i.ytimg.com/vi/Y3-PeuQ7nvY/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD0X9wJRcr-CnZsdyity_untFPoF",
    name: "Yanji",
    film: "Vikram Vedha",
    artist: "Sam C.S",
    music: "music/Yanji.mp3",
  },
];

// helpers

const zeroPad = (num) => String(num).padStart(2, "0");

function secondsToMinutes(time) {
  return zeroPad(Math.floor(time / 60)) + ":" + zeroPad(Math.floor(time % 60));
}
let trackIndex = 0;
let currTrack = document.createElement("audio");
let isPlaying = false;
let isRandom = false;

let playPauseBtn = document.querySelector(".playpause-track");
const musicMetaName = document.querySelector(".music-meta_name");
const musicMetaFilm = document.querySelector(".music-meta_film");
const musicMetaArtist = document.querySelector(".music-meta_artist");
const albumArt = document.querySelector(".album-art");
let updateTimer;
loadTrack(trackIndex);
// Complete the below functions
function loadTrack(trackIndex) {
  const { music } = music_list.at(trackIndex);
  console.log(music);
  currTrack.src = music;
  currTrack.load();
  updateMetaData(trackIndex);
}

function updateMetaData(trackIndex) {
  const { img, name, film, artist } = music_list.at(trackIndex);
  musicMetaName.innerText = name;
  musicMetaFilm.innerText = film;
  musicMetaArtist.innerText = artist;
  albumArt.src = img;
  updateTimer = setInterval(setUpdate, 1000);
}

let startTime = document.querySelector(".start-time");
let endTime = document.querySelector(".end-time");

function setUpdate() {
  let seekPosition = (currTrack.currentTime / currTrack.duration) * 100;
  seekBar.value = seekPosition;
  updateSeekBarFilled();

  startTime.innerText = secondsToMinutes(currTrack.currentTime);
  endTime.innerText = secondsToMinutes(currTrack.duration);

  // console.log(
  //   secondsToMinutes(currTrack.currentTime),
  //   secondsToMinutes(currTrack.duration),
  //   seekPosition.toFixed(2)
  // );
}

function updateSeekBarFilled() {
  seekBarFilled.style.width = seekBar.value - 1 + "%";
}

function repeatTrack() {
  loadTrack(trackIndex);
  playTrack();
}

function randomTrack() {
  isRandom = !isRandom;
}

function nextTrack() {
  let currIndex = isRandom
    ? Number.parseInt(Math.random() * music_list.length)
    : trackIndex + 1;
  playCurrSong(currIndex);
}

function playCurrSong(currIndex) {
  trackIndex = currIndex % music_list.length;
  loadTrack(trackIndex);
  playTrack();
  console.log(trackIndex, music_list.at(trackIndex)?.name);
}

function prevTrack() {
  let currIndex = isRandom
    ? Number.parseInt(Math.random() * music_list.length)
    : trackIndex - 1;
  playCurrSong(currIndex);
}

function playTrack() {
  currTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
  albumArt.classList.add("rotate");
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa fa-play fa-3x"></i>';
  albumArt.classList.remove("rotate");
}

function seekTo() {
  currTrack.currentTime = currTrack.duration * (seekBar.value / 100);
  // console.log(
  //   currTrack.duration,
  //   seekBar.value,
  //   secondsToMinutes(currTrack.currentTime),
  //   secondsToMinutes(currTrack.duration)
  // );
}
