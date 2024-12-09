export const sortSong = (songList) => {
  songList.sort((a, b) => {
    if (a.title < b.title) return -1;

    if (a.title > b.title) return 1;

    return 0;
  });

  return songList;
};

export const getCurrentSongIndex = userData => {
    return userData?.songs.indexOf(userData?.currentSong);
}

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds/60);
    const secs = Math.floor(seconds%60);

    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
