import React from 'react';
import { Link } from 'react-router-dom';

function CardButton({title, link}) {
    return (
        <Link to={link}>
            <button className='card-btn'>{title}</button>
        </Link>
    );
}

export default CardButton;