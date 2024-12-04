import React, { useState } from 'react';
import './home.css';
import logo from '../images/logo.png';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';

const Home = ({ onLogin,setUser }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [userID,setUserID] = useState(0);
    const [password, setPassword] = useState('');
    const [confirm_password, setCPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and create account modals

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    })

    const validateInputs = ({ email, password, username, confirm_password, phone }) => {
        const errors = [];

        // Check if email is valid
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Invalid email format");
            // alert('Invalid email format');
        }

        // Check if password meets complexity
        if (password && password.length < 6) {
            errors.push("Password must be at least 6 characters long");
            // alert('Password must be at least 6 characters long')
        }

        // For registration: Ensure username is provided
        if (username && username.trim().length === 0) {
            errors.push("Username cannot be empty");
            // alert('Username cannot be empty')
        }

        // For registration: Ensure passwords match
        if (confirm_password && password !== confirm_password) {
            errors.push("Passwords do not match");
            // alert('Passwords do not match')
        }

        // For registration: Ensure phone is a valid number (optional)
        if (phone && !/^\d{10}$/.test(phone)) {
            errors.push("Phone number must be 10 digits");
        }

        return errors;
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }))
    }
    function decodeJWT(token) {
        // Split the token into its parts
        const parts = token.split('.');
        // Decode the payload (second part)
        const payload = parts[1];
        const decodedPayload = atob(payload);
        // Parse the JSON string
        const payloadObject = JSON.parse(decodedPayload);
        return payloadObject;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const{email, password} = formData

        // Validate input
        const errors = validateInputs({ email, password });
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        try{
            const url = 'http://localhost:8080/auth/login'; // backend endpoint
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    // 'Access-Control-Allow-Origin':'*',
                },
                body: JSON.stringify({email, password}),
            })

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store JWT token
                setIsLoggedIn(true); // Update state to logged in
                setUser(decodeJWT(localStorage.getItem("token")).passengerID)
                alert('Login successful!');

                onLogin(); // Notify parent component (if needed)
            } else {
                const error = await response.json();
                alert(error.message); // Show error message
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('An error occurred during login.');
        }
    }

    // Handle user registration
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const{username, email, phone, password, confirm_password} = formData;

        // if (password !== confirm_password) {
        //     alert('Passwords do not match');
        //     return;
        // }

        // Validate input
        const errors = validateInputs({ username, email, phone, password, confirm_password });
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        try {
            // var username = document.getElementById("username").value
            // var email = document.getElementById("email").value
            // var password = document.getElementById("password").value
            // var confirm_password = document.getElementById("confirm_password").value

            var url = `http://localhost:8080/passenger/register`
            const response = await fetch(url, { // Backend endpoint for registration
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type":"application/json",
                    // "Accept":"application/json",
                    // 'Access-Control-Allow-Origin':'*'
                },

                body: JSON.stringify({
                    name: username,
                    phone: phone, // added
                    email: email,
                    password: password
                }),
            });
            console.log(username, phone, email, password)

            if (response.ok) {
                alert('Account created successfully. Please log in.');
                setIsLogin(true); // Switch to login view
            } else {
                const error = await response.json();
                alert(error.message); // Show error message
            }
        } catch (err) {
            console.error('Account creation error:', err);
            alert('An error occurred during account creation.');
        }
    };



    return (
        <div className="home-container">
            <div className="image-grid">
                <div className="image-item">
                    <img src={image1} alt="Image 1" />
                </div>
                <div className="image-item">
                    <img src={image2} alt="Image 2" />
                </div>
                <div className="image-item">
                    <img src={image3} alt="Image 3" />
                </div>
                <div className="image-item">
                    <img src={image4} alt="Image 4" />
                </div>
                <div className="image-item">
                    <img src={image5} alt="Image 5" />
                </div>
                <div className="image-item">
                    <img src={image6} alt="Image 6" />
                </div>
                <div className="image-item">
                    <img src={image1} alt="Image 1" />
                </div>
                <div className="image-item">
                    <img src={image2} alt="Image 2" />
                </div>
                <div className="image-item">
                    <img src={image3} alt="Image 3" />
                </div>
                <div className="image-item">
                    <img src={image4} alt="Image 4" />
                </div>
                <div className="image-item">
                    <img src={image5} alt="Image 5" />
                </div>
                <div className="image-item">
                    <img src={image6} alt="Image 6" />
                </div>
            </div>

            {/* Modal */}
            {!isLoggedIn && (
                <div className="modal-container">
                    <div className="login-box">
                        {/* Logo */}
                        <div className="logo-container">
                            <img src={logo} alt="SkyDeals Logo" className="logo" />
                        </div>

                        {/* Conditional Render for Login or Create Account */}
                        {isLogin ? (
                            <>
                                {/* Login Form */}
                                <h2 className="welcome-text">Welcome to SkyDeals</h2>
                                <p className="description">Find the best flight deals</p>
                                <form className="login-form" onSubmit={handleLogin}>
                                    <input
                                        type="email"
                                        id="email"
                                        className="input-field"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleFormChange}
                                    />
                                    <input
                                        type="password"
                                        id="password"
                                        className="input-field"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={handleFormChange}
                                    />
                                    <button type="submit" className="login-btn">Login</button>
                                </form>

                                {/* Switch to Create Account */}
                                <div className="or-container">
                                    <span className="line"></span>
                                    <span className="or-text">or</span>
                                    <span className="line"></span>
                                </div>
                                <button
                                    className="switch-btn"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Create an Account
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Create Account Form */}
                                <h2 className="welcome-text">Create an Account</h2>
                                <p className="description">Join SkyDeals to find the best flights</p>
                                <form className="login-form" onSubmit={handleCreateAccount}>
                                    <div className="input-group">
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="text"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleFormChange}
                                            placeholder="Enter your username"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="phone">Phone Number:</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleFormChange}
                                            placeholder="Enter your Phone Number"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleFormChange}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="confirm_password">Confirm Password:</label>
                                        <input
                                            type="password"
                                            id="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleFormChange}
                                            placeholder="Re-enter your password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="login-btn">Create Account</button>
                                </form>
                                {/* Switch to Login */}
                                <div className="or-container">
                                    <span className="line"></span>
                                    <span className="or-text">or</span>
                                    <span className="line"></span>
                                </div>
                                <button
                                    className="switch-btn"
                                    onClick={() => setIsLogin(true)}
                                >
                                    Back to Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
