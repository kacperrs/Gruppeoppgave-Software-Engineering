import JSONdb from "simple-json-db";
import Repository from "./models/repository.js";
import Database from "./models/database.js";

const userDb = new JSONdb("db/storage/users.json");
const spots = new JSONdb("db/storage/parking_spots.json");
const booking = new JSONdb("db/storage/booking.json");

const dbTest = {
  users: userDb,
  spots: spots,
  booking: booking
};

const dbUsers = new Repository(userDb);
const dbSpots = new Repository(spots);
const dbBooking = new Repository(booking);

const database = new Database(dbUsers, dbSpots, dbBooking, dbTest);
export default database;
