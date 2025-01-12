import { initializePlayer, setupAudioEvents } from "./player.js";
import { setupActionEvents } from "./events.js";
import { setupFilterEvents } from "./filter.js";
import { renderSongs } from "./playlist.js";
import songs from "./songList.js";

const userData = {
  songs: [...songs],
  currentSong: null,
  songCurrentTime: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  renderSongs(userData.songs, userData);
  setupActionEvents(userData);
  setupFilterEvents(userData, songs);
  setupAudioEvents(userData);
  initializePlayer(userData);
});
