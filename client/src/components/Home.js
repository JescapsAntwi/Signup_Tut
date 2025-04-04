import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to MERN Signup Demo</h1>
      <p>A simple demonstration of user registration with the MERN stack</p>

      <div className="action-buttons">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/signup" className="btn btn-primary">
            Sign Up Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
