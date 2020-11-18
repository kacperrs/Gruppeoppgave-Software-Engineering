export default class Controller {
  constructor(database, type) {
    this.database = database;
    this.type = type;

    Object.getOwnPropertyNames(Controller.prototype)
      .filter((propertyName) => propertyName !== "constructor")
      .forEach((method) => (this[method] = this[method].bind(this)));
  }

  all(req, res) {
    res.json(this.database.get());
  }

  get(req, res) {
    const { id } = req.params;
    if (this.database.get(id)) res.send(this.database.get(id));
    else res.sendStatus(204);
  }

  delete(req, res) {
    const { id } = req.params;

    if (this.database.delete(id)) {
      res.status(200);
      res.json({
        message: `${this.type} med id ${id} ble fjernet fra databasen.`
      });
    } else {
      res.status(404);
      res.json({
        message: `${this.type} med id ${id} finnes ikke i databasen.`
      });
    }
  }

  create(req, res) {
    const newSpot = this.database.create(req.body);
    res.status(newSpot ? 201 : 500);
    res.json(newSpot);
  }

  update(req, res) {
    const uid = req.params.id;
    const userdata = req.body;

    if (this.database.get(uid)) {
      const updateUser = this.database.update(uid, userdata);
      res.sendStatus(updateUser ? 200 : 500);
    } else {
      res.staus(404);
      res.json({
        message: `${this.type} med id ${uid} finnes ikke i databasen`
      });
    }
  }
}
