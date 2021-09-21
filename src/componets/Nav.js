import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ libraryStatus, setLibraryStatus, darkMode, setDarkMode }) => {

    // style
    const dark = {
        background:' #000',
        color: '#fff',
        borderColor: 'rgb(245, 245, 245)',
        zIndex: 10,
    }
    const light ={
        background:' #fff',
        color: '#000',
        borderColor: 'rgb(65, 65, 65)',
        zIndex: 10,
    }
    

    return (
        <nav>
            <h1>Waves</h1>
            <div>
                <button style={darkMode ? dark : light} onClick={() => setLibraryStatus(!libraryStatus)} >
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
                <button style={darkMode ? dark : light} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? 'Light' : 'Dark'} 
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>
            </div>
        </nav>
    )
}

export default Nav
