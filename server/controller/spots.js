import { parkingSpot } from "../db/index.js";

const spots = {
  all: (req, res) => {
    res.send(parkingSpot.get());
  },
  get: (req, res) => {
    const { id } = req.params;
    if (parkingSpot.get(id)) res.send(parkingSpot.get(id));
    else {
      res.status(204);
      res.send();
    }
  },

  delete: (req, res) => {
    const { id } = req.params;
    if (parkingSpot.delete(id)) {
      res.send(`Plass med id ${id} ble fjernet fra databasen.`);
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

    const newSpot = parkingSpot.create(spot);
    // set status code if success
    res.status(newSpot ? 201 : 500);
    res.setHeader("Content-Type", /json/);
    res.send(newSpot);
  },
  getSpotsZipcode : (req, res) =>{
    const { zipcode } = req.params;
    const spotArray = Object.entries(parkingSpot.get());

    res.send(spotArray.filter((spot) => spot[2].zipcode === zipcode));
  }
};
/* const getSpotsZipcode = (req, res) =>{
  const { zipcode } = req.params;
  const spotArray = Object.entries(parkingSpot.get());

  res.send(spotArray.filter((spot) => spot[2].zipcode === zipcode));
}

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
