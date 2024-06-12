import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../style/navbar.css';

function Navbar({ isLoggedIn, userData }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const navbarLinks = [
      { title: 'Workout', to: '/workouts' },
      { title: 'Meals', to: '/meals' },
      { title: 'Mental Health', to: '/mental-health' },
      { title: 'Calendar', to: '/calendar' },
      { title: 'Statistics', to: '/statistics' },
    ];

    return (
        <>
            <div className='navbar-custom'>
                <div className='navbar-logo'>
                    <div><span style={{ fontWeight: 'bold' }}>HEALTHY</span><span style={{ fontStyle: 'italic' }}>Life</span></div>
                </div>
                <div className='navbar-middle-menu'>
                    {navbarLinks.map(({ title, to }) => (
                      <Link key={title} className='navbar-menu-item' to={to}>{title}</Link>
                    ))}
                </div>
                <div className='navbar-right-menu'>
                    {isLoggedIn ? <>
                        {userData && userData.body ? <div>Hello, {userData.body.fullName}!</div> : <div>No user data</div>}
                        <Link className='navbar-menu-item' to={'/logout'}>Logout</Link>
                    </> : <>
                        <Link className='navbar-menu-item' to={'/login'}>Login</Link>
                        <Link className='navbar-menu-item' to={'/signup'}>Signup</Link>
                    </>}
                </div>

                <div className="navbar-toggle" onClick={toggleMenu}>
                    <div className="navbar-bar"></div>
                    <div className="navbar-bar"></div>
                    <div className="navbar-bar"></div>
                </div>
            </div>

            <div className={`${isOpen ? 'navbar-hidden-open' : 'navbar-hidden'}`}>
                <div className='navbar-middle-menu-hidden'>
                    {navbarLinks.map(({ title, to }) => (
                      <Link key={title} className='navbar-menu-item' to={to}>{title}</Link>
                    ))}
                </div>
                <div className='navbar-right-menu-hidden'>
                    {isLoggedIn ? <>
                        {userData && userData.body ? <div className='navbar-menu-item'>Hello, {userData.body.fullName}!</div> : <div>No user data</div>}
                        <Link className='navbar-menu-item' to={'/logout'}>Logout</Link>
                    </> : <>
                        <Link className='navbar-menu-item' to={'/login'}>Login</Link>
                        <Link className='navbar-menu-item' to={'/signup'}>Signup</Link>
                    </>}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
    };
};

export default connect(mapStateToProps)(Navbar);