import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwtDecode (named export)

function Dashboard() {
    const [user, setUser] = useState({}); // State for storing user data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error message
    
    const navigate = useNavigate(); // Hook for navigation
    const token = localStorage.getItem("token"); // Get token from localStorage

    // Function to decode JWT and fetch user data
    const decodeTokenAndFetchUser = () => {
        if (token) {
            try {
                // Decode the token to get user info
                const decodedToken = jwtDecode(token); // Use jwtDecode to decode token
                
                // Log the decoded token to see the payload (for debugging)
                console.log(decodedToken); // For debugging purposes
                
                // Set user data from decoded token to state
                setUser(decodedToken); // Assuming user data is in the payload
                setLoading(false); // Stop loading state
            } catch (error) {
                setError("Token tidak valid, silakan login kembali.");
                setLoading(false);
            }
        } else {
            navigate('/'); // If token is not available, navigate to login page
        }
    };

    // useEffect hook to run the function when the component is mounted
    useEffect(() => {
        decodeTokenAndFetchUser(); // Decode token and set user data
    }, [navigate, token]);

    // Function to handle logout
    const logoutHandler = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post('http://localhost:8000/api/logout');
            localStorage.removeItem("token");
            delete axios.defaults.headers.common['Authorization'];
            navigate('/'); // Redirect after logout
        } catch (error) {
            setError("Gagal logout, coba lagi.");
        }
    };

    // Loading state
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
                                <h4>SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong></h4> {/* Displaying name from token */}
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
