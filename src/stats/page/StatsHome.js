import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const StatsHome = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Internal component logic to change the state
		// dispatch({ type: 'LOGGED_IN' });

		// Cleanup function if needed
		return () => {
			// Additional cleanup logic if needed
		};
	}, [dispatch]);

	return (
		<div>
			<h2>StatsHome</h2>
			<p>Welcome to the StatsHome page!</p>
		</div>
	);
};

export default StatsHome;