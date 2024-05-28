import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { validateToken, getToken } from '../../shared/services/auth.js'
import { getCustomWorkouts, getDefaultWorkouts } from '../services/requests.js';
// import AlertComponent from '../../shared/components/AlertComponent.js';
import Card from '../../shared/components/Card.js';
import Links from '../components/Links.js';

const ListWorkouts = () => {
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
				if (data.status === 200) {
					dispatch({ type: 'LOGGED_IN' });
					dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1] } });
					const token = getToken();
					const customWorkouts = await getCustomWorkouts(token);
					setCustomWorkouts(customWorkouts.body.content);
				} else {
					dispatch({ type: 'LOGGED_OUT' });
					dispatch({ type: 'CLEAR_USER_DATA' });
					// setMessageType("SECONDARY");
					// setMessage("You are unlogged");
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

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Workouts</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<div>
				<Links active='workouts' />
				{/* <AlertComponent message={message} messageType={messageType} /> */}
				<div className='d-flex flex-wrap justify-content-left'>
					{defaultWorkouts.map(item => (
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