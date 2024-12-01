import React, { useState, useEffect } from "react";
import './body.css'; 
import { FaUser, FaChair, FaCalendarAlt } from "react-icons/fa";
import mockFlights from "../data/mockflights"; // Assuming this contains flight data

const Body = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [flights,setFlights] = useState([]);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        seatClass: 'economy',  // Default to Economy
        numPeople: 1,
    });
    const [selectedFlight, setSelectedFlight] = useState(null);

    function addMinutesToTime(timeString, minutesToAdd) {
        // Convert the time string to a Date object
        let [hours, minutes, seconds] = timeString.split(':').map(Number);
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes + minutesToAdd);
        date.setSeconds(seconds);
        // Format the result back to a time string
        let newHours = String(date.getHours()).padStart(2, '0');
        let newMinutes = String(date.getMinutes()).padStart(2, '0');
        let newSeconds = String(date.getSeconds()).padStart(2, '0');
        return `${newHours}:${newMinutes}:${newSeconds}`
    }

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
        if (currentStep === 1) {
            var from = document.getElementById("from").value
            var to = document.getElementById("to").value
            var date = document.getElementById("departureDate").value
            var url = `http://localhost:8080/flight/search?origin=${from}&destination=${to}&date=${date}`
            fetch(url, {
                method: "GET",
                mode:"cors",
                headers: {
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin':'*'
                }
            })
                .then(res=>res.json())
                .then(data=>{
                    if (data !== null || data !== undefined) {
                        console.log(data)
                        // const options = data
                        setFlights(data);
                    }
                })
                .catch(error => console.error('There was a problem with the fetch operation:', error));
            // console.log(url);
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
                                {flights.map((flight, index) => (
                                    <div
                                        key={index}
                                        className={`flight-card ${selectedFlight === flight ? 'selected' : ''}`}
                                        onClick={() => handleFlightSelect(flight)}
                                    >
                                        <div className="flight-logo">
                                            {flight.airplaneID.airline.includes("Delta") && (
                                            <img src= 'https://logos-world.net/wp-content/uploads/2021/08/Delta-Logo.png' alt={`${flight.name} logo`} />
                                            )}
                                            {flight.airplaneID.airline.includes("American") && (
                                                <img src= 'https://logos-world.net/wp-content/uploads/2020/11/American-Airlines-Emblem.png' alt={`${flight.name} logo`} />
                                            )}
                                            {flight.airplaneID.airline.includes("United") && (
                                                <img src= 'https://www.freepnglogos.com/uploads/united-airlines-logo-png-17.png' alt={`${flight.name} logo`} />
                                            )}
                                            {flight.airplaneID.airline.includes("Southwest") && (
                                                <img src= 'https://logos-world.net/wp-content/uploads/2020/10/Southwest-Airlines-Emblem.png' alt={`${flight.name} logo`} />
                                            )}
                                        </div>
                                        <div className="flight-info">
                                            {/*{flight.startAirportCode.airportCode} - {flight.endAirportCode.airportCode} for*/}
                                            <h3>{flight.departureTime.substring(0,10)} at {flight.departureTime.substring(11,19)}</h3>
                                            <p>{flight.name}</p>
                                            <p>Total Time: {flight.duration} minutes</p>
                                        </div>
                                        <div className="flight-price">
                                            <h3>${formData.numPeople*50}</h3>
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
                                    <p><strong>From:</strong> {formData.from.toUpperCase() || 'N/A'}</p>
                                    <p><strong>To:</strong> {formData.to.toUpperCase() || 'N/A'}</p>
                                    <p><strong>Seat Class:</strong> {formData.seatClass.charAt(0).toUpperCase() + formData.seatClass.slice(1)}</p>
                                    <p><strong>Number of People:</strong> {formData.numPeople}</p>
                                    <p><strong>Departure Date:</strong> {formData.departureDate || 'N/A'}</p>
                                </div>
                                {selectedFlight ? (
                                    <div className="flight-sum">
                                        <p><strong>Flight Name:</strong> {selectedFlight.airplaneID.airplaneID}</p>
                                        <p><strong>Departure Time:</strong> {selectedFlight.departureTime.substring(11,19)}</p>
                                        <p><strong>Arrival Time:</strong> {addMinutesToTime(selectedFlight.departureTime.substring(11,19),selectedFlight.duration)}</p>
                                        <p><strong>Duration:</strong> {selectedFlight.duration} Minutes</p>
                                        <p><strong>Price:</strong> ${formData.numPeople*50}</p>
                                    </div>
                                ) : (
                                    <p>No flight selected</p>
                                )}
                                </div>
                                <form className="payment-form">
                                    <div className="input-group">
                                        <label htmlFor="card-number">Card Number:</label>
                                        <input type="text" id="card-number" placeholder="Enter card number" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="exp-date">Expiration Date:</label>
                                        <input type="month" id="exp-date" />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="cvv">CVV:</label>
                                        <input type="text" id="cvv" placeholder="Enter CVV" />
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
