import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ isLoggedIn }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
			<p>{isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn,
	};
};

export default connect(mapStateToProps)(Navbar);
