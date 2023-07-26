const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

function list() {
  return knex("reservations")
    .select("*")
    .whereIn("status", ["seated", "booked"])
    .orderBy("reservation_date", "asc")
    .orderBy("reservation_time", "asc");
}

function listByDate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereIn("status", ["seated", "booked"])
    .orderBy("reservation_time", "asc");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function updateStatus(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update({ status: updatedReservation.status }, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  create,
  list,
  listByDate,
  read,
  search,
  update,
  updateStatus,
};