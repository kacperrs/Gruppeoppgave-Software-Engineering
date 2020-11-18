import JSONdb from "simple-json-db";
import repository from "./models/repository.js";

const userDb = new JSONdb("db/storage/users.json");
const spots = new JSONdb("db/storage/parking_spots.json");
const booking = new JSONdb("db/storage/booking.json");

const dbTest = {
  users: userDb,
  spots: spots,
  booking: booking
};

const dbUsers = new repository(userDb);
const dbSpots = new repository(spots);
const dbBooking = new repository(booking);

export { dbUsers, dbSpots, dbBooking, dbTest };
