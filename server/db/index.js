import JSONdb from "simple-json-db";
import crypto from "crypto";

// importer tabell filene
const userDb = new JSONdb("db/storage/users.json");
const spots = new JSONdb("db/storage/parking_spots.json");

class dbFunctions {
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

const users = new dbFunctions(userDb);
const parkingSpot = new dbFunctions(spots);

// eksporter dem her
export { users, parkingSpot };
