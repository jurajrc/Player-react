import React from 'react'

const LibrarySong = ({ song, setCurrentSong, songs, id, audioRef, isPlaying, setSongs }) => {

    // prebahne všetky songy vyberie podla kliknuteho id - uloží do set
    const songSelectHandler = async () => {
        const selectedSong = songs.filter((one) => one.id === id)
        await setCurrentSong(selectedSong[0]) // [0] lebo je to pole z jednym objektom

        // Add Active State to Lybrary video 16
        const newSongs = songs.map((song) => {
          if(song.id === id) {
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

        // check if the song is playing
        if(isPlaying) audioRef.current.play()
    }

    // rendering
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-discription">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
