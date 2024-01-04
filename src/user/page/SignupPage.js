import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import CustomAlert from '../../shared/component/CustomAlert.js';
import { SIGNUP, COUNTRIES } from '../../shared/URL.js';

const SignupPage = () => {
	const navigate = useNavigate();

	const formRef = useRef(null);
	// const username = useRef("");
	// const email = useRef("");
	// const fullName = useRef("");
	// const password = useRef("");
	// const confirmPassword = useRef("");
	// const countryId = useRef("");
	// const countries = useRef([]);
	// const age = useRef("");

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [fullName, setFullName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [countryId, setCountryId] = useState("");
	const [countries, setCountries] = useState([]);
	const [age, setAge] = useState("");
	
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");

	useEffect(() => {
		console.log("useEffect");
		fetchData();
	}, []);

	const fetchData = async () => {
		console.log("fetchData");
		const countriesResponse = await getCountries();
		// setCountries(countriesResponse.body);
		console.log(countries);
	};

	const getCountries = async () => {
		const res = await fetch(COUNTRIES, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});

		const data = await res.json();

		return {
			status: res.status,
			body: data,
		};
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('Form submitted:', formRef);

		// formRef.current.reset();

		const signupRequestDto = {
			username,
			email,
			fullName,
			password,
			confirmPassword,
			countryId,
			age,
		};
		console.log('signupRequestDto:', signupRequestDto);


		try {
			const res = await signup(signupRequestDto);

			if (res.status === 201) {
				setMessageType("SUCCESS");
				setMessage("User account has been created successfully! Now you can login to your account.");
			} else {
				setMessageType("WARNING");
				setMessage(`An error occurred ${res.status}`);
			}
		} catch (error) {
			setMessageType("WARNING");
			setMessage(`An error occurred ${error}`);
		}

		// setUsername("");
		// setEmail("");
		// setFullName("");
		// setPassword("");
		// setConfirmPassword("");
		// setCountryId(null);
		// setAge(null);
	};

	const signup = async (requestBody) => {
		const res = await fetch(SIGNUP, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(requestBody),
		});

		const data = await res.json();

		return {
			status: res.status,
			body: data,
		};
	};


	// const handleCountryChange = (e) => {
	// 	setCountryId(e.target.value);
	// 	console.log(e.target.value);
	// };

	// const handleAgeChange = (e) => {
	// 	setAge(e.target.value);
	// };

	return (
		<div className="d-flex flex-column align-items-center" style={{ marginTop: "6rem" }}>
			<HelmetProvider>
				<Helmet>
					<title>Signup</title>
					<html lang="en" />
				</Helmet>
			</HelmetProvider>

			<h3 className="text-muted" style={{ marginBottom: "1rem" }}>Signup</h3>

			<CustomAlert message={message} messageType={messageType} />

			<Form ref={formRef} onSubmit={handleSubmit} style={{ width: 'fit-content' }}>
				<Form.Group className="mb-3" controlId="formBasicFullName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullName" placeholder="Enter full name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" placeholder="Enter username" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" name="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name="confirmPassword" placeholder="Confirm password" />
				</Form.Group>

				{countries && (
					<Form.Group className="mb-3" controlId="countries">
						<Form.Label>
							Country
						</Form.Label>
						{/* value={countryId}  onChange={handleCountryChange}  */}
						<Form.Select aria-label="Select Country" required>
						<option disabled value="" aria-readonly>Open this select menu</option>
							{countries.map((elt) => (
								<option key={elt.id} value={elt.id}>
									{elt.name}
								</option>
							))}
						</Form.Select>
					</Form.Group>
				)}

				<Form.Group controlId="age" className="mb-4">
					<Form.Label>Age</Form.Label>
					{/* value={age} onChange={handleAgeChange} */}
					<Form.Control type="text"  />
					<Form.Text className="text-muted">
						Optional
					</Form.Text>
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default SignupPage;
