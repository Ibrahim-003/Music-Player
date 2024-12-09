import songs from "./songList.js";
import { sortSong, getCurrentSongIndex, formatTime } from "./utils.js";

const playlistSongs = document.getElementById("playlist-songs");

// SONG INFO
const songCoverContainer = document.getElementById("cover-container");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

// PROGRESS BAR & TIME
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const currentTimeDisplayed = document.querySelector("#current-time");
const timeDurationDisplayed = document.querySelector("#duration");

// ACTIONS BUTTONS
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

// SORT BUTTONS
const sortListButtons = document.querySelectorAll(".playlist__button")
const sortAll = document.getElementById("sort-all");
const sortSalsa = document.getElementById("sort-salsa");
const sortBoleros = document.getElementById("sort-boleros");



// AUDIO API
const audio = new Audio();

// USER DATA
let userData = {
  songs: [...songs],
  currentSong: null,
  songCurrentTime: 0,
};

const changePlayVisibility = () => {
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist__item");
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

const setPlayerDisplay = () => {
  const currentCoverSrc = userData?.currentSong?.cover;
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  const currentDuration = userData?.currentSong?.duration;

  // datos actuales del DOM
  const displayedTitle = songTitle.textContent || "";
  const displayedArtist = songArtist.textContent || "";

  if (displayedTitle === currentTitle && displayedArtist === currentArtist) {
    return;
  }

  const coverElement = document.createElement("img");
  coverElement.classList.add("cover-image");
  coverElement.alt = currentTitle || "Default Cover";
  coverElement.src = currentCoverSrc || "#";

  songCoverContainer.innerHTML = "";

  songCoverContainer.appendChild(coverElement);
  songTitle.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
  timeDurationDisplayed.textContent = currentDuration
    ? currentDuration
    : "00:00";
};

// PLAY SONG FUNCTIONALITY
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || song.id !== userData?.currentSong.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }
  userData.currentSong = song;
  highlightCurrentSong();
  setPlayerDisplay();
  audio.play();
};

// PAUSE SONG FUNCTIONALITY
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
};

// PLAY NEXT SONG
const playNextSong = () => {
  changePlayVisibility();
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex(userData);
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

// PLAY PREVIOUS SONG
const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex(userData);
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

// RENDER SONGS
const renderSongs = (arr) => {
  const songsHTML = arr
    .map((song) => {
      return `
            <li id="song-${song.id}" class="playlist__item">
                <button class="playlist__item-info" data-song-id="${song.id}">
                    <span class="playlist__item-title">${song.title}</span>
                    <!-- <span class="playlist__item-artist">${song.artist}</span> -->
                    <span class="playlist__item-duration">${song.duration}</span>
                </button>
            </li>
        `;
    })
    .join("");

  playlistSongs.innerHTML = songsHTML;

  const buttons = document.querySelectorAll(".playlist__item-info");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const songId = parseInt(button.getAttribute("data-song-id"), 10);
      changePlayVisibility();
      playSong(songId);
    });
  });
};
renderSongs(sortSong(userData?.songs));


// AUDIO EVENTS
audio.addEventListener("timeupdate", () => {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percentage}%`;
  currentTimeDisplayed.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
  playNextSong();
});

// ACTIONS EVENTS
playButton.addEventListener("click", () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }

  changePlayVisibility();
});

pauseButton.addEventListener("click", () => {
  pauseSong();
  pauseButton.classList.add("hidden");
  playButton.classList.remove("hidden");
});

nextButton.addEventListener("click", () => {
  if (getCurrentSongIndex(userData) === userData?.songs.length - 1) {
    playSong(userData?.songs[0].id);
  } else {
    playNextSong();
  }
});

prevButton.addEventListener("click", () => {
  changePlayVisibility();
  if (getCurrentSongIndex(userData) === 0) {
    playSong(userData?.songs[userData?.songs.length - 1].id);
  } else {
    playPreviousSong();
  }
});

progressContainer.addEventListener("click", (event) => {
  const containerWidth = progressContainer.clientWidth;
  const clickX = event.offsetX;
  const newTime = (clickX / containerWidth) * audio.duration;

  audio.currentTime = newTime;
});

// SORT EVENTS
sortAll.addEventListener("click", () => {
    sortListButtons.forEach((button) => button.classList.remove("active"));
    sortAll.classList.add("active");

  userData.songs = [...songs];
  renderSongs(sortSong(userData?.songs));
});

sortSalsa.addEventListener("click", () => {
    sortListButtons.forEach(button => button.classList.remove("active"));
    sortSalsa.classList.add("active");

  const salsaSongs = songs.filter((song) => song.genre === "salsa");
  userData.songs = [...salsaSongs];
  renderSongs(sortSong(userData?.songs));
});

sortBoleros.addEventListener("click", () => {
    sortListButtons.forEach((button) => button.classList.remove("active"));
    sortBoleros.classList.add("active");

  const boleroSongs = songs.filter((song) => song.genre === "bolero");
  userData.songs = [...boleroSongs];
  renderSongs(sortSong(userData?.songs));
});

document.addEventListener("DOMContentLoaded", () => {
  const firstSong = sortSong(userData?.songs)[0];

  if (firstSong) {
    playSong(firstSong.id);
    changePlayVisibility();
  }
});
