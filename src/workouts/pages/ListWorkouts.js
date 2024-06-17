import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { validateToken, getToken } from '../../shared/services/auth.js'
import { buildUrlExercisesFilter } from '../../shared/services/util.js';
import { getCustomWorkouts, getDefaultWorkouts, getBodyParts } from '../services/requests.js';

import Card from '../../shared/components/Card.js';
import Links from '../../shared/components/Links.js';
import Pagination from '../../shared/components/Pagination.js';
import ExercisesFilter from '../components/ExercisesFilter.js';

const ListWorkouts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [defaultWorkouts, setDefaultWorkouts] = useState([]);
	const [customWorkouts, setCustomWorkouts] = useState([]);
	const [bodyParts, setBodyParts] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const { pathname } = useLocation();

	const [filterParams, setFilterParams] = useState({
	  pageSize: '',
	  sortField: '',
	  sortDirection: '',
	  isDefault: false,
	  isCustom: false,
	  bodyPartsIds: [],
	  title: '',
	  description: '',
	  equipment: undefined,
		currentPageZeroBased: 0,
	});

	const { pageSize, sortField, sortDirection, isDefault, isCustom, bodyPartsIds, title, description, equipment, currentPageZeroBased } = filterParams;

	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(0);

	const handlePageChange = (currentPageZeroBased) => {
		setFilterParams(prev => ({ ...prev, currentPageZeroBased }));
  }

	const handleApplyChanges = (newFilterParams) => {
    setFilterParams(newFilterParams);
	};

	useEffect(() => {
		const fetchData = async () => {
			const urlPostfix = buildUrlExercisesFilter(
				title,
				description,
				isCustom,
				isDefault,
				bodyPartsIds,
				sortField,
				sortDirection,
				pageSize,
				currentPageZeroBased,
			  equipment,
			);
			try {
				const data = await validateToken();
				if (data.status === 200) {
					dispatch({ type: 'LOGGED_IN' });
					dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1] } });
					const token = getToken();
					const customWorkouts = await getCustomWorkouts(token, urlPostfix);
					setCustomWorkouts(customWorkouts.body.content);
					setTotalPages(customWorkouts.body.totalPages);
					if (bodyParts.length === 0) {
						const bodyPartsResponse = await getBodyParts();
						setBodyParts(bodyPartsResponse.body);
				}
				} else {
					dispatch({ type: 'LOGGED_OUT' });
					dispatch({ type: 'CLEAR_USER_DATA' });
					const defaultWorkouts = await getDefaultWorkouts(urlPostfix);
					setDefaultWorkouts(defaultWorkouts.body.content);
					setTotalPages(defaultWorkouts.body.totalPages);
          setTotalElements(defaultWorkouts.body.totalElements);
          if (bodyParts.length === 0) {
              const bodyPartsResponse = await getBodyParts();
              setBodyParts(bodyPartsResponse.body);
          }
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};

		dispatch({ type: 'SET_CURRENT_URL', payload: { currentUrl: location.pathname } });
		fetchData();
	}, [dispatch, bodyPartsIds, description, isCustom, isDefault, pageSize, sortDirection, sortField, title, pathname, equipment, location.pathname, bodyParts.length, currentPageZeroBased]);

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

				<ExercisesFilter onFilterChange={handleApplyChanges} bodyParts={bodyParts} />

				<div>Found {totalElements}</div>

				{defaultWorkouts && defaultWorkouts.length > 0 && (
					<div className='d-flex flex-wrap justify-content-left'>
						{defaultWorkouts.map(item => (
							<Card
								key={item.id}
								title={item.title}
								subtitle={`${item.isCustom ? 'Custom' : 'In-app'}` + ' | ' + `${item.needsEquipment ? 'With equipment' : 'Without equipment'}`}
								tags={item.bodyParts}
								description={item.description}
								btnTitle={'Detail'}
								btnLink={item.isCustom ? `/workouts/custom/${item.id}` : `/workouts/default/${item.id}`}
							/>
						))
						}
					</div>
				)}

				{customWorkouts && customWorkouts.length > 0 && (
					<div className='d-flex flex-wrap justify-content-left'>
						{customWorkouts.map(item => (
							<Card
								key={item.id}
								title={item.title}
								subtitle={`${item.isCustom ? 'Custom' : 'In-app'}` + ' | ' + `${item.needsEquipment ? 'With equipment' : 'Without equipment'}`}
								tags={item.bodyParts}
								description={item.description}
								btnTitle={'Detail'}
								btnLink={item.isCustom ? `/workouts/custom/${item.id}` : `/workouts/default/${item.id}`}
							/>
						))
						}
					</div>
				)}

        <Pagination
				  currentPageZeroBased={currentPageZeroBased}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
};

export default ListWorkouts;