import React from 'react';
import { Link } from 'react-router-dom';
import { Globals } from '../Global';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <>
            <div className='navbar'>
                <Link className='navbar-logo' to='/' onClick={() => { if (Globals.setSelectedSong) Globals.setSelectedSong(undefined) }}>Home</Link>
                <Link to='/review' onClick={() => { if (Globals.setWordsToReview) Globals.setWordsToReview([]) }}>Review</Link>
                <button onClick={() => this.setState({ showMenu: !this.state.showMenu })}>MENU</button>
            </div>
            {
                //consider: should i close menu after clicking a Link?
                this.state.showMenu &&
                <div className='navbar-menu'>
                    <Link to='/stats'>Stats</Link>
                    <Link to='/admin'>Admin</Link>
                    <Link to='/'>Logout</Link>
                </div>
            }
        </>
    }
}

export default NavBar;