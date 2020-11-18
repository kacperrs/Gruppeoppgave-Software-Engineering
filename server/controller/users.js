import Controller from "./models/controller.js";

export default class UserController extends Controller {
  constructor(database) {
    super(database.users, "Bruker");
    this.allData = database;

    Object.getOwnPropertyNames(UserController.prototype)
      .filter((propertyName) => propertyName !== "constructor")
      .forEach((method) => (this[method] = this[method].bind(this)));
  }

  spots(req, res) {
    const { id } = req.params;
    const spotArray = Object.entries(this.allData.spots.get());
    // res.status(200);
    res.send(spotArray.filter((spot) => spot[1].ownerId === id));
  }

  bookings(req, res) {
    const { id } = req.params;

    const allBookings = Object.entries(this.allData.booking.get());
    const userBookings = allBookings.filter((booking) => booking[1].uid === id);

    res.send(userBookings);
  }

  earnigns(req, res) {
    const { id } = req.params;
    const allBookings = Object.entries(this.allData.booking.get());
    const bookingsOnMySpots = allBookings.filter(
      (booking) => booking[1].spot.ownerId === id
    );
    const earnings = bookingsOnMySpots.reduce((sum, i) => sum + i[1].cost, 0);
    res.send({ sum: earnings });
  }
}
