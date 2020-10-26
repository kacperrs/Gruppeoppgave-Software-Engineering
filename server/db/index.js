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

    const user = JSON.stringify(userdata);
    // TODO: NEED TO CHECK IF USER ALLREADY IN DB!
    // Do that in controller??
    userDb.set(uid, user);
    return { id: uid };
  }
};

// PARKING SPOTS
const parkingSpot = {
  get: (uid) => {
    return uid ? spots.get(uid) : spots.JSON();
  },
  delete: (uid) => {
    return uid ? spots.delete(uid) : false;
  },
  create: (spotdata) => {
    const parkingSpotsInDb = Object.keys(spots.JSON()).length + 1;

    const uid = crypto
      .createHash("md5")
      .update(parkingSpotsInDb.toString())
      .digest("hex");

    const spot = JSON.stringify(spotdata);
    spots.set(uid, spot);
    return { id: uid };
  }
};

// eksporter dem her
export { users, parkingSpot };
