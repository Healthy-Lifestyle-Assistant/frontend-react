import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

function Components() {
    return (
        <>
            <Navbar />
            <Button title={'Title'} link={'/link'} />
            <br /><br />
            <Card
                title='Card title'
                subtitle='Subtitle'
                tags={['tag1', 'tag2', 'tag3']}
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                btnTitle='Button'
                btnLink='/link'
            />
        </>
    );
}

export default Components;
