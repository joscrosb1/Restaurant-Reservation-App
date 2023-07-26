import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./reservationForm";
import ErrorAlert from "../layout/ErrorAlert";

const EditCurrentReservation = () => {
  const history = useHistory();

  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({});
  const [error, setError] = useState(null);

  // Load reservation
  useEffect(() => {
    setReservation({});

    const abortController = new AbortController();

    async function loadReservation() {
      try {
        const loadedReservation = await readReservation(
          reservation_id,
          abortController.signal
        );
        setReservation(loadedReservation);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
    }

    loadReservation();

    return () => abortController.abort();
  }, [reservation_id]);

  const changeHandler = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setError(null);

    const abortController = new AbortController();
    reservation.people = Number(reservation.people);

    console.log(reservation); // Log the value of reservation before updating

    try {
      // Ensure reservation_time is in 'HH:MM' format
      const reservationTimeParts = reservation.reservation_time.split(":");
      const formattedReservationTime = `${reservationTimeParts[0]}:${reservationTimeParts[1]}`;

      const updatedReservation = await updateReservation(
        {
          ...reservation,
          reservation_time: formattedReservationTime,
        },
        abortController.signal
      );
      history.push(
        `/dashboard?date=${formatAsDate(updatedReservation.reservation_date)}`
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }

    abortController.abort();
  };

  const cancelHandler = () => {
    history.goBack();
  };

  if (reservation.reservation_id) {
    return (
      <div>
        <h2>Edit reservation {reservation.reservation_id}</h2>
        <ErrorAlert error={error} />
        <ReservationForm
          reservation={reservation}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        />
      </div>
    );
  }

  return "Loading...";
};

export default EditCurrentReservation;