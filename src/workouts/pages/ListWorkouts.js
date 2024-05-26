import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { validateToken, getToken } from '../../shared/services/auth.js'
import { getCustomWorkouts, getDefaultWorkouts } from '../services/requests.js';
import AlertComponent from '../../shared/components/AlertComponent.js';
// import WorkoutComponent from '../components/WorkoutComponent.js'
import Card from '../../shared/components/Card.js';

const ListWorkouts = () => {
	// const isTokenValid = useRef(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultWorkouts, setDefaultWorkouts] = useState([]);
	const [customWorkouts, setCustomWorkouts] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await validateToken();
				console.log("data", data);
				if (data.status === 200) {
					dispatch({ type: 'LOGGED_IN' });
					dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1] } });
					console.log(1);
					const token = getToken();
					const customWorkouts = await getCustomWorkouts(token);
					setDefaultWorkouts(customWorkouts.body.content);
				} else {
					console.log(3);
					dispatch({ type: 'LOGGED_OUT' });
					dispatch({ type: 'CLEAR_USER_DATA' });
					setMessageType("SECONDARY");
					setMessage("You are unlogged");
					const defaultWorkouts = await getDefaultWorkouts();
					setDefaultWorkouts(defaultWorkouts.body.content);
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};

		fetchData();
	}, []);


	// useEffect(() => {
	// 	const fetchToken = async () => {
	// 		const data = await validateToken();
	// 		console.log("data", data);
	// 		if (data.status === 200) {
	// 			isTokenValid.current = true;
	// 			dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1]} });
	// 			console.log(1, isTokenValid.current);
	// 		} else {
	// 			isTokenValid.current = false;
	// 		}
	// 	};
	// 	fetchToken();

	// 	if (isTokenValid.current) {
	// 		dispatch({ type: 'LOGGED_IN' });
	// 		// dispatch({ type: 'SET_USER_DATA', payload: { fullName: "Test full name" } });
	// 		console.log(2);
	// 		const fetchDefaultWorkouts = async () => {
	// 			try {
	// 				const token = getToken();
	// 				const data = await getCustomWorkouts(token);
	// 				setDefaultWorkouts(data.body.content);
	// 			} catch (error) {
	// 				setMessageType("WARNING");
	// 				setMessage(error.message);
	// 			}
	// 		};
	// 		fetchDefaultWorkouts();
	// 	} else {
	// 		console.log(3, isTokenValid.current);
	// 		dispatch({ type: 'LOGGED_OUT' });
	// 		dispatch({ type: 'CLEAR_USER_DATA' });
	// 		setMessageType("SECONDARY");
	// 		setMessage("You are unlogged");

	// 		const fetchCustomWorkouts = async () => {
	// 			try {
	// 				const data = await getDefaultWorkouts();
	// 				setDefaultWorkouts(data.body.content);
	// 			} catch (error) {
	// 				setMessageType("WARNING");
	// 				setMessage(error.message);
	// 			}
	// 		};
	// 		fetchCustomWorkouts();
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (isTokenValid.current) {
	// 		dispatch({ type: 'LOGGED_IN' });
	// 		dispatch({ type: 'SET_USER_DATA', payload: { fullName: "Test full name" } });
	// 		console.log(2);
	// 		const fetchDefaultWorkouts = async () => {
	// 			try {
	// 				const token = getToken();
	// 				const data = await getCustomWorkouts(token);
	// 				setDefaultWorkouts(data.body.content);
	// 			} catch (error) {
	// 				setMessageType("WARNING");
	// 				setMessage(error.message);
	// 			}
	// 		};
	// 		fetchDefaultWorkouts();
	// 	} else {
	// 		console.log(3, isTokenValid.current);
	// 		dispatch({ type: 'LOGGED_OUT' });
	// 		dispatch({ type: 'CLEAR_USER_DATA' });
	// 		setMessageType("SECONDARY");
	// 		setMessage("You are unlogged");

	// 		const fetchCustomWorkouts = async () => {
	// 			try {
	// 				const data = await getDefaultWorkouts();
	// 				setDefaultWorkouts(data.body.content);
	// 			} catch (error) {
	// 				setMessageType("WARNING");
	// 				setMessage(error.message);
	// 			}
	// 		};
	// 		fetchCustomWorkouts();
	// 	}
	// }, []);

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Workouts</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<div>

			<AlertComponent message={message} messageType={messageType} />

			<div className='d-flex flex-wrap justify-content-left'>
				{defaultWorkouts.map(item => (
					// <WorkoutComponent
					// 	key={item.id}
					// 	id={item.id}
					// 	title={item.title}
					// 	description={item.description}
					// 	isCustom={item.isCustom} 
					// 	needsEquipment={item.needsEquipment}
					// 	bodyParts={item.bodyParts}
					// 	/>
					<Card
						key={item.id}
						title={item.title}
						subtitle={`${item.isCustom ? 'Custom' : 'In-app'}` + ' | ' + `${item.needsEquipment ? 'With equipment' : 'Without equipment'}`}
						tags={item.bodyParts}
						description={item.description}
						btnTitle={'Detail'}
						btnLink={`/workouts/default/${item.id}`}
					/>
				))
				}
			</div>
		</div>
		
		</>
	);
};

export default ListWorkouts;