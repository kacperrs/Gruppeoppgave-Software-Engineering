import JSONdb from "simple-json-db";
import crypto from "crypto";

const userDb = new JSONdb("server/db/users.json");
const parking = new JSONdb("server/db/parking.json");

// importer tabell filene
//import users from "./users.js";

// const users = userDb.get("users");
// Lage bruker database med uid som key ??
const users = {
  get: (uid) => {
    return uid ? userDb.get(uid) : userDb.JSON();
  },
  delete: (uid) => {
    return uid ? userDb.delete(uid) : false;
  },
  create: (userdata) => {
    userdata.isAdmin = false;

    const usersInDb = Object.keys(userDb.JSON()).length + 1;

    const uid = crypto
      .createHash("md5")
      .update(usersInDb.toString())
      .digest("hex");

    const user = JSON.stringify(userdata);
    // NEED TO CHECK IF USER ALLREADY IN DB!
    userDb.set(uid, user);
    return { id: uid };
  }
};

// eksporter dem her
export { users };

// Dette gjør slik at vi kan importere denne filen
// å få tilgang til de tabellen vi trenger.
