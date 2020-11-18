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
    // Random generate faild payment
    let willPaymentFail = Math.floor(Math.random() * 2);

    if (willPaymentFail) {
      this.allData.booking.create(req.body);

      res.sendStatus(200);
    } else res.sendStatus(402);
  }
}
