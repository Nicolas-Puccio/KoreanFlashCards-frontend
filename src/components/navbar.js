import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globals } from '../Global'
import '../style/navbar.css'


export default function Navbar({ data: { user, setUser } }) {

    const [showMenu, setShowMenu] = useState(false)



    return (<>
        <div className='navbar'>
            {/* '/' page is user to display list of sonds and song details, if a song is selected it will deselect it and display the song list again*/}
            <Link className='navbar-logo' to='/' onClick={() => { if (Globals.setSelectedSong) Globals.setSelectedSong(undefined) }}>Home</Link>

            {/* if there is a review session in progress it will stop it*/}
            <Link className='navbar-no-text-decoration' to='/review' onClick={() => { if (Globals.setWordsToReview) Globals.setWordsToReview([]) }}>Review</Link>

            {/* displays a small popup menu with options*/}
            <button className='navbar-menu-button' onClick={() => setShowMenu(!showMenu)}>MENU</button>
        </div>



        {
            // popup menu
            showMenu &&
            <div className='navbar-menu'>
                {
                    // '/admin' page only visible by admin users
                    user?.admin === 'true' &&
                    <Link className='navbar-no-text-decoration' to='/admin' onClick={() => setShowMenu(false)}>Admin</Link>
                }


                {
                    // '/test' page only visible by admin users
                    user?.admin === 'true' &&
                    <Link className='navbar-no-text-decoration' to='/test' onClick={() => setShowMenu(false)}>Test</Link>
                }


                <Link className='navbar-no-text-decoration' to='/stats'>Stats</Link>
                <Link className='navbar-no-text-decoration' to='/settings'>Settings</Link>


                {
                    // login button only visible if not logged in
                    !user &&
                    <Link className='navbar-no-text-decoration' to='/login' onClick={() => setShowMenu(false)}>Login</Link>
                }


                {
                    // logout button only visible if logged in
                    user &&
                    <Link className='navbar-no-text-decoration' to='/' onClick={() => {
                        document.cookie = 'token=;'
                        setUser(undefined)
                        setShowMenu(false)
                    }}>Logout</Link>
                }
            </div>
        }
    </>)
}