import React, { useState, useEffect } from "react";
import './body.css'; 
import { FaUser, FaChair, FaCalendarAlt, FaClock } from "react-icons/fa";
import mockFlights from "../data/mockflights"; // Assuming this contains flight data

const Body = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        departureTime: '',
        seatClass: 'economy',  // Default to Economy
        numPeople: 1,
        passengerNames: [{ firstName: '', lastName: '' }]
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

    const handlePassengerNameChange = (index, field, value) => {
        const newPassengerNames = [...formData.passengerNames];

        if (!newPassengerNames[index].seat) {
            newPassengerNames[index].seat = generateRandomSeat();
        }

        newPassengerNames[index][field] = value;
        setFormData({
            ...formData,
            passengerNames: newPassengerNames,
        });
    };

    useEffect(() => {
        console.log('Updated FormData:', formData); // Log the formData to ensure it's updated
    }, [formData]); // Trigger this effect every time formData changes


    // Create an array of passenger name input fields based on the number of people
    const renderPassengerInputs = () => {
        return Array.from({ length: formData.numPeople }, (_, index) => (
            <div className="input-people passenger-input-row" key={index}>
                <label>Passenger {index + 1}</label>
                <div className="passenger-names">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.passengerNames[index]?.firstName || ''}
                        onChange={(e) => handlePassengerNameChange(index, 'firstName', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.passengerNames[index]?.lastName || ''}
                        onChange={(e) => handlePassengerNameChange(index, 'lastName', e.target.value)}
                    />
                </div>
            </div>
        ));
    };


    // Update passenger names array when the number of people changes
    useEffect(() => {
        const updatedPassengerNames = Array.from({ length: formData.numPeople }, (_, index) => ({
            firstName: formData.passengerNames[index]?.firstName || '',
            lastName: formData.passengerNames[index]?.lastName || '',
            seat: formData.passengerNames[index]?.seat || generateRandomSeat() // Ensure seat numbers are assigned
        }));
        setFormData((prevData) => ({
            ...prevData,
            passengerNames: updatedPassengerNames,
        }));
    }, [formData.numPeople]);



    const generateRandomSeat = () => {
        const row = Math.floor(Math.random() * 30) + 1; // Rows 1-30
        const seat = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // Seats A-F
        return `${row}${seat}`;
    };

    const [ticketCounter, setTicketCounter] = useState(1);
    const generateTicketID = () => {
        return `TICKET${ticketCounter.toString().padStart(4, '0')}`; // Example: TICKET0001
    };

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
                                        <input
                                            type="text"
                                            id="from"
                                            value={formData.from}
                                            onChange={handleFormChange}
                                            placeholder="Enter origin"
                                        />
                                    </div>
                                    <div className="input-group">
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
                                </div>

                                {/* Render passenger input fields */}
                                <div className="passenger-section">
                                    {renderPassengerInputs()}
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <FaCalendarAlt className="input-icon"/>
                                        <input
                                            type="date"
                                            id="departureDate"
                                            value={formData.departureDate}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <FaClock className="input-icon"/>
                                        <input
                                            type="time"
                                            id="departureTime"
                                            value={formData.departureTime}
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div style={{padding: '20px'}}>
                            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Available Flights</h2>
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
                                <div className="flight-summary">
                                    <div className="user-summary">
                                        <p><strong>From:</strong> {formData.from || 'N/A'}</p>
                                        <p><strong>To:</strong> {formData.to || 'N/A'}</p>
                                        <p><strong>Seat Class:</strong> {formData.seatClass}</p>
                                        <p><strong>Number of People:</strong> {formData.numPeople}</p>

                                        <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                {formData.passengerNames?.map((passenger, index) => (
                                                    <li key={index}>
                                                        {passenger.firstName} {passenger.lastName} - Seat {generateRandomSeat()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <p><strong>Departure Date:</strong> {formData.departureDate || 'N/A'}</p>
                                        <p><strong>Departure Time:</strong> {selectedFlight?.departureTime || 'N/A'}</p>
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

                    { currentStep === 4 &&
                        <div>
                            <div className="ticket-container">
                                <div className="ticket-header">
                                    <div className="from-to">
                                        <span><strong>From:</strong> {formData.from || 'N/A'}</span>
                                        <span><strong>To:</strong> {formData.to || 'N/A'}</span>
                                    </div>
                                </div>
                                <div className="ticket-details">
                                    <div className="ticket-id">
                                        <p><strong>Ticket ID:</strong> {generateTicketID()}</p>
                                    </div>
                                    <div className="departure-arrival">
                                        <p>
                                            <strong>Departure:</strong> {selectedFlight?.departureTime || 'N/A'} - <strong>Arrival:</strong> {selectedFlight?.arrivalTime || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="ticket-price">
                                        <p><strong>Price:</strong> ${selectedFlight?.price || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="passenger-details">
                                    {formData.passengerNames?.map((passenger, index) => (
                                        <div className="passenger-box" key={index}>
                                            <p>{passenger.firstName} {passenger.lastName} -
                                                Seat {generateRandomSeat()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <button className="backtopage1"
                                        onClick={() => setCurrentStep(1)}
                                >
                                    Return to the Home Page
                                </button>
                            </div>

                        </div>

                    }
                </div>


                {/* Navigation buttons */}
                <div className="navigation-buttons">
                <button onClick={handlePreviousStep} disabled={currentStep === 1 || currentStep=== 4}>
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
