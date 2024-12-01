import React, { useState, useEffect } from "react";
import './body.css'; 
import { FaUser, FaChair, FaCalendarAlt } from "react-icons/fa";
import mockFlights from "../data/mockflights"; // Assuming this contains flight data

const Body = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        seatClass: 'economy',  // Default to Economy
        numPeople: 1,
    });
    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);

        // Update form data only if the flight is selected and the respective fields are not already filled
        setFormData((prevData) => ({
            ...prevData,
            from: prevData.from || flight.departureLocation,
            to: prevData.to || flight.arrivalLocation,
            departureDate: prevData.departureDate || flight.departureDate,
        }));
    };

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    useEffect(() => {
        console.log('Updated FormData:', formData); // Log the formData to ensure it's updated
    }, [formData]); // Trigger this effect every time formData changes

    return (
        <div className="main-container">
            <div className="body-container">
                {/* Step Indicators */}
                <div className="step-indicators">
                    <div className="line"></div>
                    {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`step ${currentStep === step ? 'active' : ''}`}
                        >
                            {step}
                        </div>
                    ))}
                    <div className="line"></div>
                </div>

                {/* Body Content */}
                <div className="step-content">
                    {currentStep === 1 && (
                        <div>
                            <form className="form-step">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="from">From:</label>
                                        <input
                                            type="text"
                                            id="from"
                                            value={formData.from}
                                            onChange={handleFormChange}
                                            placeholder="Enter origin"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="to">To:</label>
                                        <input
                                            type="text"
                                            id="to"
                                            value={formData.to}
                                            onChange={handleFormChange}
                                            placeholder="Enter destination"
                                        />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <FaUser className="input-icon" />
                                        <input
                                            type="number"
                                            id="numPeople"
                                            value={formData.numPeople}
                                            onChange={handleFormChange}
                                            placeholder="Number of people"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <FaChair className="input-icon" />
                                        <select
                                            id="seatClass"
                                            value={formData.seatClass}
                                            onChange={handleFormChange}
                                        >
                                            <option value="economy">Economy</option>
                                            <option value="business">Business</option>
                                            <option value="first">First</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <FaCalendarAlt className="input-icon" />
                                        <input
                                            type="date"
                                            id="departureDate"
                                            value={formData.departureDate}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div style={{ padding: '20px' }}>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Available Flights</h2>
                            <div className="flight-list">
                                {mockFlights.map((flight, index) => (
                                    <div
                                        key={index}
                                        className={`flight-card ${selectedFlight === flight ? 'selected' : ''}`}
                                        onClick={() => handleFlightSelect(flight)}
                                    >
                                        <div className="flight-logo">
                                            <img src={flight.logo} alt={`${flight.name} logo`} />
                                        </div>
                                        <div className="flight-info">
                                            <h3>{flight.departureTime} - {flight.arrivalTime}</h3>
                                            <p>{flight.name}</p>
                                            <p>Total Time: {flight.totalTime}</p>
                                        </div>
                                        <div className="flight-price">
                                            <h3>${flight.price}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                        {currentStep === 3 && (
                            <div>
                                <h2>Booking Summary</h2>
                                <div class="flight-summary">
                                <div className="user-summary">
                                    <p><strong>From:</strong> {formData.from || 'N/A'}</p>
                                    <p><strong>To:</strong> {formData.to || 'N/A'}</p>
                                    <p><strong>Seat Class:</strong> {formData.seatClass}</p>
                                    <p><strong>Number of People:</strong> {formData.numPeople}</p>
                                    <p><strong>Departure Date:</strong> {formData.departureDate || 'N/A'}</p>
                                </div>
                                {selectedFlight ? (
                                    <div className="flight-sum">
                                        <p><strong>Flight Name:</strong> {selectedFlight.name}</p>
                                        <p><strong>Departure Time:</strong> {selectedFlight.departureTime}</p>
                                        <p><strong>Arrival Time:</strong> {selectedFlight.arrivalTime}</p>
                                        <p><strong>Duration:</strong> {selectedFlight.totalTime}</p>
                                        <p><strong>Price:</strong> ${selectedFlight.price}</p>
                                    </div>
                                ) : (
                                    <p>No flight selected</p>
                                )}
                                </div>
                                <form className="payment-form">
                                    <div className="input-group">
                                        <label htmlFor="card-type">Card Type:</label>
                                        <input type="text" id="card-type" placeholder="Enter card type" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="card-number">Card Number:</label>
                                        <input type="number" id="card-number" placeholder="Enter card number" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="exp-date">Expiration Date:</label>
                                        <input type="month" id="exp-date" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="cvv">CVV:</label>
                                        <input type="number" id="cvv" placeholder="Enter CVV" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="zipcode">ZipCode:</label>
                                        <input type="number" id="zipcode" placeholder="Enter Zipcode" />
                                    </div>
                                </form>
                            </div>
                        
                        
                    )}

                    {currentStep === 4 && <div>Generate your ticket.</div>}
                </div>

                            

                {/* Navigation buttons */}
                <div className="navigation-buttons">
                    <button onClick={handlePreviousStep} disabled={currentStep === 1}>
                        Previous
                    </button>
                    <button onClick={handleNextStep} disabled={currentStep === 4}>
                        {currentStep === 3 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Body;
