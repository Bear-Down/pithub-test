import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/style.css';

const LoginPage = () => {
	const { loginWithGoogle } = useAuth();

	return (
		<div className="login-screen">
			<header className="header">
				<div className="logo">
					<Link to="/">PitHub</Link>
				</div>
			</header>
			<div className="login-page-wrapper">
				<div className="login-card">
					<div className="login-header">
						<div className="login-logo">PitHub</div>
						<h1>Welcome Back</h1>
						<p>Sign in to access your classes and content</p>
					</div>

					<div className="login-actions">
						{/* Branded Google Sign-In Button */}
						<button className="google-signin-btn" onClick={loginWithGoogle}>
							<img 
								src="/assets/google-icon.jpg"
								alt="Google icon" 
							/>
							<span>Sign in with Google</span>
						</button>
					</div>

					<div className="login-footer">
						<p>By signing in, you agree to our <a href="/terms">Terms of Service</a></p>
					</div>
					
					{/* 
						Note: If you want to add Email/Password later, 
						you would insert the form inputs here between the header and actions.
					*/}
				</div>
				
				{/* Decorative background elements */}
				<div className="bg-blob-1"></div>
				<div className="bg-blob-2"></div>
			</div>
		</div>
	);
};

export default LoginPage;
