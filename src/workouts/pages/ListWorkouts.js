import { useEffect, useState } from 'react';
import '../styles/ListWorkouts.scss';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { DropDownComponent } from '../components/DropDownComponent.js';
import { FormInput } from '../components/FormInput.js';
import { FormCheck } from '../components/FormCheck.js';
import { LinkLine } from '../components/LinkLine.js';
import { Pagination } from '../components/Pagination.js';
import { getCustomWorkouts, getDefaultWorkouts } from '../services/requests.js';
import { sortByFields, sortByDirections } from '../constants/sortBy.js';
import { validateToken, getToken } from '../../shared/services/auth.js'
import Alert from '../../shared/components/Alert.js';
import Card from '../../shared/components/Card.js';
import { updateSearchParams } from '../utils/updateSearchParams.js';

const ListWorkouts = ({ category }) => {
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

	const [showFilters, setShowFilters] = useState(false);
	const [withEquipment, setWithEquipment] = useState(false);
	const [withoutEquipment, setWithoutEquipment] = useState(false);

	const [pageSizeTemp, setPageSizeTemp] = useState(pageSize);
	const [sortFieldTemp, setSortFieldTemp] = useState(sortField);
	const [sortDirectionTemp, setSortDirectionTemp] = useState(sortDirection);
	const [titleTemp, setTitleTemp] = useState(title);
	const [descriptionTemp, setDescriptionTemp] = useState(description);
	const [totalItems, setTotalItems] = useState('0');

	const sortFields = ['title', 'description'];
	const sortDirections = ['asc', 'desc'];
	const arrayOfItems = ['5', '10', '15'];

	const isPageSize = pageSize !== pageSizeTemp;
	const isSortField = sortField !== sortFieldTemp;
	const isSortDirection = sortDirection !== sortDirectionTemp;
	const isTitle = title !== titleTemp;
	const isDescription = description !== descriptionTemp;


	const onSortFieldChange = (sortField) => {
		updateSearchParams(searchParams, setSearchParams, { sortField });
	};

	const onSortDirectionChange = (sortDirection) => {
		updateSearchParams(searchParams, setSearchParams, { sortDirection });
	};

	const onPageSizeChange = (pageSize) => {
		updateSearchParams(searchParams, setSearchParams, { pageSize });
	};

	const onTitleChange = (title) => {
    updateSearchParams(searchParams, setSearchParams, { title });
	};

	const onDescriptionChange = (description) => {
    updateSearchParams(searchParams, setSearchParams, { description });
	};

	const updateSortField = (sort) => {
    setSortFieldTemp(sort);
	};
	const updateSortDescription = (sort) => {
		setSortDirectionTemp(sort);
	}
	const updatePageSize = (pageSize) => {
    setPageSizeTemp(pageSize);
	};

	const updateTitle = (value) => {
		setTitleTemp(value);
	};
	const updateDescription = (value) => {
		setDescriptionTemp(value);
	};

	const toggleFilters = () => {
		setShowFilters(prev => !prev);
	};

	const clearFilterChanges = () => {
		setPageSizeTemp('5');
		setSortFieldTemp('title');
		setSortDirectionTemp('asc');
		setTitleTemp('');
		setDescriptionTemp('');
	};

	const applyFilterChanges = () => {
    if (isPageSize) onPageSizeChange(pageSizeTemp);
		if (isSortField) onSortFieldChange(sortFieldTemp);
		if (isSortDirection) onSortDirectionChange(sortDirectionTemp);
		if (isTitle) onTitleChange(titleTemp);
		if (isDescription) onDescriptionChange(descriptionTemp);
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
					const defaultWorkouts = await getDefaultWorkouts(pageNumber - 1, pageSize, sortField, sortDirection, title, description);
					setDefaultWorkouts(defaultWorkouts.body.content);
					setTotalItems(defaultWorkouts.body.totalElements);
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};

		fetchData();
	}, [pageNumber, pageSize, sortField, sortDirection, title, description, dispatch]);

	const checkboxsList = [
		{ id: 'withEquipment', label: 'with equipment', onChange: () => setWithEquipment(!withEquipment) },
		{ id: 'withoutEquipment', label: 'without equipment', onChange: () => () => setWithoutEquipment(!withoutEquipment) }
	];

	const inputsList = [
		{ placeholder: 'Filter by title', value: titleTemp, onChange: updateTitle },
		{ placeholder: 'Filter by description', value: descriptionTemp, onChange: updateDescription }
	];

	const dropDownList = [
		{ defaultTitle: 'Sort By', searchParam: sortFieldTemp, variables: sortFields, names: sortByFields, defaultValue: 0, onChange: updateSortField },
		{ defaultTitle: 'Direction', searchParam: sortDirectionTemp, variables: sortDirections, names: sortByDirections, defaultValue: 0, onChange: updateSortDescription },
		{ defaultTitle: 'Page Size', searchParam: pageSizeTemp, variables: arrayOfItems, defaultValue: 0, onChange: updatePageSize }
	];

	const links = [
		{ title: 'Workouts', link: '/workouts' },
		{ title: 'Exercises', link: '/workouts-exercises' },
		{ title: 'Reminders', link: '/workouts-reminders' },
		{ title: 'Media', link: '/workouts-media' }
	];


	return (
		<div className="ListWorkouts">
			<HelmetProvider>
				<Helmet>
					<title>{category}</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<div>
				<Alert message={message} messageType={messageType} />

				<LinkLine links={links} />

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
							<div>
								<Button variant="outline-secondary" onClick={() => clearFilterChanges()}>Clear</Button>
								<Button variant="secondary" onClick={() => applyFilterChanges()}>Apply</Button>
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
        {defaultWorkouts.length && <Pagination quantity={totalItems}  />}
			</div>
		</div>
	);
};

export default ListWorkouts;