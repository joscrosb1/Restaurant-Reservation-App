const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const service = require("./reservations.service");

//Validations

function validateDataProperty(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Request body must include a 'data' property" });
}

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
const validateRequiredProperties = hasProperties(requiredProperties);

function validateNumberOfPeople(req, res, next) {
  const people = Number(req.body.data.people);
  if (people < 1) {
    return next({
      status: 400,
      message: "Number of people must be a positive integer",
    });
  }
  next();
}

function validatePeopleIsNumber(req, res, next) {
  const people = req.body.data.people;
  if (typeof people !== "number") {
    return next({
      status: 400,
      message: "Number of people must be a valid number",
    });
  }
  next();
}

function validateTimeFormat(req, res, next) {
  const time = req.body.data.reservation_time;
  const validTimeFormat = /^[0-9]{2}:[0-9]{2}$/;

  if (!validTimeFormat.test(time)) {
    return next({
      status: 400,
      message: "Invalid reservation_time format. Time format should be 'HH:MM'",
    });
  }
  next();
}

function validateDateFormat(req, res, next) {
  const date = req.body.data.reservation_date;
  const validDateFormat = /^\d{4}-\d{2}-\d{2}$/;

  if (!validDateFormat.test(date)) {
    return next({
      status: 400,
      message:
        "Invalid reservation_date format. Date format should be 'YYYY-MM-DD'",
    });
  }
  next();
}

function validateReservationTimeframe(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const reservationDateTime = new Date(
    `${reservation_date} ${reservation_time}`
  );
  const currentDateTime = new Date();

  if (reservationDateTime < currentDateTime) {
    return next({
      status: 400,
      message: "Reservation must be for a future date and time",
    });
  }

  const reservationDay = reservationDateTime.getDay();
  if (reservationDay === 2) {
    return next({
      status: 400,
      message: "The restaurant is closed on Tuesdays",
    });
  }

  const reservationTime =
    reservationDateTime.getHours() * 100 + reservationDateTime.getMinutes();
  if (reservationTime < 1030 || reservationTime > 2130) {
    return next({
      status: 400,
      message: "The reservation_time must be between 10:30 AM and 9:30 PM",
    });
  }

  next();
}

function validateBookedStatus(req, res, next) {
  const { status } = req.body.data;

  if (status && status !== "booked") {
    return next({
      status: 400,
      message: `Cannot make reservations with a status of '${status}'`,
    });
  }
  next();
}

async function validateReservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({ status: 404, message: `Reservation ${reservation_id} not found` });
}

const validStatusValues = ["booked", "seated", "finished", "cancelled"];
function validateStatus(req, res, next) {
  const { status } = req.body.data;
  if (!validStatusValues.includes(status)) {
    return next({
      status: 400,
      message: "Reservation status value is unknown",
    });
  }
  next();
}

function validateNotFinished(req, res, next) {
  const { status } = res.locals.reservation;
  if (status !== "booked" && status !== "seated") {
    return next({
      status: 400,
      message: "Cannot update a finished reservation",
    });
  }
  next();
}

//Operations

async function createReservation(req, res) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

function getReservation(req, res) {
  res.json({ data: res.locals.reservation });
}

async function updateReservation(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const data = await service.update(updatedReservation);
  res.json({ data });
}

async function updateReservationStatus(req, res, next) {
  const status = req.body.data.status;
  const { reservation_id } = res.locals.reservation;

  const updatedReservation = {
    reservation_id: reservation_id,
    status: status,
  };

  const data = await service.updateStatus(updatedReservation);
  res.json({ data });
}

async function listReservations(req, res) {
  const { date, mobile_number } = req.query;

  if (date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else if (mobile_number) {
    const data = await service.search(mobile_number);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

module.exports = {
  create: [
    validateDataProperty,
    validateRequiredProperties,
    validateNumberOfPeople,
    validatePeopleIsNumber,
    validateDateFormat,
    validateTimeFormat,
    validateReservationTimeframe,
    validateBookedStatus,
    asyncErrorBoundary(createReservation),
  ],
  read: [asyncErrorBoundary(validateReservationExists), getReservation],
  update: [
    asyncErrorBoundary(validateReservationExists),
    validateDataProperty,
    validateRequiredProperties,
    validateNumberOfPeople,
    validatePeopleIsNumber,
    validateDateFormat,
    validateTimeFormat,
    validateReservationTimeframe,
    validateBookedStatus,
    asyncErrorBoundary(updateReservation),
  ],
  updateStatus: [
    asyncErrorBoundary(validateReservationExists),
    validateStatus,
    validateNotFinished,
    asyncErrorBoundary(updateReservationStatus),
  ],
  list: asyncErrorBoundary(listReservations),
};