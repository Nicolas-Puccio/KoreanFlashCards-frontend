import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Global from '../Global'
import '../style/navbar.css'


export default function Navbar({ data: { user, setUser } }) {

    const [showMenu, setShowMenu] = useState(false)



    return (<>
        <div className='navbar'>
            {/* '/' page is user to display list of sonds and song details, if a song is selected it will deselect it and display the song list again*/}
            <Link className='navbar-logo' to='/' onClick={() => { if (Global.setSelectedSong) Global.setSelectedSong(undefined) }}>Home</Link>

            {/* if there is a review session in progress it will stop it*/}
            <Link className='navbar-no-text-decoration' to='/review' onClick={() => { if (Global.setWordsToReview) Global.setWordsToReview([]) }}>Review</Link>

            {/* displays a small popup menu with options*/}
            <button onClick={() => setShowMenu(!showMenu)}>MENU</button>
        </div>



        {
            // popup menu
            showMenu &&
            <div className='navbar-menu'>
                <Link className='navbar-no-text-decoration' to='/stats'>Stats</Link>
                <Link className='navbar-no-text-decoration' to='/settings'>Settings</Link>

                {
                    // '/admin' page only visible by admin users
                    user?.admin === 'true' &&
                    <Link className='navbar-no-text-decoration' to='/admin' onClick={() => setShowMenu(false)}>Admin</Link>
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