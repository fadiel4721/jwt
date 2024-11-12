// src/pages/Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function Dashboard() {

    // State user
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true); // Loader state
    const [error, setError] = useState(null); // Error state

    // Define navigate
    const navigate = useNavigate();

    // Token
    const token = localStorage.getItem("token");

    // Function "fetchData"
    const fetchData = async () => {
        try {
            // Set axios header with type Authorization + Bearer token
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Fetch user from Rest API
            const response = await axios.get('http://localhost:8000/api/user');
            
            // Set response user to state
            setUser(response.data);
        } catch (error) {
            setError("Failed to fetch user data, please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Hook useEffect
    useEffect(() => {
        // Check token empty
        if (!token) {
            navigate('/'); // Redirect to login page
        } else {
            fetchData(); // Call function "fetchData"
        }
    }, [navigate, token]);

    // Function logout
    const logoutHandler = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post('http://localhost:8000/api/logout');
            localStorage.removeItem("token");
            delete axios.defaults.headers.common['Authorization'];
            navigate('/');
        } catch (error) {
            setError("Failed to logout, please try again.");
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#343a40' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/pokemons">Pokemon</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">Posts</Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={logoutHandler} className="btn btn-link nav-link text-white">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <h4>SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong></h4>
                                <hr />
                                <p className="lead">Welcome to your Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
