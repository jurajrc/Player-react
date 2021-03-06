import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { activeLibraryHandler } from './util';


const Player = ({ 
  isPlaying, 
  setIsPaying, 
  setSongInfo, 
  songInfo, 
  audioRef, 
  songs, 
  setSongs,
  currentSong, 
  setCurrentSong, 
}) => {

  // funcion to actualize active setState and Library
  
    
    // event Handler to pause and play
    const playSongHandler = () => {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPaying(!isPlaying)
      } else {
        audioRef.current.play();
        setIsPaying(!isPlaying)
      }
    }

    // format času pre <p>
    const getTime = (time) => {
      return (
          Math.floor(time / 60) + ":" + ("0" + Math.floor( time % 60)).slice(-2)
      )
    }

    // ručné posunutie bržníka
    const dragHandler = (e) => {
        setSongInfo({...songInfo, currentTime: e.target.value})
        audioRef.current.currentTime = e.target.value
    }

    // check clik to AngleRight and AngleLeft
    const skipTrackHandler = async (direction) => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      if (direction === 'skip-forward') {
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length], songs, setSongs)
      }
      if (direction === 'skip-back') {
        if((currentIndex - 1) % songs.length === -1) {
          await setCurrentSong(songs[songs.length - 1])
          activeLibraryHandler(songs[songs.length - 1], songs, setSongs)
          if(isPlaying) audioRef.current.play();
          return;
        }
        await setCurrentSong(songs[(currentIndex - 1) % songs.length])
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length], songs, setSongs)
      }

      if(isPlaying) audioRef.current.play();
    }
    
    // style animation class animatio-track
    const trackAnim = {
      transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(90deg, ${currentSong.color[0]} 11%, ${currentSong.color[1]} 100%)`}} className="track">
                  <input 
                      min={0} 
                      max={songInfo.duration || 0} 
                      value={songInfo.currentTime} 
                      onChange={dragHandler} 
                      type="range" 
                  />
                  <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration ) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                  onClick={() => skipTrackHandler('skip-back')} className="skip-back" 
                  size="2x" icon={faAngleLeft} />

                <FontAwesomeIcon 
                  onClick={playSongHandler} 
                  className="play" 
                  size="2x" icon={isPlaying ? faPause : faPlay} />

                <FontAwesomeIcon 
                  onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" 
                  size="2x" icon={faAngleRight} />
            </div>
            
        </div>
    )
}

export default Player
