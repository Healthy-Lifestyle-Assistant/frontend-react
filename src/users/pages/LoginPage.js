import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Form, Button } from 'react-bootstrap';
import AlertComponent from '../../shared/components/AlertComponent.js';
import { login, setToken } from '../../shared/services/auth.js';

const LoginPage = ({ globalMessage }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		usernameOrEmail: '',
		password: ''
	});
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleClear = () => {
		setFormData({
			usernameOrEmail: '',
			password: ''
		});
		setMessage('');
		setMessageType('');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		handleClear();
		const fetchLogin = async () => {
			try {
				const response = await login(formData);
				if (response.status === 200) {
					setToken(response.body.token);
					navigate('/workouts');
					dispatch({ type: 'CLEAR_GLOBAL_MESSAGE' });
				} else {
					setMessageType("WARNING");
					setMessage("Invalid credentials");
					console.log(response);
				}
			} catch (error) {
				setMessageType("WARNING");
				setMessage(error.message);
			}
		};
		fetchLogin();
	};

	return (
		<div className="d-flex flex-column align-items-center" style={{ marginTop: "6rem" }}>
			<HelmetProvider>
				<Helmet>
					<title>Login</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<h3 className="text-muted" style={{ marginBottom: "1rem" }}>Login</h3>

			{globalMessage && globalMessage.body ?
				<AlertComponent message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

			<AlertComponent message={message} messageType={messageType} />

			<Form onSubmit={handleSubmit} style={{ width: 'fit-content' }}>

				<Form.Group className="mb-3" controlId="usernameOrEmail">
					<Form.Label>Username or Email</Form.Label>
					<Form.Control type="text" name="usernameOrEmail" placeholder="Enter username or email"
						value={formData.usernameOrEmail} onChange={handleChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password"
						value={formData.password} onChange={handleChange} required />
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
}

const mapStateToProps = (state) => {
	return {
		globalMessage: state.globalMessage
	};
};

export default connect(mapStateToProps)(LoginPage);
