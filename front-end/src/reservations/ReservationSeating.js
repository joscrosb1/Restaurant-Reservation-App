import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, seatReservation } from "../utils/api";

const ReservationSeating = () => {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState("");
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await listTables();
        setTables(tables);
      } catch (error) {
        setError(error);
      }
    };

    setError(null);
    fetchTables();

    return () => setError(null);
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    const tableId = Number(formData.table_id);
    const reservationId = Number(reservation_id);

    try {
      await seatReservation(tableId, reservationId);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  const changeHandler = ({ target: { name, value } }) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const cancelHandler = () => {
    history.goBack();
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-3">
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <h2 className="card-title text-center">Seat Reservation</h2>
                <div className="form-group">
                  <label htmlFor="table_id">Table number:</label>
                  <select
                    id="table_id"
                    name="table_id"
                    onChange={changeHandler}
                    value={formData.table_id || ""}
                    className="form-control"
                  >
                    <option value="">Select a table</option>
                    {tables.map((table) => (
                      <option key={table.table_id} value={table.table_id}>
                        {table.table_name} - {table.capacity}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary custom-btn"
                    style={{ backgroundColor: "blue", color: "white" }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-3 custom-btn"
                    onClick={cancelHandler}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <ErrorAlert error={error} />
      </div>
    </div>
  );
};

export default ReservationSeating;