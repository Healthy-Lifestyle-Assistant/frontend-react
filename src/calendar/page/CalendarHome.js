import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CalendarHome = () => {
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
			<h2>CalendarHome</h2>
			<p>Welcome to the CalendarHome page!</p>
		</div>
	);
};

export default CalendarHome;