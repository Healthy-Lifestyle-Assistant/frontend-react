import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardSubtitle from 'react-bootstrap/CardSubtitle';
import { CardText } from 'react-bootstrap';
import { truncateStringWithWordBoundary } from '../../shared/services/util';

function Workout({ id, title, description, isCustom, needsEquipment, bodyParts }) {
    return (
        <Card style={{ width: '18rem', minWidth: '18rem', padding: 6, margin: 6, borderWidth: 1, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title className='work-sans-font'>{truncateStringWithWordBoundary(title, 25)}</Card.Title>
                <CardSubtitle style={{ marginBottom: 10 }}>{isCustom ? 'Custom' : 'In-App'}, {needsEquipment ? 'With equipment' : 'Without equipment'}</CardSubtitle>
                <Card.Text style={{ height: 120 }} className='merriweather-sans-font'>{truncateStringWithWordBoundary(description, 120)}</Card.Text>
                <CardText style={{ height: 60 }} >
                    {bodyParts.map(bodyPart => (
                        <span className="body-part-tags" key={bodyPart.id}>
                            <small className="body-part-tag">{bodyPart.name.toLowerCase()}</small>&nbsp;
                        </span>
                    ))}
                </CardText>
                <Link to={`/workouts/default/${id}`}>
                    <Button variant="primary">Detail</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Workout;