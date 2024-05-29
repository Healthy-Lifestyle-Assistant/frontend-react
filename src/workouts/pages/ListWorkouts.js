import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/ListWorkouts.scss';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { validateToken, getToken } from '../../shared/services/auth.js'
import { getCustomWorkouts, getDefaultWorkouts } from '../services/requests.js';
// import AlertComponent from '../../shared/components/AlertComponent.js';
import Card from '../../shared/components/Card.js';
import Links from '../components/Links.js';
import AlertComponent from '../../shared/components/AlertComponent.js';
import { DropDownComponent } from '../components/DropDownComponent.js';
import { sortByOrders, sortByTitles } from '../constants/sortBy.js';
import { updateSearchParams } from '../utils/updateSearchParams.js';
import { FormInput } from '../components/FormInput.js';
import { FormCheck } from '../components/FormCheck.js';

const ListWorkouts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultWorkouts, setDefaultWorkouts] = useState([]);
	const [customWorkouts, setCustomWorkouts] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();
	const title = searchParams.get('title') || '';
	const description = searchParams.get('description') || '';
	const sort = searchParams.get('sort') || 'title';
	const order = searchParams.get('order') || 'asc';
	const perPage = searchParams.get('perPage') || '5';

	const [titleQuery, setTitleQuery] = useState(title);
	const [descriptionQuery, setDescriptionQuery] = useState(description);
	const [showFilters, setShowFilters] = useState(false);
	const [withEquipment, setWithEquipment] = useState(false);
	const [withoutEquipment, setWithoutEquipment] = useState(false);

	const sortTitles = ['title', 'description'];
	const sortOrders = ['asc', 'desc'];
	const arrayOfItems = ['5', '10', '15'];


	const visibleWorkouts = useMemo(() => {
		let newWorkouts = [...defaultWorkouts];

		if (sort) {
			newWorkouts.sort((acc, curr) => acc[sort].localeCompare(curr[sort]));
		}

		if (title) {
			newWorkouts = newWorkouts.filter((workout) => (
				workout.title.toLowerCase().trim().includes(title.toLowerCase().trim())
			));
		}
		if (description) {
			newWorkouts = newWorkouts.filter((workout) => (
				workout.description.toLowerCase().trim().includes(description.toLowerCase().trim())
			));
		}

		if (order === 'desc') {
			newWorkouts.reverse();
		}

		return newWorkouts;
	}, [defaultWorkouts, description, order, sort, title]);

	const onSortChange = (sort) => {
	  updateSearchParams(searchParams, setSearchParams, { sort });
	};

	const onOrderChange = (order) => {
    updateSearchParams(searchParams, setSearchParams, { order });
	};
	
	const onPerPageChange = (perPage) => {
    updateSearchParams(searchParams, setSearchParams, { perPage });
	};

	const debounce = (callback, delay) => {
    let timerId;

    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(callback, delay, ...args);
    };
  };

  const onTitleChange = useCallback(debounce((title) => {
    updateSearchParams(
      searchParams,
      setSearchParams,
      { title: title.trim().toLowerCase() || null }
    )
  }, 1000), [searchParams, setSearchParams]);

	const onDescriptionChange = useCallback(debounce((description) => {
    updateSearchParams(
      searchParams,
      setSearchParams,
      { description: description.trim().toLowerCase() || null }
    )
  }, 1000), [searchParams, setSearchParams]);

	const updateTitleQuery = (value) => {
    setTitleQuery(value);
		onTitleChange(value);
	};
	const updateDescriptionQuery = (value) => {
		setDescriptionQuery(value);
		onDescriptionChange(value);
	};

	const toggleFilters = () => {
	  setShowFilters(prev => !prev);
	};

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

	const checkboxsList = [
		{ id: 'withEquipment', label: 'with equipment', onChange: () => setWithEquipment(!withEquipment) },
		{ id: 'withoutEquipment', label: 'without equipment', onChange: () => () => setWithoutEquipment(!withoutEquipment) }
	];

	const inputsList = [
		{ placeholder: 'Filter by title', value: titleQuery, onChange: updateTitleQuery },
		{ placeholder: 'Filter by description', value: descriptionQuery, onChange: updateDescriptionQuery }
	];

	const dropDownList = [
		{ defaultTitle: 'Sort By', searchParam: sort, variables: sortTitles, names: sortByTitles, defaultValue: 0, onChange: onSortChange },
		{ defaultTitle: 'Direction', searchParam: order, variables: sortOrders, names: sortByOrders, defaultValue: 0, onChange: onOrderChange },
		{ defaultTitle: 'Page Size', searchParam: perPage, variables: arrayOfItems, defaultValue: 0, onChange: onPerPageChange }
	];
	

	return (
		<div className="ListWorkouts">
			<HelmetProvider>
				<Helmet>
					<title>Workouts</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<div>
				<AlertComponent message={message} messageType={messageType} />

				<p>Workouts / Exercises / Reminders / Media</p>

				<Button variant="outline-secondary">New Workout</Button>

				<div>
				  <Button style={{ marginBlock: 20 }} variant="secondary" onClick={toggleFilters}>
					  {showFilters ? 'Hide Filter' : 'Filter'}
				  </Button>

				  {showFilters && (
					  <Form className="ListWorkouts_form">
							<Form.Group className="ListWorkouts_checkboxs">
								{checkboxsList.map(({ id, label, onChange }) => (
									<FormCheck key={id} id={id} label={label} onChange={onChange} />
								))}
							</Form.Group>
              <Form.Group className="ListWorkouts_inputs">
								{inputsList.map(({ placeholder, value, onChange }) => (
									<FormInput key={placeholder} placeholder={placeholder} value={value} onChange={onChange} />
								))}
							</Form.Group>
							<Form.Group className="ListWorkouts_dropDown">
								{dropDownList.map(({ defaultTitle, searchParam, variables, names, defaultValue, onChange }) => (
								  <DropDownComponent
									  key={defaultTitle}
								    defaultTitle={defaultTitle}
								    searchParam={searchParam}
									  variables={variables}
									  names={names}
									  defaultValue={defaultValue}
									  onChange={onChange}
								  />
								))}
							</Form.Group>
					  </Form>
				  )}
				</div>
				<p>{visibleWorkouts.length} found</p>
				{visibleWorkouts.map(item => (
					<Card
						key={item.id}
						id={item.id}
						title={item.title}
						description={item.description}
						isCustom={item.isCustom} />
					))
				}
			</div>
		</div>
	);
};

export default ListWorkouts;