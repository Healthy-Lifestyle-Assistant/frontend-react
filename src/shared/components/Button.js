import React from 'react';
import { Link } from 'react-router-dom';
import '../style/button.css';

function Button({title, link}) {
    return (
        <Link to={link}>
            <button className='btn-custom'>{title}</button>
        </Link>
    );
}

export default Button;