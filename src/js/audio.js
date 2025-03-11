import { playNextSong } from "./player.js";
import { formatTime } from "./utils.js";

export const setupAudioEvents = (userData) => {

    const progressContainer = document.querySelector(".progress-container");
    const progressBar = document.querySelector(".progress-bar");
    const currentTimeDisplayed = document.querySelector("#current-time");
    const timeDurationDisplayed = document.querySelector("#duration");

    // progressContainer.addEventListener("click", (event) => {
    //     const containerWidth = progressContainer.clientWidth;
    //     const clickX = event.offsetX;
    //     const newTime = (clickX / containerWidth) * audio.duration;

    //     audio.currentTime = newTime;
    // });

    audio.addEventListener("timeupdate", () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${percentage}%`;
      currentTimeDisplayed.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
        playNextSong();
    });


}
