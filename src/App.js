import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavbarComponent from './shared/components/NavbarComponent';
import HomePage from './home/pages/HomePage';
import ListWorkouts from './workouts/pages/ListWorkouts';
import ListMeals from './nutrition/pages/ListMeals';
import ListMentalActivities from './mental/pages/ListMentalActivities';
import CalendarHome from './calendar/pages/CalendarHome';
import StatisticsHome from './statistics/pages/StatisticsHome';
import SignupPage from './users/pages/SignupPage';
import LoginPage from './users/pages/LoginPage';
import LogoutPage from './users/pages/LogoutPage';
import './App.css';
import './scss/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Router>
			<>
				<NavbarComponent />
				<Container className='margin-top'>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/workouts" element={<ListWorkouts />} />
						<Route path="/nutrition" element={<ListMeals />} />
						<Route path="/mental-health" element={<ListMentalActivities />} />
						<Route path="/calendar" element={<CalendarHome />} />
						<Route path="/statistics" element={<StatisticsHome />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
					</Routes>
				</Container>
			</>
		</Router>
	);
}

export default App;
