import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const NutritionHome = () => {
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
			<h2>NutritionHome</h2>
			<p>Welcome to the NutritionHome page!</p>
		</div>
	);
};

export default NutritionHome;