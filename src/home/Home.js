import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Internal component logic to change the state
		dispatch({ type: 'LOGGED_IN' });

		// Cleanup function if needed
		return () => {
			// Additional cleanup logic if needed
		};
	}, [dispatch]);

	return (
		<div>
			<h2>Home</h2>
			<p>Welcome to the home page!</p>
		</div>
	);
};

export default Home;
