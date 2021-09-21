import React, { useState, useRef } from 'react';
// styles
import './styles/app.scss';

// data
import data from './data';

// components
import Nav from './componets/Nav';
import Player from './componets/Player';
import Song from './componets/Song';
import Library from './componets/Library';
import { activeLibraryHandler } from './styles/util';

function App() {
  // state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ref
  const audioRef = useRef(null);

  // function
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    // calculate Percetage
    const roundedCurent = Math.round(current)
    const roundedDuration = Math.round(duration)
    const animation = Math.round(((roundedCurent / roundedDuration) * 100 ))
    setSongInfo({
        ...songInfo, 
            currentTime: current,
            duration,
            animationPercentage: animation,
    })
}

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length], songs, setSongs);
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''} ${darkMode ? 'dark-active' : ''}`}>
      <Nav 
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Song 
        currentSong={currentSong} 
        isPlaying={isPlaying}
        
      />
      <Player 
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPaying={setIsPaying}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        darkMode={darkMode}
      />

      <audio
        onTimeUpdate={timeUpdateHandler} // časoví interval sa aktualizujú duration a currentTime
        onLoadedMetadata={timeUpdateHandler} // pri zmene songu sa načitaju (Metadata)časové data
        ref={audioRef} // toto na miesto premennej, čo sa má playnuť a pauznúť
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
