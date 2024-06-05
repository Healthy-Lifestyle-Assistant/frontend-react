import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './home/pages/HomePage';
import ListWorkouts from './workouts/pages/ListWorkouts';
import ListMeals from './nutrition/pages/ListMeals';
import ListMentalActivities from './mental/pages/ListMentalActivities';
import CalendarHome from './calendar/pages/CalendarHome';
import StatisticsHome from './statistics/pages/StatisticsHome';
import SignupPage from './users/pages/SignupPage';
import LoginPage from './users/pages/LoginPage';
import LogoutPage from './users/pages/LogoutPage';
import Components from './new/pages/Components';
import Navbar from './shared/components/Navbar';
import ListMedia from './shared/pages/ListMedia';
import AddMedia from './shared/pages/AddMedia';
import ManageMedia from './shared/pages/ManageMedia';
import ListExercises from './workouts/pages/ListExercises';

import './App.css';
import './scss/custom.scss';

function App() {
	return (
		<Router>
			<>
				<Navbar />
				<div className='container-custom'>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/workouts" element={<ListWorkouts />} />
						<Route path="/workouts/exercises" element={<ListExercises />} />
						<Route path="/media/:type" element={<ListMedia />} />
						<Route path="/media/:type/add" element={<AddMedia />} />
						<Route path="/media/:type/:id" element={<ManageMedia />} />
						<Route path="/nutrition" element={<ListMeals />} />
						<Route path="/mental-health" element={<ListMentalActivities />} />
						<Route path="/calendar" element={<CalendarHome />} />
						<Route path="/statistics" element={<StatisticsHome />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
						<Route path="/new" element={<Components />} />
					</Routes>
				</div>
			</>
		</Router>
	);
}

export default App;
