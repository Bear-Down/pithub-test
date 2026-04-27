import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/style.css';
import googleIcon from '../../assets/google-icon.jpg';

const LogoutPage = () => {
	const { logout, loginWithGoogle } = useAuth();

	useEffect(() => {
		logout();
	}, []);

	return (
		<div className="logout-screen">
			<header className="header">
				<div className="logo">
					<Link to="/">PitHub</Link>
				</div>
			</header>
			<div className="logout-page-wrapper">
				<div className="logout-card">
					<div className="logout-header">
						<div className="logout-logo">PitHub</div>
						<h1>Successfully Logged Out!</h1>
						<p>Log back in here to access your classes and content</p>
					</div>

					<div className="login-actions">
						{/* Branded Google Sign-In Button */}
						<button className="google-signin-btn" onClick={loginWithGoogle}>
							<img 
								src={googleIcon}
								alt="Google icon" 
							/>
							<span>Sign in with Google</span>
						</button>
					</div>

					<div className="login-footer">
						<p>By signing in, you agree to our <a href="/terms">Terms of Service</a></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogoutPage;
