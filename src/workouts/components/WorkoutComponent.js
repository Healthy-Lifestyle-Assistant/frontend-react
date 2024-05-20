import React from 'react';

function Workout({ id, title, description, isCustom }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>ID: {id}</p>
            <p>Description: {description}</p>
            {isCustom && <p>This is a custom workout.</p>}
        </div>
    );
}

export default Workout;
