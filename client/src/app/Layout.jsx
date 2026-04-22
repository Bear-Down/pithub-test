import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/style.css'; 

const Layout = () => {
	const { user, logout } = useAuth();
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setShowDropdown(!showDropdown);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
		<header className="header">
			<div className="logo">
			<Link to="/">PitHub</Link>
			</div>
			<div className="header-right">
			<div className="placeholder-box"></div>
			{user && (
				<div className="profile-container" ref={dropdownRef}>
					<div className="circle" onClick={toggleDropdown} style={{ cursor: 'pointer', overflow: 'hidden' }}>
						{user.photoURL && <img src="/assets/user-icon.jpg" alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
						{/* {user.photoURL ? <img src={user.photoURL} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div className="user-placeholder" />} */}
					</div>
					{showDropdown && (
						<div className="profile-dropdown">
							<button className="dropdown-item">Profile</button>
							<button className="dropdown-item">Settings</button>
							<button className="dropdown-item logout" onClick={logout}>Log Out</button>
						</div>
					)}
				</div>
			)}
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