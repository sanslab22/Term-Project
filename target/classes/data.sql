drop table if exists ticket;
drop table if exists flight;
DROP TABLE IF EXISTS Flight;
DROP TABLE IF EXISTS Airplane;
DROP TABLE IF EXISTS Airport;
DROP TABLE IF EXISTS passenger_payment;
--DROP TABLE IF EXISTS passenger;
DROP TABLE IF EXISTS payment;


--DELETE FROM airport;
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
--DELETE FROM Airplane;
CREATE TABLE IF NOT EXISTS Airplane (
                                        airplaneId BIGINT NOT NULL AUTO_INCREMENT,
                                        airline VARCHAR(255) NOT NULL,
    planeModel VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    PRIMARY KEY (airplaneId)
    );
INSERT INTO Airplane (airline, planeModel, capacity) VALUES
                                                         ('Delta Air Lines', 'Boeing 737', 160),
                                                         ('American Airlines', 'Airbus A320', 150),
                                                         ('United Airlines', 'Boeing 777', 300),
                                                         ('Southwest Airlines', 'Boeing 737', 175),
                                                         ('JetBlue Airways', 'Airbus A321', 200),
                                                         ('Alaska Airlines', 'Boeing 737', 180),
                                                         ('Spirit Airlines', 'Airbus A320', 145),
                                                         ('Frontier Airlines', 'Airbus A321', 230),
                                                         ('Hawaiian Airlines', 'Airbus A330', 278),
                                                         ('Allegiant Air', 'Airbus A319', 156);

CREATE TABLE IF NOT EXISTS Passenger (
                                         passengerID BIGINT NOT NULL AUTO_INCREMENT,
                                         name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (passengerID)
    );
CREATE TABLE IF NOT EXISTS Payment (
                                       paymentID BIGINT NOT NULL AUTO_INCREMENT,
                                       cardType VARCHAR(255) NOT NULL,
    cardNumber VARCHAR(255) NOT NULL,
    cardCode VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    PRIMARY KEY (paymentID)
    );
DELETE FROM Payment;

--DELETE FROM Passenger;
CREATE TABLE IF NOT EXISTS passenger_payment (
                                                 passengerID BIGINT NOT NULL,
                                                 paymentID BIGINT NOT NULL,
                                                 PRIMARY KEY (passengerID, paymentID),
    FOREIGN KEY (passengerID) REFERENCES Passenger(passengerID),
    FOREIGN KEY (paymentID) REFERENCES Payment(paymentID)
    );
DELETE FROM passenger_payment;
INSERT INTO Passenger (name, phoneNumber, email) VALUES
                                                     ('John Doe', '123-456-7890', 'john.doe@example.com'),
                                                     ('Jane Smith', '234-567-8901', 'jane.smith@example.com'),
                                                     ('Alice Johnson', '345-678-9012', 'alice.johnson@example.com'),
                                                     ('Bob Brown', '456-789-0123', 'bob.brown@example.com'),
                                                     ('Charlie Davis', '567-890-1234', 'charlie.davis@example.com'),
                                                     ('Diana Evans', '678-901-2345', 'diana.evans@example.com');
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