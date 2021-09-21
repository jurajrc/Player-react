import React from 'react';

// component
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, darkMode }) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""} ${darkMode ? 'dark-active' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song)  => (
                  <LibrarySong 
                    key={song.id} 
                    song={song} 
                    songs={songs}
                    id={song.id}
                    setCurrentSong={setCurrentSong}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library
