import JSONdb from "simple-json-db";
import crypto from "crypto";

// importer tabell filene
const userDb = new JSONdb("db/storage/users.json");
const spots = new JSONdb("db/storage/parking_spots.json");
const paymentDb = new JSONdb("server/db/storage/payments.json");

const dbTest = {
  users: userDb,
  spots: spots
};

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

//BETALINGER
const dbPayment = {
  get: (id) => {
    return id ? paymentDb.get(id) : paymentDb.JSON();
  },
  delete: (id) => {
    return id ? paymentDb.delete(id) : false;
  },
  create: (paymentInfo) => {
    const paymentsDb = Object.keys(paymentDb.JSON()).length + 1;

    const payid = crypto
      .createHash("md5")
      .update(paymentsDb.toString())
      .digest("hex");

    paymentDb.set(payid, paymentInfo);
    return { id: payid };
  },
  update: (payid, paymentInfo) => {
    return paymentDb.set(payid, paymentInfo) ? false : true;
  }
};

const dbUsers = new dbFunctions(userDb);
const dbSpots = new dbFunctions(spots);

// eksporter dem her
export { dbUsers, dbSpots, dbTest, dbPayment };
