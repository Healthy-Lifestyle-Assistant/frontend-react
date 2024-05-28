import React from 'react';
import { Link } from 'react-router-dom';
import '../style/links-panel.css';

function Links({ active }) {
    return (
        <div className='links-panel'>
            <Link className={(active === 'workouts' ? ' links-panel-active' : '')}
                to={'/workouts'} >Workouts</Link><span style={{ color: 'grey' }}> &gt; </span>

            <Link className={(active === 'exercises' ? ' links-panel-active' : '')}
                to={'/workouts-exercises'}>Exercises</Link><span style={{ color: 'grey' }}> &gt; </span>

            <Link className={(active === 'media' ? ' links-panel-active' : '')}
                to={'/workouts-media'}>Media</Link><span style={{ color: 'grey' }}> &gt; </span>

            <Link className={(active === 'reminders' ? ' links-panel-active' : '')}
                to={'/workouts-reminders'}>Reminders</Link>
        </div>
    );
}

export default Links;