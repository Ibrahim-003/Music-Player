import {
  playSong,
  pauseSong,
  playPreviousSong,
  playNextSong,
} from "./player.js";

export const setupActionEvents = (userData) => {
  const playButton = document.getElementById("play-button");
  const pauseButton = document.getElementById("pause-button");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  playButton.addEventListener("click", () => {
    playSong(userData.currentSong?.id || userData.songs[0].id, userData);
    changeActionVisibility("play");
  });

  pauseButton.addEventListener("click", () => {
    pauseSong(userData);
    changeActionVisibility("pause");
  });

  prevButton.addEventListener("click", () => {
    playPreviousSong(userData);
    changeActionVisibility("play");
  });

  nextButton.addEventListener("click", () => {
    playNextSong(userData);
    changeActionVisibility("play");
  });
};

export const changeActionVisibility = (actionButton) => {
  const playButton = document.getElementById("play-button");
  const pauseButton = document.getElementById("pause-button");

  if (actionButton === "play") {
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden");
  } else {
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden");
  }
};
