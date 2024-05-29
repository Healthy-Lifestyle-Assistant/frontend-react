import React from 'react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Navbar from '../../shared/components/Navbar';
import Form from '../../shared/components/Form';

function Components() {
    return (
        <div className='body-custom'>
            <Navbar />
            <br />
            <Button title={'Title'} link={'/link'} />
            <br />
            <div style={{display: 'flex'}}>
            <Card
                title='Card title'
                subtitle='Subtitle'
                tags={['tag1', 'tag2', 'tag3']}
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                btnTitle='Button'
                btnLink='/link'
            />
            <Form />
            </div>

        </div>
    );
}

export default Components;
