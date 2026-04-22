import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

import ClassList from '../features/classes/ClassList';
import ClassPage from '../features/classes/ClassPage';

import Login from "../pages/Login";
import About from '../pages/About';
import Terms from '../pages/Terms';

import ProtectedRoute from "../pages/components/ProtectedRoute";

import '../styles/style.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
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
              {/* LOGIN PAGE */}
              <Route
                path="/"
                element={user ? <Navigate to="/classes" /> : <Login />}
              />

              {/* Main page showing the square class containers */}
              <Route  
                path="/classes"
                element={
                  <ProtectedRoute user={user}>
                    <ClassList />
                  </ProtectedRoute>
                }
              />

              {/* Protected route for specific class pages */}
              <Route
                path="/class/:classId"
                element={
                  <ProtectedRoute user={user}>
                    <ClassPage />
                  </ProtectedRoute>
                }
              />

              {/* About and Terms Pages */}
              <Route path="/about" element={<About />} />
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
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;