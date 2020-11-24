import Controller from "./models/controller.js";

export default class SpotsController extends Controller {
  constructor(database) {
    super(database.spots, "Plass");
    this.allData = database;

    Object.getOwnPropertyNames(SpotsController.prototype)
      .filter((propertyName) => propertyName !== "constructor")
      .forEach((method) => (this[method] = this[method].bind(this)));
  }

  getSpotsZipcode(req, res) {
    const { zipcode } = req.params;
    const spotArray = Object.entries(this.allData.spots.get());

    res.send(spotArray.filter((spot) => spot[1].zipcode === zipcode));
  }

  book(req, res) {
    // Random generate faild payment 20%
    let willPaymentFail = Math.random() <= 0.8;

    if (willPaymentFail) {
      const payment = this.allData.booking.create(req.body);
      res.status(200);
      res.json(payment);
    } else res.sendStatus(402);
  }

  bookings(req, res) {
    const { id } = req.params;

    const allBookings = Object.values(this.allData.booking.get());
    const spotBookings = allBookings.filter(
      (booking) =>
        booking.spot.id === id && new Date(booking.date.start) > new Date()
    );
    const test = spotBookings.map((booking) => booking.date);
    res.json(test);
  }
}
