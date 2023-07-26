import React from "react";

const ReservationForm = ({
  reservation,
  submitHandler,
  changeHandler,
  cancelHandler,
}) => {
  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <h3>Create Reservation</h3>
          <form onSubmit={submitHandler} className="card">
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="first_name"
                style={{ color: "blue", fontSize: "18px" }}
              >
                First Name:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  id="first_name"
                  name="first_name"
                  required={true}
                  value={reservation.first_name}
                  onChange={changeHandler}
                  placeholder="Enter guest's first name"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="last_name"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Last Name:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  id="last_name"
                  name="last_name"
                  required={true}
                  value={reservation.last_name}
                  onChange={changeHandler}
                  placeholder="Enter guest's last name"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="mobile_number"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Phone number:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="number"
                  id="mobile_number"
                  name="mobile_number"
                  required={true}
                  value={reservation.mobile_number}
                  onChange={changeHandler}
                  placeholder="Enter guest's phone number (e.g., 123-456-7890)"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="reservation_date"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Reservation date:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  required={true}
                  value={reservation.reservation_date}
                  onChange={changeHandler}
                  placeholder="Enter reservation date (YYYY-MM-DD)"
                  pattern="\d{4}-\d{2}-\d{2}"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="reservation_time"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Reservation time:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  required={true}
                  value={reservation.reservation_time}
                  onChange={changeHandler}
                  placeholder="Enter reservation time (HH:MM)"
                  pattern="[0-9]{2}:[0-9]{2}"
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <label
                className="form-label col-sm-4"
                htmlFor="people"
                style={{ color: "blue", fontSize: "18px" }}
              >
                Number of guests:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="number"
                  id="people"
                  name="people"
                  required={true}
                  value={reservation.people}
                  onChange={changeHandler}
                  placeholder="Enter the number of guests (minimum: 1)"
                  min={1}
                  style={{ borderColor: "blue" }}
                />
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <div className="col-sm-8 offset-sm-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "blue", color: "white" }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-3"
                  onClick={cancelHandler}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;