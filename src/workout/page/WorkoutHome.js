import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const WorkoutHome = () => {
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
			<h2>WorkoutHome</h2>
			<p>Welcome to the WorkoutHome page!</p>
		</div>
	);
};

export default WorkoutHome;