import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return <div className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/review'>Review</Link>
        </div>
    }
}

export default NavBar;