import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const Contact = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Internal component logic to change the state
		dispatch({ type: 'LOGGED_OUT' });

		// Cleanup function if needed
		return () => {
			// Additional cleanup logic if needed
		};
	}, [dispatch]);

	return (
		<div>
			<h2>Contact</h2>
			<p>Welcome to the contact page!</p>
		</div>
	);
};

export default Contact;
