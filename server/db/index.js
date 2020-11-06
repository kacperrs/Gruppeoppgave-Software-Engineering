import JSONdb from "simple-json-db";
import crypto from "crypto";

// importer tabell filene
const userDb = new JSONdb("server/db/storage/users.json");
const spots = new JSONdb("server/db/storage/parking_spots.json");

// TODO:
// Lag et objekt, new dbFunction(database)
// slipper å duplisre kode samme logikk??

// BRUKERE
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
    // TODO: NEED TO CHECK IF USER ALLREADY IN DB!
    // Do that in controller??
    userDb.set(uid, userdata);
    return { id: uid };
  },
  update: (id, userdata) => {
    return userDb.set(id, userdata) ? false : true;
  }
};

// PARKING SPOTS
const parkingSpot = {
  get: (id) => {
    return id ? spots.get(id) : spots.JSON();
  },
  delete: (id) => {
    return id ? spots.delete(id) : false;
  },
  create: (spotdata) => {
    const parkingSpotsInDb = Object.keys(spots.JSON()).length + 1;

    const id = crypto
      .createHash("md5")
      .update(parkingSpotsInDb.toString())
      .digest("hex");

    spots.set(id, spotdata);
    return { id: id };
  }
};

// eksporter dem her
export { users, parkingSpot };
