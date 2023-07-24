# Restaurant-Reservation-App


A full-stack restaurant reservation management application designed for restaurant owners and employees. It enables users to easily create, view, and edit reservations while also managing table seating settings.

## Live Project

- ([Frontend Deployment](https://restaurant-reservation-app-frontend-2akq.onrender.com)
- ([Backend Deployment](https://restaurant-reservation-app-backend-m3o9.onrender.com)

## Technology Used

**Frontend:**

- JavaScript
- React
- React Router
- HTML
- CSS
- Bootstrap

**Backend:**

- Node.js
- Express
- Knex
- PostgreSQL

## Frontend Overview

### Dashboard View
![Dashboard View](dashboard.png)

### Create a New Reservation
![Create Reservation](create_reservation.png)

### Create a New Table
![Create Table](create_table.png)

### Seat a Reservation
![Seat Reservation](select_table.png)

### Find a Reservation
![Find Reservation](<img width="958" alt="Find" src="https://github.com/joscrosb1/Restaurant-Reservation-App/assets/116053884/9ed594e5-04c5-4bc9-958f-7fa67d0e62de">
)



## Backend Overview

The API allows for the following routes:

# Tables Route

| Method | Route                      | Description                               |
| ------ | -------------------------- | ----------------------------------------- |
| POST   | /tables                    | Create a new table                        |
| GET    | /tables                    | List all tables                           |
| GET    | /tables/:table_id          | List a table by ID                        |
| PUT    | /tables/:table_id/seat     | Assign a table to a reservation           |
| DELETE | /tables/:table_id/seat     | Remove a reservation from a table         |

# Reservation Route

| Method | Route                            | Description                                      |
| ------ | -------------------------------- | ------------------------------------------------ |
| GET    | /reservations                    | List all reservations for the current date        |
| GET    | /reservations?date=YYYY-MM-DD    | List all reservations for the specified date      |
| POST   | /reservations                    | Create a new reservation                           |
| GET    | /reservations/:reservation_id    | List a reservation by ID                           |
| PUT    | /reservations/:reservation_id    | Update a reservation                               |
| PUT    | /reservations/:reservation_id/status | Update reservation status                         |
                |

## Installation

1. Clone this repository: `git clone https://github.com/joscrosb1/Restaurant-Reservation-App.git`.
2. Navigate to the project directory using `cd Restaurant-Reservation-App`.
3. Run `cp ./back-end/.env.sample ./back-end/.env`.
4. Update the `./back-end/.env` file with the connection URLs to your database instance.
5. Run `cp ./front-end/.env.sample ./front-end/.env`. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

## Running Tests

This project includes a set of tests that can be run using the command line. To run the tests, use the command `npm test`.

## User Stories

- **US-01 Create and list reservations:** As a restaurant manager, I want to create a new reservation when a customer calls, so that I know how many customers will arrive at the restaurant on a given day.

- **US-02 Create reservation on a future, working date:** As a restaurant manager, I only want to allow reservations to be created on a day when we are open, so that users do not accidentally create a reservation for days when we are closed.

- **US-03 Create reservation within eligible timeframe:** As a restaurant manager, I only want to allow reservations to be created during business hours, up to 60 minutes before closing, so that users do not accidentally create a reservation for a time we cannot accommodate.

- **US-04 Seat reservation:** As a restaurant manager, when a customer with an existing reservation arrives at the restaurant, I want to seat (assign) their reservation to a specific table, so that I know which tables are occupied and free.

- **US-05 Finish an occupied table:** As a restaurant manager, I want to free up an occupied table when the guests leave, so that I can seat new guests at that table.

- **US-06 Reservation Status:** As a restaurant manager, I want a reservation to have a status of either booked, seated, or finished, so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

- **US-07 Search for a reservation by phone number:** As a restaurant manager, I want to search for a reservation by phone number (partial or complete), so that I can quickly access a customer's reservation when they call about their reservation.

- **US-08 Change an existing reservation:** As a restaurant manager, I want to be able to modify a reservation if a customer calls to change or cancel their reservation, so that reservations are accurate and current.

## Author

This project was created by Joshua Crosby in association with Thinkful.

