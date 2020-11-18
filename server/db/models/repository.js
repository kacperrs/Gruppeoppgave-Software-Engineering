import crypto from "crypto";

export default class Repository {
  constructor(database) {
    this.database = database;
  }

  get(id) {
    return id ? this.database.get(id) : this.database.JSON();
  }

  delete(id) {
    return id ? this.database.delete(id) : false;
  }

  create(data) {
    const objectsInDb = Object.keys(this.database.JSON()).length + 1;

    const id = crypto
      .createHash("md5")
      .update(objectsInDb.toString())
      .digest("hex");

    this.database.set(id, data);
    return { id: id };
  }

  update(id, data) {
    return this.database.set(id, data) ? false : true;
  }
}
