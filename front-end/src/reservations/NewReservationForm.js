import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./reservationForm";

const NewReservationForm = () => {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  const cancelHandler = () => {
    history.goBack();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    const abortController = new AbortController();
    reservation.people = Number(reservation.people);

    try {
      const response = await createReservation(
        reservation,
        abortController.signal
      );
      history.push(
        `/dashboard?date=${formatAsDate(response.reservation_date)}`
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
      }
    }
    return () => abortController.abort();
  };

  const changeHandler = ({ target: { name, value } }) => {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  };

  return (
    <>
      <ErrorAlert error={error} />
      <ReservationForm
        reservation={reservation}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        cancelHandler={cancelHandler}
      />
    </>
  );
};

export default NewReservationForm;