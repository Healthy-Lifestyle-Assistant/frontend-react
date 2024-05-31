import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';
import { truncateStringWithWordBoundary, replaceYouTubeURl } from '../../shared/services/util';

function YouTubeCard({ id, title, subtitle, description, httpRef, httpRefTypeName }) {
    return (
        <div className='card-custom'>
            <div className='card-title-custom'>{truncateStringWithWordBoundary(title, 30)}</div>
            <div className='card-subtitle-custom'>{subtitle}</div>
            <div className='card-description'>{truncateStringWithWordBoundary(description, 200)}</div>

            {httpRefTypeName === 'YOUTUBE' && (
                <iframe width="240" height="140"
                    src={httpRef}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
            )}

            {httpRefTypeName === 'OTHER' && (
                <Button title='Open' link={httpRef} />
            )}
        </div>
    );
}

export default YouTubeCard;