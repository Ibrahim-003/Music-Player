import { changeActionVisibility } from "./events.js";
import { playSong } from "./player.js";

export const renderSongs = (songs, userData) => {
  const playlistSongs = document.getElementById("playlist-songs");

  const songsHTML = songs
    .map(
      (song) => `
        <li id="song-${song.id}" class="playlist__item">
                <button class="playlist__item-info" data-song-id="${song.id}">
                    <span class="playlist__item-title">${song.title}</span>
                    <span class="playlist__item-duration">${song.duration}</span>
                </button>
            </li>
    `
    )
    .join("");

  playlistSongs.innerHTML = songsHTML;

  document.querySelectorAll(".playlist__item-info").forEach((button) => {
    button.addEventListener("click", () => {
      const songId = parseInt(button.dataset.songId, 10);
      playSong(songId, userData);
      changeActionVisibility("play");
    });
  });
};

export const hightlightCurrentSong = (userData) => {
  const playlistSongsElements = document.querySelectorAll(".playlist__item");
  playlistSongsElements.forEach((songElement) => {
    songElement.removeAttribute("aria-current");
  });

  const currentSongElement = document.getElementById(
    `song-${userData.currentSong?.id}`
  );

  if (currentSongElement) {
    currentSongElement.setAttribute("aria-current", "true");
  }
};

export const setPlayerDisplay = (userData) => {
  const currentSongTitle = document.getElementById("song-title");
  const { cover, title, artist, duration } = userData.currentSong || {};

  if (currentSongTitle.textContent === title) {
    return;
  }

  const playerCover = document.getElementById("cover-container");
  const coverElement = document.createElement("img");
  coverElement.classList.add("cover-image");
  coverElement.src = cover;
  coverElement.alt = `${title} by ${artist}`;

  playerCover.innerHTML = "";
  playerCover.appendChild(coverElement);

  document.getElementById("song-title").textContent = title || "";
  document.getElementById("song-artist").textContent = artist || "";
  document.getElementById("duration").textContent  = duration || "00:00";
};
