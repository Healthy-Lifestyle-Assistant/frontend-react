import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const StatisticsHome = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: 'LOGGED_OUT' });
		dispatch({ type: 'CLEAR_USER_DATA' });

		return () => {
		};
	}, []);

	return (
		<div>
			<h2>StatisticsHome</h2>
			<p>Welcome to the StatsHome page!</p>
		</div>
	);
};

export default StatisticsHome;