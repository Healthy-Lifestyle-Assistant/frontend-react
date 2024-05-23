import React from 'react';
import CardButton from './CardButton';
import CardTags from './CardTags';

function Card({title, subtitle, tags, description, btnTitle, btnLink}) {
    return (
        <div className='card-border card-width card-padding card-margin card-bg card-shadow'>
            <div className='card-title'>{title}</div>
            <div className='card-subtitle'>{subtitle}</div>
            <CardTags tags={tags} />
            <div className='card-description'>{description}</div>
            <CardButton title={btnTitle} link={btnLink} />
        </div>
    );
}

export default Card;