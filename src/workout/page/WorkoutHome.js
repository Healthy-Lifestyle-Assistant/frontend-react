import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getToken } from '../../shared/js/auth.js'
import { getAndValidateToken } from '../../shared/js/auth.js'
import { DEFAULT_WORKOUTS, CUSTOM_WORKOUTS } from '../../shared/URL.js';
import CustomAlert from '../../shared/component/CustomAlert.js';

const WorkoutHome = () => {
	const hasFetchedData = useRef(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultWorkouts, setDefaultWorkouts] = useState(null);
	const [customWorkouts, setCustomWorkouts] = useState(null);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	useEffect(() => {
		if (!hasFetchedData.current) {
			fetchData();
			hasFetchedData.current = true;
		}
	}, []);

	const fetchData = async () => {
		try {
			const token = await getAndValidateToken();
			const defaultWorkoutsResponse = await getDefaultWorkouts();
			// >>
			console.log(defaultWorkoutsResponse);
			if (defaultWorkoutsResponse.status === 200) {
				setDefaultWorkouts(defaultWorkoutsResponse.body);
			} else {
				setMessageType("WARNING");
				setMessage(`An error occurred (${defaultWorkoutsResponse.body.message} ${defaultWorkoutsResponse.status})`);
			}

			if (!token) {
				dispatch({ type: 'LOGGED_OUT' });
				setMessageType("SECONDARY");
				setMessage("You are unlogged");
			} else {
				dispatch({ type: 'LOGGED_IN' });
				try {
					const customWorkoutsResponse = await getCustomWorkouts(token);

					if (customWorkoutsResponse.status === 200) {
						setCustomWorkouts(customWorkoutsResponse.body);

						if (Array.isArray(customWorkoutsResponse.body) && customWorkoutsResponse.body.length === 0) {
							setMessageType("SECONDARY");
							setMessage("No Custom Media Found");
						}
					} else if (customWorkoutsResponse.status === 401) {
						// navigate("/login");
					} else {
						setMessageType("WARNING");
						setMessage(`An error occurred (${customWorkoutsResponse.body.message} ${customWorkoutsResponse.status})`);
					}
				} catch (error) {
					setMessageType("WARNING");
					setMessage(`An error occurred (${error})`);
				}
			}
		} catch (error) {
			setMessageType("WARNING");
			setMessage(`An error occurred (${error})`);
		}
	};

	const getDefaultWorkouts = async () => {
		const res = await fetch(DEFAULT_WORKOUTS, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		return {
			status: res.status,
			body: data,
		};
	};

	const getCustomWorkouts = async (token) => {
		const res = await fetch(CUSTOM_WORKOUTS, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();

		return {
			status: res.status,
			body: data,
		};
	};

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Workouts</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<div>
				<h2>WorkoutHome</h2>
				<p>Welcome to the WorkoutHome page!</p>
				<CustomAlert message={message} messageType={messageType} />
			</div>
		</>
	);
};

export default WorkoutHome;