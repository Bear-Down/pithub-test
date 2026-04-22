import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ClassList from '../features/classes/ClassList';
import ClassPage from '../features/classes/ClassPage';
import About from '../pages/About';
import Terms from '../pages/Terms';
import '../styles/style.css';

function App() {
	return (
		// Wrap Authentication so it's available everywhere
		<AuthProvider>
		<Router>
			<div className="app-container">
			<header>
				<div className="logo">
				<a href="/">PitHub</a>
				</div>
				<div className="header-right">
				<div className="placeholder-box"></div>
				<div className="circle"></div>
				</div>
			</header>

			<main>
				<Routes>
				{/* The main page showing the square class containers */}
				<Route path="/" element={<ClassList />} />

				{/* The specific page for each class to upload/view files */}
				<Route path="/class/:classId" element={<ClassPage />} />

				{/* About Page Route */}
				<Route path="/about" element={<About />} />

				{/* Terms of Use Route */}
				<Route path="/terms" element={<Terms />} />
				</Routes>
			</main>

			<footer>
				<div className="footer-container">
				<div className="footer-center">
					&copy; {new Date().getFullYear()} PitHub - Bear Down
				</div>
				<div className="footer-links">
					<Link to="/about">About</Link>
					<Link to="/terms">Terms</Link>
				</div>
				</div>
			</footer>
			</div>
		</Router>
		</AuthProvider>
	);
}

export default App;