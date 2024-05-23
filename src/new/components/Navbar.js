import React from 'react';

function Navbar() {
    return (
        <div className='navbar-custom'>
            <div>
                <div>Logo</div>
            </div>
            <div className='navbar-middle-menu'>
                <div className='navbar-middle-menu'>Section 1</div>
                <div className='navbar-middle-menu'>Section 2</div>
                <div className='navbar-middle-menu'>Section 3</div>
            </div>
            <div className='navbar-right-menu'>
                <div className='navbar-right-menu'>Link 1</div>
                <div className='navbar-right-menu'>Link 2</div>
                <div className='navbar-right-menu'>Link 3</div>
            </div>
        </div>
    );
}

export default Navbar;