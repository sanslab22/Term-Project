import React from "react";

const res = (reservations) => {
    return (
        <div>
            <h2>Booking Summary</h2>
            <div className="flight-summary">
                <div className="user-summary">
                    <p><strong>From:</strong> {reservations.tickets().toUpperCase() || 'N/A'}</p>
                    <p><strong>To:</strong> {reservations.to.toUpperCase() || 'N/A'}</p>
                    <p><strong>Seat
                        Class:</strong> {reservations.seatClass.charAt(0).toUpperCase() + reservations.seatClass.slice(1)}
                    </p>
                    <p><strong>Number of People:</strong> {reservations.numPeople}</p>
                    <p><strong>Departure Date:</strong> {reservations.departureDate || 'N/A'}</p>
                </div>
                {/*{selectedFlight ? (*/}
                {/*    <div className="flight-sum">*/}
                {/*        <p><strong>Flight Name:</strong> {selectedFlight.airplaneID.airplaneID}</p>*/}
                {/*        <p><strong>Departure*/}
                {/*            Time:</strong> {selectedFlight.departureTime.substring(11, 19)}</p>*/}
                {/*        <p><strong>Arrival*/}
                {/*            Time:</strong> {addMinutesToTime(selectedFlight.departureTime.substring(11, 19), selectedFlight.duration)}*/}
                {/*        </p>*/}
                {/*        <p><strong>Duration:</strong> {selectedFlight.duration} Minutes</p>*/}
                {/*        <p><strong>Price:</strong> ${formData.numPeople * 50}</p>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <p>No flight selected</p>*/}
                {/*)}*/}
            </div>
        </div>
    )
}
export default res;



