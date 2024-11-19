import React, { useState } from 'react'
import Home from './components/home';  // Import Home component
import Navbar from './components/navbar';  // Import Navbar component
import Body from './components/body';  // Import Body component
import Footer from './components/footer';  // Import Footer component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status

    const handleLogin = () => {
        setIsLoggedIn(true);  // Set login state to true
    };

    const handleLogout = () => {
        setIsLoggedIn(false);  // Set login state to false (log out)
    };

    return (
        // "Hello World"
        <div className="App">
            {/* Render different components based on login state */}
            {isLoggedIn ? (
                <>
                    <Navbar onLogout={handleLogout} />  {/* Pass logout function to Navbar */}
                    <Body />  {/* Show the Body component when logged in */}

                </>
            ) : (
                <>
                    <Home onLogin={handleLogin} />  {/* Pass login function to Home */}
                    <Footer />  {/* Footer is always visible */}
                </>
            )}
        </div>
    );
}

export default App;
