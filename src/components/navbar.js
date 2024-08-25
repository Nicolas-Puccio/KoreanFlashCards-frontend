import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globals } from '../Global'
import '../style/navbar.css'


export default function Navbar() {

    const [showMenu, setShowMenu] = useState(false)


    return (<>
        <div className='navbar'>
            {/* '/' page is user to display list of sonds and song details, if a song is selected it will deselect it and display the song list again*/}
            <Link className='navbar-logo' to='/' onClick={() => { if (Globals.setSelectedSong) Globals.setSelectedSong(undefined) }}>Home</Link>

            {
                // if there is a review session in progress it will stop it
              
                <Link className='navbar-no-text-decoration' to='/review' onClick={() => { if (Globals.setWordsToReview) Globals.setWordsToReview([]) }}>Review</Link>
            }

           

            {/* displays a small popup menu with options*/}
            <button className='navbar-menu-button' onClick={() => setShowMenu(!showMenu)}>MENU</button>

        </div>



        {
            // popup menu
            showMenu &&
            <div className='navbar-menu'>

                <Link className='navbar-no-text-decoration' to='/stats'>Stats</Link>

                
            </div>
        }
    </>)
}