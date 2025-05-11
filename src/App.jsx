import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from 'react-router-dom';
import Login from './pages/Login';
import Courses from './pages/Courses';
import AddCourse from './pages/Addcourses';
import EditCourse from './pages/Editcourses';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('user') ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Courses App</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/courses">Courses</Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-decoration-none"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="full-width section">
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/courses" : "/login"} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/courses" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/courses" element={isLoggedIn ? <Courses /> : <Navigate to="/login" />} />
          <Route path="/add-course" element={isLoggedIn ? <AddCourse /> : <Navigate to="/login" />} />
          <Route path="/edit-course/:id" element={isLoggedIn ? <EditCourse /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;