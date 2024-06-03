import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import YouTubeCard from '../components/YouTubeCard.js';
import Links from '../components/Links.js';
import Filter from '../../shared/components/Filter.js';
import Pagination from '../../shared/components/Pagination.js';
import { validateToken, getToken } from '../../shared/services/auth';
import { getDefaultMedia, getCustomMedia } from '../services/requests';
import { buildUrlMediaFilter } from '../../shared/services/util.js';
import Button from '../../shared/components/Button.js';

function ListMedia({ isLoggedIn }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [defaultMedia, setDefaultMedia] = useState([]);
	const [customMedia, setCustomMedia] = useState([]);
	const [filterParams, setFilterParams] = useState({
		mediaName: '',
		description: '',
		isCustom: false,
		isDefault: false,
		sortField: '',
		sortDirection: '',
		pageSize: '',
		currentPageZeroBased: 0
	});
	const [totalPages, setTotalPages] = useState(1);
	const [totalElements, setTotalElements] = useState(0);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const urlPostfix = buildUrlMediaFilter(
				filterParams.mediaName,
				filterParams.description,
				filterParams.isCustom,
				filterParams.isDefault,
				filterParams.sortField,
				filterParams.sortDirection,
				filterParams.pageSize,
				filterParams.currentPageZeroBased);

			try {
				const data = await validateToken();
				if (data.status === 200) {
					dispatch({ type: 'LOGGED_IN' });
					dispatch({ type: 'SET_USER_DATA', payload: { fullName: data.body[1] } });
					const token = getToken();
					const customMedia = await getCustomMedia(token, urlPostfix);
					setCustomMedia(customMedia.body.content);
					setTotalPages(customMedia.body.totalPages);
					setTotalElements(customMedia.body.totalElements);
				} else {
					dispatch({ type: 'LOGGED_OUT' });
					dispatch({ type: 'CLEAR_USER_DATA' });
					const defaultMedia = await getDefaultMedia(urlPostfix);
					setDefaultMedia(defaultMedia.body.content);
					setTotalPages(defaultMedia.body.totalPages);
					setTotalElements(defaultMedia.body.totalElements);
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};

		fetchData();
	}, [filterParams]);

	const handleFilterChange = (newFilterParams) => {
		setFilterParams(newFilterParams);
	};

	const handlePageChange = (pageNumberZeroBased) => {
		setFilterParams({
			...filterParams,
			currentPageZeroBased: pageNumberZeroBased
		});
	}

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Workouts Media</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<Links active='media' />
				
			{isLoggedIn && (
				<div>
					<Button title='Add media' link='/workouts-add-media' />
					<br/><br/>
				</div>
			)}
			<Filter onFilterChange={handleFilterChange} />
			
			<div>Found {totalElements}</div>

			{defaultMedia && defaultMedia.length > 0 && (
				<div className='d-flex flex-wrap justify-content-left'>
					{defaultMedia.map(item => (
						<YouTubeCard
							key={item.id}
							title={item.name}
							subtitle={`${item.isCustom ? 'Custom' : 'In-app'}`}
							description={item.description}
							httpRef={item.ref}
							httpRefTypeName={item.httpRefTypeName}
						/>
					))
					}
				</div>
			)}

			{customMedia && customMedia.length > 0 && (
				<div className='d-flex flex-wrap justify-content-left'>
					{customMedia.map(item => (
						<YouTubeCard
							key={item.id}
							title={item.name}
							subtitle={`${item.isCustom ? 'Custom' : 'In-app'}`}
							description={item.description}
							src={item.ref}
						/>
					))
					}
				</div>
			)}

			<Pagination
				currentPageZeroBased={filterParams.currentPageZeroBased}
				totalPages={totalPages}
				onPageChange={handlePageChange} />

		</>
	);
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	};
};

export default connect(mapStateToProps)(ListMedia);