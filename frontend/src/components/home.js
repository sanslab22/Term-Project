import React, { useState } from 'react';
import './home.css';
import logo from '../images/logo.png';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';

const Home = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setCPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // To toggle between login and create account modals

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(); 
        
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
                                        className="input-field"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="input-field"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                <form className="login-form" onSubmit={handleLogin}>
                                    <input
                                        type="username"
                                        className="input-field"
                                        placeholder="Username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="email"
                                        className="input-field"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="input-field"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="input-field"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirm_password}
                                        onChange={(e) => setCPassword(e.target.value)}
                                    />
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
