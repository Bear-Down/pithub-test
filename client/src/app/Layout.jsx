import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/style.css'; 

const Layout = () => {
	// For shared components (header, main content, footer) 
	// NOT USED YET
	return (
		<>
		<header className="header">
			<div className="logo">
			<Link to="/">PitHub</Link>
			</div>
			<div className="header-right">
			<div className="placeholder-box"></div>
			<div className="circle"></div>
			</div>
		</header>

		<main>
			{/* This renders the current page (VideoList, About, or Terms) */}
			<Outlet />
		</main>

		<footer className="footer">
			<div className="footer-container">
			<span className="footer-center">2026 PitHub | All Rights Reserved</span>
			<div className="footer-links">
				<Link to="/terms">Terms of Use</Link> | <Link to="/about">About</Link>
			</div>
			</div>
		</footer>
		</>
	);
};

export default Layout;