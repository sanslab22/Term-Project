import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; 
import { MdMenuBook } from "react-icons/md"; 
import { FiLogOut } from "react-icons/fi"; 
import logo from '../images/logo.png';

const NavBar = ({ onLogout }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#F0F8FF' }}>
            {/* Left Section: Logo and Text */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ height: '40px', marginRight: '10px' }}
                />
                <p style={{ margin: 0, fontSize: '1.5em' }}>SkyDeals</p>
            </div>

            {/* Right Section: User Profile with Dropdown */}
            <div 
    style={{ 
        position: 'relative', 
        cursor: 'pointer' 
    }} 
    onClick={toggleDropdown}
>
    <FaUserCircle size={40} color="#1C1C1C" />
    {dropdownVisible && (
        <div 
            style={{ 
                position: 'absolute', 
                top: '50px', 
                right: 0, 
                background: '#ffffff', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                borderRadius: '5px', 
                width: '150px', 
                border: '1px solid black' 
            }}
        >
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '10px 20px', 
                    borderBottom: '1px solid #f0f0f0', 
                    cursor: 'pointer' 
                }} 
                onMouseEnter={(e) => e.target.style.background = '#F0FFFF'}
                onMouseLeave={(e) => e.target.style.background = '#ffffff'}
            >
                <MdMenuBook style={{ marginRight: '10px' }} />
                <p style={{ margin: 0 }}>Booked</p>
            </div>
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '10px 20px', 
                    cursor: 'pointer' 
                }} 
                onMouseEnter={(e) => e.target.style.background = '#F0FFFF'}
                onMouseLeave={(e) => e.target.style.background = '#ffffff'}
                onClick={onLogout}
            >
                <FiLogOut style={{ marginRight: '10px' }} />
                <p style={{ margin: 0 }}>LogOut</p>
            </div>
        </div>
    )}
</div>

        </header>
    );
};

export default NavBar;
