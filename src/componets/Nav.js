import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ libraryStatus, setLibraryStatus, darkMode, setDarkMode }) => {


    

    return (
        <nav>
            <h1>Player</h1>
            <div style={{zIndex: 10}}>
                <button className={`btn ${darkMode ? 'btn-dark' : 'btn-light'}`} onClick={() => setLibraryStatus(!libraryStatus)} >
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
                <button className={`btn ${darkMode ? 'btn-dark' : 'btn-light'}`} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? 'Light' : 'Dark'} 
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>
            </div>
        </nav>
    )
}

export default Nav
