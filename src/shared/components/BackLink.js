import React from 'react';
import { Link } from 'react-router-dom';

import '../style/back-link.css';

function BackLink({ previousUrl, currentUrl }) {

    return (<Link className={`back-link ${(previousUrl === currentUrl) || previousUrl === '/' ? 'back-link-disabled' : ''}`}
        to={(previousUrl === currentUrl) || previousUrl === '/' ? null : previousUrl}>&lt; Back</Link>);
}

export default BackLink;