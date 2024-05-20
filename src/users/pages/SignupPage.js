import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Form, Button } from 'react-bootstrap';
import AlertComponent from '../../shared/components/AlertComponent.js';
import AlertsListComponent from '../../shared/components/AlertsListComponent.js';
import { SIGNUP } from '../../shared/services/URL.js';
import { getCountries, signup } from '../services/requests.js';
import { buildAlertsList } from '../../shared/services/util.js';

const SignupPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		fullName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		countryId: '',
		age: ''
	});
	const [countries, setCountries] = useState([]);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [messages, setMessages] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCountries = async () => {
			const countriesResponse = await getCountries();
			setCountries(countriesResponse.body);
			console.log('countries', countries);
		};
		console.log("useEffect");
		fetchCountries();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleClear = () => {
		setFormData({
			fullName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			countryId: '',
			age: ''
		});
		setMessage('');
		setMessageType('');
		setMessages([]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		handleClear();
		const fetchSignup = async () => {
			try {
				const response = await signup(formData);
				if (response.status === 201) {
					dispatch({
						type: 'SET_GLOBAL_MESSAGE',
						payload: {
							messageType: "SUCCESS",
							message: "User account has been created successfully! Please login"
						}
					});
					navigate('/login');
				} else {
					setMessages(buildAlertsList(response.body, "WARNING"));
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};
		fetchSignup();
	};

	return (
		<div className="d-flex flex-column align-items-center" style={{ marginTop: "6rem" }}>
			<HelmetProvider>
				<Helmet>
					<title>Signup</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<h3 className="text-muted" style={{ marginBottom: "1rem" }}>Signup</h3>

			<AlertComponent message={message} messageType={messageType} />

			<AlertsListComponent messages={messages} />

			<Form onSubmit={handleSubmit} style={{ width: 'fit-content' }} className='mb-5'>

				<Form.Group className="mb-3" controlId="fullName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullName" placeholder="Enter full name"
						value={formData.fullName} onChange={handleChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" placeholder="Enter username"
						value={formData.username} onChange={handleChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" name="email" placeholder="Enter email"
						value={formData.email} onChange={handleChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password"
						value={formData.password} onChange={handleChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name="confirmPassword" placeholder="Confirm password"
						value={formData.confirmPassword} onChange={handleChange} required />
				</Form.Group>

				{countries && (
					<Form.Group className="mb-3" controlId="countryId">
						<Form.Label>Country</Form.Label>
						<Form.Select aria-label="Select Country" name='countryId'
							value={formData.countryId} onChange={handleChange} required>
							<option disabled value="" aria-readonly>Select Country</option>
							{countries.map((elt) => (
								<option key={elt.id} value={elt.id}>
									{elt.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				)}

				<Form.Group controlId="age" className="mb-4">
					<Form.Label>Age (optional)</Form.Label>
					<Form.Control type="text" name='age' value={formData.age} onChange={handleChange} />
				</Form.Group>

				<Button onClick={handleClear} variant="primary" className='me-3'>
					Clear
				</Button>

				<Button variant="primary" type="submit">
					Submit
				</Button>

			</Form>
		</div>
	);
};

export default SignupPage;
