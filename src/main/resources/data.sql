drop table if exists ticket;
drop table if exists flight;
DELETE FROM airport;
CREATE TABLE IF NOT EXISTS Airport (
                                       airportCode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (airportCode)
    );

INSERT INTO Airport (airportCode, city, country) VALUES
                                                     ('ATL', 'Atlanta', 'United States'),
                                                     ('LAX', 'Los Angeles', 'United States'),
                                                     ('ORD', 'Chicago', 'United States'),
                                                     ('DFW', 'Dallas/Fort Worth', 'United States'),
                                                     ('JFK', 'New York', 'United States'),
                                                     ('DEN', 'Denver', 'United States'),
                                                     ('SFO', 'San Francisco', 'United States'),
                                                     ('SEA', 'Seattle', 'United States'),
                                                     ('MIA', 'Miami', 'United States'),
                                                     ('LAS', 'Las Vegas', 'United States');
DELETE FROM Airplane;
CREATE TABLE IF NOT EXISTS Airplane (
                                        airplaneId BIGINT NOT NULL AUTO_INCREMENT,
                                        airline VARCHAR(255) NOT NULL,
    planeModel VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    PRIMARY KEY (airplaneId)
    );
INSERT INTO Airplane (airplaneId,airline, planeModel, capacity) VALUES
                                                         (01,'Delta Air Lines', 'Boeing 737', 160),
                                                         (02,'American Airlines', 'Airbus A320', 150),
                                                         (03,'United Airlines', 'Boeing 777', 300),
                                                         (04,'Southwest Airlines', 'Boeing 737', 175),
                                                         (05,'JetBlue Airways', 'Airbus A321', 200),
                                                         (06,'Alaska Airlines', 'Boeing 737', 180),
                                                         (07,'Spirit Airlines', 'Airbus A320', 145),
                                                         (08,'Frontier Airlines', 'Airbus A321', 230),
                                                         (09,'Hawaiian Airlines', 'Airbus A330', 278),
                                                         (10,'Allegiant Air', 'Airbus A319', 156);

DELETE FROM Passenger;
CREATE TABLE IF NOT EXISTS Passenger (
                                         passengerID BIGINT NOT NULL AUTO_INCREMENT,
                                         name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (passengerID)
    );
DELETE FROM passenger_payment;
CREATE TABLE IF NOT EXISTS passenger_payment (
                                                 passengerID BIGINT NOT NULL,
                                                 paymentID BIGINT NOT NULL,
                                                 PRIMARY KEY (passengerID, paymentID),
    FOREIGN KEY (passengerID) REFERENCES Passenger(passengerID),
    FOREIGN KEY (paymentID) REFERENCES Payment(paymentID)
    );
INSERT INTO Passenger (passengerID,name, phoneNumber, email) VALUES
                                                     (101,'John Doe', '123-456-7890', 'john.doe@example.com'),
                                                     (102,'Jane Smith', '234-567-8901', 'jane.smith@example.com'),
                                                     (103,'Alice Johnson', '345-678-9012', 'alice.johnson@example.com'),
                                                     (104,'Bob Brown', '456-789-0123', 'bob.brown@example.com'),
                                                     (105,'Charlie Davis', '567-890-1234', 'charlie.davis@example.com'),
                                                     (106,'Diana Evans', '678-901-2345', 'diana.evans@example.com');
DELETE FROM Payment;
CREATE TABLE IF NOT EXISTS Payment (
                                       paymentID BIGINT NOT NULL AUTO_INCREMENT,
                                       cardType VARCHAR(255) NOT NULL,
    cardNumber VARCHAR(255) NOT NULL,
    cardCode VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    PRIMARY KEY (paymentID)
    );
INSERT INTO Payment (cardType, cardNumber, cardCode, zipCode) VALUES
                                                                  ('Visa', '4111111111111111', '123', '30301'),
                                                                  ('MasterCard', '5500000000000004', '456', '90210'),
                                                                  ('American Express', '340000000000009', '789', '10001');

CREATE TABLE IF NOT EXISTS Flight (
                                      flightID BIGINT NOT NULL AUTO_INCREMENT,
                                      airplaneID BIGINT NOT NULL,
                                      departureAirportCode VARCHAR(255) NOT NULL,
    destinationAirportCode VARCHAR(255),
    departureTime TIMESTAMP NOT NULL,
    duration INT NOT NULL,
    flightStatus VARCHAR(255),
    PRIMARY KEY (flightID),
    FOREIGN KEY (airplaneID) REFERENCES Airplane(airplaneId),
    FOREIGN KEY (departureAirportCode) REFERENCES Airport(airportCode),
    FOREIGN KEY (destinationAirportCode) REFERENCES Airport(airportCode)
    );

INSERT INTO Flight (airplaneId, departureAirportCode, destinationAirportCode, departureTime, duration, flightStatus) VALUES
                                                                                                                         (01, 'ATL', 'LAX', '2024-11-20 08:00:00', 300, 'SCHEDULED'),
                                                                                                                         (02, 'JFK', 'ORD', '2024-11-20 09:00:00', 150, 'SCHEDULED'),
                                                                                                                         (03, 'SFO', 'SEA', '2024-11-20 10:00:00', 120, 'SCHEDULED'),
                                                                                                                         (04, 'DEN', 'DFW', '2024-11-20 11:00:00', 180, 'SCHEDULED'),
                                                                                                                         (05, 'MIA', 'ATL', '2024-11-20 12:00:00', 180, 'SCHEDULED'),
                                                                                                                         (06, 'SEA', 'LAS', '2024-11-20 13:00:00', 150, 'SCHEDULED'),
                                                                                                                         (07, 'LAX', 'DFW', '2024-11-20 14:00:00', 90, 'SCHEDULED'),
                                                                                                                         (08, 'ORD', 'ATL', '2024-11-20 15:00:00', 180, 'SCHEDULED');