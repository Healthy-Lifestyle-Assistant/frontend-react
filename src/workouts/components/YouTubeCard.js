import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { truncateStringWithWordBoundary, replaceYouTubeURl } from '../../shared/services/util';

function YouTubeCard({ id, title, subtitle, description, httpRef }) {
    return (
        <div className='card-custom'>
            <div className='card-title-custom'>{truncateStringWithWordBoundary(title, 30)}</div>
            <div className='card-subtitle-custom'>{subtitle}</div>
            <div className='card-description'>{truncateStringWithWordBoundary(description, 200)}</div>
            <iframe width="240" height="140"
                src={httpRef}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
        </div>
    );
}

export default YouTubeCard;