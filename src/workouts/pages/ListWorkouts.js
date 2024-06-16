import { useEffect, useState } from 'react';
import '../styles/blocks/ListWorkouts.scss';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DropDownComponent } from '../components/DropDownComponent.js';
import { FormInput } from '../components/FormInput.js';
import { FormCheck } from '../components/FormCheck.js';
import { Pagination } from '../components/Pagination.js';
import { DefaultButton } from '../components/DefaultButton.js';
import { OutlinedButton } from '../components/OutlinedButton.js';
import { getCustomWorkouts, getDefaultWorkouts } from '../services/requests.js';
import { sortByFields, sortByDirections } from '../constants/sortBy.js';
import { validateToken, getToken } from '../../shared/services/auth.js'
import Alert from '../../shared/components/Alert.js';
import Card from '../../shared/components/Card.js';
import { updateSearchParams } from '../utils/updateSearchParams.js';
import dumbbellIcon from '../assets/icons/dumbbell.png';
import dumbbellBlackIcon from '../assets/icons/dumbbellBlackIcon.png';
import humanIcon from '../assets/icons/human.png';
import humanBlackIcon from '../assets/icons/humanBlackIcon.png';
import filterIcon from '../assets/icons/filterIcon.png';

const ListWorkouts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultWorkouts, setDefaultWorkouts] = useState([]);
	const [customWorkouts, setCustomWorkouts] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	const { pathname } = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const title = searchParams.get('title') || '';
	const description = searchParams.get('description') || '';
	const sortField = searchParams.get('sortField') || 'title';
	const sortDirection = searchParams.get('sortDirection') || 'asc';
	const pageNumber = searchParams.get('pageNumber') || '1';
	const pageSize = searchParams.get('pageSize') || '5';
	const equipment = searchParams.get('needsEquipment') ?? undefined;

	const [showFilters, setShowFilters] = useState(false);
	const [totalItems, setTotalItems] = useState('0');

	const [filterParams, setFilterParams] = useState({
		pageSizeTemp: pageSize,
		sortFieldTemp: sortField,
		sortDirectionTemp: sortDirection,
		titleTemp: title,
		descriptionTemp: description,
		equipmentTemp: equipment,
	});
	const { pageSizeTemp, sortFieldTemp, sortDirectionTemp, titleTemp, descriptionTemp, equipmentTemp } = filterParams;

	const sortFields = ['title', 'description'];
	const sortDirections = ['asc', 'desc'];
	const arrayOfItems = ['5', '10', '15'];

	const updateFilterSearchParams = (params) => {
    updateSearchParams(searchParams, setSearchParams, { ...params });
	};

	const updateFilterParams = (param) => {
    setFilterParams(prev => ({ ...prev, ...param }));
	};

	const toggleFilters = () => {
		setShowFilters(prev => !prev);
	};

	const clearFilterChanges = () => {
		updateFilterParams({
			pageSizeTemp: '5',
			sortFieldTemp: 'title',
			sortDirectionTemp: 'asc',
			titleTemp: '',
			descriptionTemp: '',
			equipmentTemp: undefined,
		});
	};

	const applyFilterChanges = () => {
		updateFilterSearchParams({
			pageSize: pageSizeTemp,
			sortField: sortFieldTemp,
			sortDirection: sortDirectionTemp,
			title: titleTemp.toLowerCase() || null,
			description: descriptionTemp.toLowerCase() || null,
			equipment: equipmentTemp !== undefined ? equipmentTemp : null,
		});
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
					const defaultWorkouts = await getDefaultWorkouts(
						pageNumber - 1, 
						pageSize, 
						sortField, 
						sortDirection, 
						title, 
						description, 
						equipment,
					);
					setDefaultWorkouts(defaultWorkouts.body.content);
					setTotalItems(defaultWorkouts.body.totalElements);
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};

		fetchData();
	}, [pageNumber, pageSize, sortField, sortDirection, title, description, equipment, dispatch]);

	const checkboxsList = [
		{ id: 'withEquipment', icon: equipmentTemp ? dumbbellIcon : dumbbellBlackIcon, checked: equipmentTemp, label: 'with equipment', onChange: () => updateFilterParams({ equipmentTemp: equipmentTemp ? undefined : true }) },
		{ id: 'withoutEquipment', icon: equipmentTemp === false ? humanIcon : humanBlackIcon, checked: equipmentTemp === false, label: 'without equipment', onChange: () => updateFilterParams({ equipmentTemp: equipmentTemp === false ? undefined : false }) }
	];

	const inputsList = [
		{ placeholder: 'Filter by title', value: titleTemp, onChange: (value) => updateFilterParams({ titleTemp: value }) },
		{ placeholder: 'Filter by description', value: descriptionTemp, onChange: (value) => updateFilterParams({ descriptionTemp: value }) }
	];

	const dropDownList = [
		{ defaultTitle: 'Sort By', searchParam: sortFieldTemp, variables: sortFields, names: sortByFields, defaultValue: 0, onChange: (value) => updateFilterParams({ sortFieldTemp: value }) },
		{ defaultTitle: 'Direction', searchParam: sortDirectionTemp, variables: sortDirections, names: sortByDirections, defaultValue: 0, onChange: (value) => updateFilterParams({ sortDirectionTemp: value }) },
		{ defaultTitle: 'Page Size', searchParam: pageSizeTemp, variables: arrayOfItems, defaultValue: 0, onChange: (value) => updateFilterParams({ pageSizeTemp: value }) }
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
				<Alert message={message} messageType={messageType} />

				<Button variant="outline-secondary">New Workout</Button>

				<div>
					<DefaultButton 
					  title={showFilters ? 'Hide Filter' : 'Filter'}
						icon={filterIcon}
						style={{ marginBlock: 20 }} 
						onClick={toggleFilters}
					/>

					{showFilters && (
						<Form className="ListWorkouts_form">
							<Form.Group className="ListWorkouts_checkboxs">
								{checkboxsList.map(({ id, icon, checked, label, onChange }) => (
									<FormCheck key={id} icon={icon} checked={checked} label={label} onChange={onChange} />
								))}
							</Form.Group>
							<div className="ListWorkouts_container">
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
							</div>
							<div className="ListWorkouts_buttons">
							  <OutlinedButton title="Clear" onClick={clearFilterChanges} />
								<DefaultButton title="Apply" onClick={applyFilterChanges} />
							</div>
						</Form>
					)}
				</div>

				<p>{defaultWorkouts.length} found</p>

				{defaultWorkouts && defaultWorkouts.length > 0 && (
					<div className='d-flex flex-wrap justify-content-left'>
						{defaultWorkouts.map(item => {
							const subtitle = `${item.isCustom ? 'Custom' : 'In-app'} | ${item.needsEquipment ? 'With equipment' : 'Without equipment'}`;
							return (
								<Card
									key={item.id}
									title={item.title}
									subtitle={subtitle}
									tags={item.bodyParts}
									description={item.description}
									btnTitle={'Detail'}
									btnLink={{ pathname: `${pathname}/default/${item.id}` }}
								/>
							);
						})
						}
					</div>
				)}
				{defaultWorkouts.length > 0 && <Pagination quantity={totalItems} />}
			</div>
		</div>
	);
};

export default ListWorkouts;