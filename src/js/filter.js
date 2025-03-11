import { renderSongs } from "./playlist.js";

export const setupFilterEvents = (userData, songs) => {
    const filterButtons = document.querySelectorAll(".playlist__button");
    const filterAll = document.getElementById("sort-all")
    const filterSalsa = document.getElementById("sort-salsa");
    const filterBoleros = document.getElementById("sort-boleros");

    filterAll.addEventListener("click", () => {
        filterButtons.forEach((button) => {
            button.classList.remove("active");
        })
        filterAll.classList.add("active");

        userData.songs = [...songs];
        renderSongs(userData.songs, userData);
    });

    filterSalsa.addEventListener("click", () => {
        filterButtons.forEach((button) => {
            button.classList.remove("active");
        })
        filterSalsa.classList.add("active");

        const salsaSongs = songs.filter((song) => song.genre === "salsa");
        userData.songs = [...salsaSongs];
        renderSongs(userData.songs, userData);
    });

    filterBoleros.addEventListener("click", () => {
        filterButtons.forEach((button) => {
            button.classList.remove("active");
        })
        filterBoleros.classList.add("active");

        const boleroSongs = songs.filter((song) => song.genre === "bolero");
        userData.songs = [...boleroSongs];
        renderSongs(userData.songs, userData);
    });
}
