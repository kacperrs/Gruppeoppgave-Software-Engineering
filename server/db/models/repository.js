import crypto from "crypto";

export default class repository {
  constructor(database) {
    this.get = (id) => (id ? database.get(id) : database.JSON());
    this.delete = (id) => (id ? database.delete(id) : false);
    this.create = (data) => {
      const objectsInDb = Object.keys(database.JSON()).length + 1;

      const id = crypto
        .createHash("md5")
        .update(objectsInDb.toString())
        .digest("hex");

      database.set(id, data);
      return { id: id };
    };
    this.update = (id, data) => (database.set(id, data) ? false : true);
  }
}
