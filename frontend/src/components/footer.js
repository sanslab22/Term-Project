import React from 'react';

const Footer = () => {
    const footerStyle = {
        position: 'fixed',  
        bottom: 0,          
        width: '100%',      
        textAlign: 'center', 
    };

    return (
        <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} SkyDeals. All rights reserved.</p>
        </footer>
    );
};

export default Footer;