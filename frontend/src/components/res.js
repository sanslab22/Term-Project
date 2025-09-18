import React from "react";
import './body.css';

const Res = (reservations) => {
    // console.log(reservations.reservations);
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
    return (
        <div>
            <h2>Booking Summary</h2>
            {reservations.reservations.map((reservation, index) => (
                reservation.tickets.length === reservation.totalPrice/50 && (
            <div key = {index} className="flight-summary">
                    <div className="user-summary">
                        <p>
                            <strong>From:</strong> {reservation.tickets[0].flight.startAirportCode.airportCode.toUpperCase() || 'N/A'}
                        </p>
                        <p>
                            <strong>To:</strong> {reservation.tickets[0].flight.endAirportCode.airportCode.toUpperCase() || 'N/A'}
                        </p>
                        <p><strong>Seat
                            Class:</strong> Economy
                        </p>
                        <p><strong>Number of People:</strong> {reservation.tickets.length}</p>
                        <p><strong>Departure
                            Date:</strong> {reservation.tickets[0].flight.departureTime.substring(0, 10) || 'N/A'}</p>
                        {/*<p><strong>Departure*/}
                        {/*    Time:</strong> {reservation.tickets[0].flight.departureTime.substring(11, 19) || 'N/A'}</p>*/}
                    </div>




            <div key = {index} className="flight-sum">
                <p><strong>Flight Name:</strong> {reservation.tickets[0].flight.flightID}</p>
                <p><strong>Departure
                    Time:</strong> {reservation.tickets[0].flight.departureTime.substring(11, 19)}</p>
                <p><strong>Arrival
                    Time:</strong> {addMinutesToTime(reservation.tickets[0].flight.departureTime.substring(11, 19), reservation.tickets[0].flight.duration)}
                </p>
                <p><strong>Duration:</strong> { reservation.tickets[0].flight.duration} Minutes</p>
                <p><strong>Price:</strong> ${ reservation.totalPrice}</p>
            </div>
                </div>
                )
))}
        </div>
    )
}
export default Res;

/**
 * <div>
 *                             <h2>Booking Summary</h2>
 *                             <div class="flight-summary">
 *                                 <div className="user-summary">
 *                                     <p><strong>From:</strong> {formData.from.toUpperCase() || 'N/A'}</p>
 *                                     <p><strong>To:</strong> {formData.to.toUpperCase() || 'N/A'}</p>
 *                                     <p><strong>Seat
 *                                         Class:</strong> {formData.seatClass.charAt(0).toUpperCase() + formData.seatClass.slice(1)}
 *                                     </p>
 *                                     <p><strong>Number of People:</strong> {formData.numPeople}</p>
 *                                     <p><strong>Departure Date:</strong> {formData.departureDate || 'N/A'}</p>
 *                                 </div>
 *                                 {selectedFlight ? (
 *                                     <div className="flight-sum">
 *                                         <p><strong>Flight Name:</strong> {selectedFlight.airplaneID.airplaneID}</p>
 *                                         <p><strong>Departure
 *                                             Time:</strong> {selectedFlight.departureTime.substring(11, 19)}</p>
 *                                         <p><strong>Arrival
 *                                             Time:</strong> {addMinutesToTime(selectedFlight.departureTime.substring(11, 19), selectedFlight.duration)}
 *                                         </p>
 *                                         <p><strong>Duration:</strong> {selectedFlight.duration} Minutes</p>
 *                                         <p><strong>Price:</strong> ${formData.numPeople * 50}</p>
 *                                     </div>
 *                                 ) : (
 *                                     <p>No flight selected</p>
 *                                 )}
 *                             </div>
 *                             <form className="payment-form">
 *                                 <div className="input-group">
 *                                     <label htmlFor="card-number">Card Number:</label>
 *                                     <input type="text" id="card-number" placeholder="Enter card number"/>
 *                                 </div>
 *                                 <div className="input-group">
 *                                     <label htmlFor="exp-date">Expiration Date:</label>
 *                                     <input type="month" id="exp-date"/>
 *                                 </div>
 *                                 <div className="input-group">
 *                                     <label htmlFor="cvv">CVV:</label>
 *                                     <input type="text" id="cvv" placeholder="Enter CVV"/>
 *                                 </div>
 *                             </form>
 *                         </div>
 */



