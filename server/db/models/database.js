export default class Database {
  constructor(dbUsers, dbSpots, dbBooking, dbTest) {
    this.users = dbUsers;
    this.spots = dbSpots;
    this.booking = dbBooking;
    this.dbTest = dbTest;
  }
}
