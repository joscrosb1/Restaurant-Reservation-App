import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { cancelReservation } from "../utils/api.js";

const ReservationCancel = ({ reservation_id }) => {
  const [error, setError] = useState(null);

  const clickHandler = async (event) => {
    event.preventDefault();
    setError(null);

    const confirmation = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirmation) {
      try {
        await cancelReservation(reservation_id);
        window.location.reload();
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <button
        className="btn btn-secondary custom-btn"
        data-reservation-id-cancel={reservation_id}
        onClick={clickHandler}
        required
        style={{ backgroundColor: "red", color: "white" }}
      >
        Cancel
      </button>
    </div>
  );
};

export default ReservationCancel;