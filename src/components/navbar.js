import React from 'react';
import { Link } from 'react-router-dom';
import { Globals } from '../Global';

class NavBar extends React.Component {

    songListDeselect() {//fix need to come up with a better name
        if (Globals.songList)
            Globals.songList.deselect()
    }



    render() {
        return <div className='navbar'>
            <Link className='navbar-logo' to='/' onClick={() => { if (Globals.songList) Globals.songList.deselect() }}>Home</Link>
            <Link to='/review'>Review</Link>
            <button>MENU</button>
        </div>
    }
}

export default NavBar;