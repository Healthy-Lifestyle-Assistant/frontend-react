import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomNavbar = ({ isLoggedIn }) => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary" fixed="top">
			<Container>
				<Navbar.Brand as={Link} to="/">Healthy Life</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/workout">Workout</Nav.Link>
						<Nav.Link as={Link} to="/nutrition">Nutrition</Nav.Link>
						<Nav.Link as={Link} to="/meditation">Meditation</Nav.Link>
						<Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
						<Nav.Link as={Link} to="/stats">Stats</Nav.Link>
					</Nav>
					<Form className="d-flex">
						{isLoggedIn ? <>
							<Button variant="outline-success" className='me-2'>Settings</Button>
							<Button variant="outline-success">Logout</Button>
						</> : <>
							<Button variant="outline-success" className='me-2'>Login</Button>
							<Link to="/signup">
								<Button type="submit" variant="outline-success">
									Signup
								</Button>
							</Link>
						</>}
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
	};
};

export default connect(mapStateToProps)(CustomNavbar);
