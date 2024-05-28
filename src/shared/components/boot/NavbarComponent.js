import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NavbarComponent = ({ isLoggedIn, userData }) => {
	return (
		<Navbar expand="lg" className="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}} fixed="top">
			<Container>
				<Navbar.Brand as={Link} to="/">Healthy Life</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
						<Nav.Link as={Link} to="/nutrition">Nutrition</Nav.Link>
						<Nav.Link as={Link} to="/mental-health">Mental Health</Nav.Link>
						<Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
						<Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
					</Nav>
					<Form className="d-flex">

						{isLoggedIn ? <>
							{userData && userData.body ? <div>Hello, {userData.body.fullName}!</div> : <div>No user data</div>}

							<Button variant="outline-primary" className='me-2'>Settings</Button>
							<Link to="/logout">
								<Button type="submit" variant="outline-primary">
									Logout
								</Button>
							</Link>
						</> : <>
							<Link to="/login">
								<Button type="submit" variant="outline-primary" className='me-2'>
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button type="submit" variant="outline-primary">
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
		userData: state.userData,
	};
};

export default connect(mapStateToProps)(NavbarComponent);
