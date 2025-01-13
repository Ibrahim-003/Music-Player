import { changeActionVisibility } from "./events.js";
import { hightlightCurrentSong, setPlayerDisplay } from "./playlist.js";
import { getCurrentSongIndex, formatTime } from "./utils.js";

const audio = new Audio();

export const playSong = (id, userData) => {
  const song = userData.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData.currentSong === null || song.id !== userData.currentSong.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  userData.currentSong = song;
  hightlightCurrentSong(userData);
  setPlayerDisplay(userData);
  audio.play();
};

export const pauseSong = (userData) => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
};

export const playPreviousSong = (userData) => {
  if (userData.currentSong === null) {
    playSong(userData.songs[0].id, userData);
  } else if (getCurrentSongIndex(userData) === 0) {
    playSong(userData.songs[userData.songs.length - 1].id, userData);
  } else {
    const previousSong = userData.songs[getCurrentSongIndex(userData) - 1];
    playSong(previousSong.id, userData);
  }
};

export const playNextSong = (userData) => {
  if (
    userData.currentSong === null ||
    getCurrentSongIndex(userData) === userData.songs.length - 1
  ) {
    playSong(userData.songs[0].id, userData);
  } else {
    const nextSong = userData.songs[getCurrentSongIndex(userData) + 1];
    playSong(nextSong.id, userData);
  }
};

export const setupAudioEvents = (userData) => {
  const progressContainer = document.querySelector(".progress-container");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeDisplayed = document.querySelector("#current-time");

  progressContainer.addEventListener("click", (event) => {
    const containerWidth = progressContainer.clientWidth;
    const clickX = event.offsetX;
    const newTime = (clickX / containerWidth) * audio.duration;

    audio.currentTime = newTime;
  });

  audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`;
    currentTimeDisplayed.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    playNextSong(userData);
  });
};

export const initializePlayer = (userData) => {
  const firstSong = userData.songs[0];
  if (firstSong) {
    playSong(firstSong.id, userData);
    changeActionVisibility("play");
  }
};
