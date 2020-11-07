import { dbSpots } from "../db/index.js";

const spots = {
  all: (req, res) => {
    res.send(dbSpots.get());
  },
  get: (req, res) => {
    const { id } = req.params;
    if (dbSpots.get(id)) res.send(dbSpots.get(id));
    else {
      res.status(204);
      res.send();
    }
  },

  delete: (req, res) => {
    const { id } = req.params;

    if (dbSpots.delete(id)) {
      res.status(200);
      res.json({
        message: `Plass med id ${id} ble fjernet fra databasen.`
      });
    } else {
      res.status(404);
      res.json({
        message: `Plass med id ${id} finnes ikke i databasen.`
      });
    }
  },

  create: (req, res) => {
    const formData = req.body;

    const spot = {
      ownerId: formData.ownerId,
      address: formData.address,
      zipcode: formData.zipcode,
      hour_price: formData.hour_price,
      day_price: formData.day_price,
      spots: formData.spots
    };

    const newSpot = dbSpots.create(spot);
    // set status code if success
    res.status(newSpot ? 201 : 500);
    res.setHeader("Content-Type", /json/);
    res.send(newSpot);
  },
  getSpotsZipcode: (req, res) => {
    const { zipcode } = req.params;
    const spotArray = Object.entries(dbSpots.get());

    res.send(spotArray.filter((spot) => spot[1].zipcode === zipcode));
  }
};

/*
// NEED FIX HERE
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;

  const user = users[id];

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (email) user.email;
};
*/

export { spots };
