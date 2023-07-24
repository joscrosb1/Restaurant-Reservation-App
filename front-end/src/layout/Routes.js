import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Import components
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import Seat from "../reservations/Seat";
import SearchReservation from "../reservations/SearchReservation";
import EditReservation from "../reservations/EditReservation";
import NewTable from "../tables/NewTable";
import NotFound from "./NotFound";

// Import utility functions
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      {/* Redirect root path to the dashboard */}
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      {/* Redirect /reservations to the dashboard */}
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      {/* Dashboard route */}
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      {/* New reservation route */}
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      {/* Edit reservation route */}
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      {/* Seat reservation route */}
      <Route path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      {/* New table route */}
      <Route path="/tables/new">
        <NewTable />
      </Route>
      {/* Search reservation route */}
      <Route path="/search">
        <SearchReservation />
      </Route>
      {/* Default route for not found pages */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
