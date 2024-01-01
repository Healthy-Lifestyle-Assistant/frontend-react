import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './shared/component/CustomNavbar';
import Container from 'react-bootstrap/Container';
import Home from './home/Home';
import Workout from './workout/page/WorkoutHome';
import Nutrition from './nutrition/page/NutritionHome';
import Meditation from './meditation/page/MeditationHome';
import Calendar from './calendar/page/CalendarHome';
import Stats from './stats/page/StatsHome';
import './App.css';
import './scss/custom.scss';

function App() {
	return (
		<Router>
			<>
				<CustomNavbar />
				<Container className='mt-5'>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/workout" element={<Workout />} />
						<Route path="/nutrition" element={<Nutrition />} />
						<Route path="/meditation" element={<Meditation />} />
						<Route path="/calendar" element={<Calendar />} />
						<Route path="/stats" element={<Stats />} />
					</Routes>
				</Container>
			</>
		</Router>
	);
}

export default App;
