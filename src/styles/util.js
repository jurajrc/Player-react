// actualize active Library on click use App, Player
export const activeLibraryHandler = (nextPrev, songs, setSongs) => {
    const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id) {
          return {
              ...song, active: true,
          };
      } else {
          return {
              ...song, active: false,
          };
      }
    })
    setSongs(newSongs)
  }