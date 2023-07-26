import React, { useState } from "react";
import { searchReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";

const SearchReservations = () => {
  const [inputData, setInputData] = useState("");
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await searchReservations(inputData);
      setReservations(response);
      setInputData("");
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (event) => {
    setInputData(event.target.value);
  };

  const handleResetError = () => {
    setError(null);
  };

  return (
    <main>
      <div className="col-lg-6 form-group mx-auto">
        <div className="row my-3 justify-content-center">
          <h2 className="custom-heading">Find reservation</h2>
          <ErrorAlert error={error} resetError={handleResetError} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row input-group mb-3 justify-content-center">
            <input
              type="text"
              className="custom-input form-control"
              name="mobile_number"
              placeholder="Enter a customer's phone number"
              aria-label="mobile_number"
              aria-describedby="custom-addon"
              required
              value={inputData}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="custom-button btn btn-primary" id="custom-addon" type="submit">
                Find
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="container-fluid col-lg-6">
        <div className="row mb-3">
          <h4 className="custom-subheading">Search Result</h4>
        </div>
        {reservations.length > 0 ? (
          <div className="row mb-3">
            <ReservationsList reservations={reservations} />
          </div>
        ) : (
          <div className="row mb-3 alert alert-dark text-center custom-alert" role="alert">
            No reservations found
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchReservations;