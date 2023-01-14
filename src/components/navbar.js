import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Globals } from '../Global'


export default function NavBar() {

    const [showMenu, setShowMenu] = useState(false)

    return (<>
        <div className='navbar'>
            <Link className='navbar-logo' to='/' onClick={() => { if (Globals.setSelectedSong) Globals.setSelectedSong(undefined) }}>Home</Link>
            <Link to='/review' onClick={() => { if (Globals.setWordsToReview) Globals.setWordsToReview([]) }}>Review</Link>
            <button onClick={() => setShowMenu(!showMenu)}>MENU</button>
        </div>
        {
            showMenu &&//consider: should i close menu after clicking a Link?
            <div className='navbar-menu'>
                <Link to='/stats'>Stats</Link>
                <Link to='/admin'>Admin</Link>
                <Link to='/'>Logout</Link>
            </div>
        }
    </>)
}