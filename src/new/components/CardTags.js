import React from 'react';

function CardTags({ tags }) {
    return (
        <>
            {tags.map(tag => (
                <span className="card-tags" key={tag}>
                    <small className="card-tag">{tag.toLowerCase()}</small>&nbsp;
                </span>
            ))}
        </>
    );
}

export default CardTags;