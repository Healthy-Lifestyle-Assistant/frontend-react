import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
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
import ListMedia from './workouts/pages/ListMedia';
import './App.css';
import './scss/custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const workoutsCategories = {
    workouts: '/workouts',
		exercises: '/workouts-exercises',
		reminders: '/workouts-reminders',
		media: '/workouts-media',
	};
	return (
		<Router>
			<>
				<Navbar />
				{/* <Container className='margin-top'> */}
				<div className='container-custom'>
					<Routes>
						<Route path="/" element={<Outlet />}>
						  <Route index element={<HomePage />} />
						  {Object.entries(workoutsCategories).map(([category, path]) => (
								<Route key={category} path={path} element={<Outlet />}>
									<Route index element={<ListWorkouts category={category} />} />
									<Route path=":itemId" element={<ListWorkouts />} />
								</Route>
							))}
						<Route path="/media" element={<ListMedia />} />
						<Route path="/nutrition" element={<ListMeals />} />
						<Route path="/mental-health" element={<ListMentalActivities />} />
						<Route path="/calendar" element={<CalendarHome />} />
						<Route path="/statistics" element={<StatisticsHome />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/logout" element={<LogoutPage />} />
						<Route path="/new" element={<Components />} />
						</Route>
					</Routes>
				</div>
				{/* </Container> */}
			</>
		</Router>
	);
}

export default App;
