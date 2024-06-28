import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Alert from '../../shared/components/Alert.js';

import { login, setToken } from '../services/auth.js';
import { validatePassword, validateUsernameOrEmail } from '../../shared/services/validation.js';

const LoginPage = ({ globalMessage }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		usernameOrEmail: '',
		password: ''
	});

	const [validationMessage, setValidationMessage] = useState({
		isValid: true,
		usernameOrEmail: '',
		password: '',
	});
	const isFormInvalid = !formData.usernameOrEmail.length || !formData.password.length;
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
		setValidationMessage({
			isValid: true,
			usernameOrEmail: '',
			password: '',
		});
		setMessage('');
		setMessageType('');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		handleClear();

		const fetchLogin = async () => {
			const usernameOrEmailValidation = validateUsernameOrEmail(formData.usernameOrEmail);
			const passwordValidation = validatePassword(formData.password);

			if (!usernameOrEmailValidation.isValid || !passwordValidation.isValid) {
				setValidationMessage({
					isValid: false,
					usernameOrEmail: usernameOrEmailValidation.message,
					password: passwordValidation.message,
				});
				return;
			}

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
				<Alert message={globalMessage.body.message} messageType={globalMessage.body.messageType} /> : <></>}

			<Alert message={message} messageType={messageType} />

			<form onSubmit={handleSubmit} className="form-custom" style={{ width: 'fit-content' }}>

				<div className="form-group mb-3" controlId="usernameOrEmail">
					<label className="form-label" for="usernameOrEmail">Username or Email</label>
					<input
						type="text"
						className="form-input"
						name="usernameOrEmail"
						id="usernameOrEmail"
						placeholder="Enter username or email"
						value={formData.usernameOrEmail}
						onChange={handleChange}
						required
					/>
					{validationMessage.usernameOrEmail && !validationMessage.isValid && <p className="form-error">{validationMessage.usernameOrEmail}</p>}
				</div>

				<div className="form-group mb-3" controlId="password">
					<label className="form-label" for="password">Password</label>
					<input
						type="password"
						className="form-input" name="password" id="password" placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					{validationMessage.password && !validationMessage.isValid && <p className="form-error">{validationMessage.password}</p>}
				</div>

				<button type='button' className="form-btn me-3" onClick={handleClear} variant="primary">
					Clear
				</button>

				<button className="form-btn" disabled={isFormInvalid} variant="primary">
					Submit
				</button>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		globalMessage: state.globalMessage
	};
};

export default connect(mapStateToProps)(LoginPage);
