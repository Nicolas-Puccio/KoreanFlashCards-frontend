import React from 'react';
import { Link } from 'react-router-dom';
import { Globals } from '../Global';

class NavBar extends React.Component {
    //state.showMenu is either undefined or true

    render() {
        return <>
            <div className='navbar'>
                <Link className='navbar-logo' to='/' onClick={() => { Globals.SongList?.setState({ song: undefined }) }}>Home</Link>
                <Link to='/review' onClick={() => { Globals.Review?.setState({ word: undefined }) }}>Review</Link>
                <button onClick={() => this.setState({ showMenu: this.state?.showMenu ? undefined : true })}>MENU</button>
            </div>
            {
                this.state?.showMenu &&
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