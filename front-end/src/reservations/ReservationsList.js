import React from "react";
import ReservationCancel from './ReservationCancel';


const ReservationsList = ({ reservations, date, cancelHandler }) => {
  const handleCancelReservation = async (reservationId) => {
    if (cancelHandler) {
      await cancelHandler(reservationId);
    }
  };

  const reservationCards = reservations.map((reservation) => (
    <div
      key={reservation.reservation_id}
      className="card mb-4"
      style={{ width: "48%" }}
    >
      <div className="card-header bg-light">
        <h5 className="card-title d-flex justify-content-between">
          <span>
            {reservation.first_name} {reservation.last_name}
          </span>
          <span>{reservation.reservation_time}</span>
        </h5>
      </div>
      <div className="card-body">
        <p className="card-text">
          Mobile Number: {reservation.mobile_number}
          <br />
          Reservation Date: {reservation.reservation_date}
          <br />
          Number of People: {reservation.people}
          <br />
          Status:{" "}
          <span data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </span>
        </p>
        {reservation.status === "booked" && (
          <>
            <div className="mt-auto">
              <div className="d-flex justify-content-end">
                <a
                  className="btn btn-primary mx-1"
                  href={`/reservations/${reservation.reservation_id}/edit`}
                >
                  Edit
                </a>
                <ReservationCancel
                  reservation_id={reservation.reservation_id}
                  cancelHandler={handleCancelReservation}
                />
              </div>
              <div className="d-flex justify-content-between">
                <a
                  className="btn btn-success btn-block"
                  href={`/reservations/${reservation.reservation_id}/seat`}
                >
                  Seat
                </a>
              </div>
            </div>
          </>
        )}
        {reservation.status === "seated" && (
          <div className="mt-auto">
            <div className="d-flex justify-content-between">
              <button className="btn btn-warning btn-block" disabled>
                Seated
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ));

  if (reservations.length > 0) {
    return <div className="d-flex flex-wrap">{reservationCards}</div>;
  }

  return (
    <div
      className="container alert alert-dark"
      role="alert"
      style={{ minWidth: "100%" }}
    >
      {`No reservations found for ${date}.`}
    </div>
  );
};

export default ReservationsList;