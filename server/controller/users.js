import { dbSpots, dbUsers } from "../db/index.js";

const users = {
  all: (req, res) => {
    res.send(dbUsers.get());
  },
  get: (req, res) => {
    const { id } = req.params;
    if (dbUsers.get(id)) res.send(dbUsers.get(id));
    else {
      res.status(204);
      res.send();
    }
  },
  delete: (req, res) => {
    const { id } = req.params;
    // slett bruker i databasen
    if (dbUsers.delete(id)) {
      res.status(200);
      res.json({
        message: `Bruker med id ${id} ble fjernet fra databasen.`
      });
    } else {
      res.status(404);
      res.json({
        message: `Bruker med id ${id} finnes ikke i databasen.`
      });
    }
  },
  create: (req, res) => {
    // post-data fra front end
    const formData = req.body;

    // trengs dette? Mulig å bare poste req.body?
    const user = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      isFirm: formData.isFirm == "true" ? true : false
    };

    // create new user in db
    const newUser = dbUsers.create(user);
    // set status code if success
    res.status(newUser ? 201 : 500);
    res.setHeader("Content-Type", /json/);
    res.send(newUser);
  },
  spots: (req, res) => {
    const { id } = req.params;
    const spotArray = Object.entries(dbSpots.get());
    // res.status(200);
    res.send(spotArray.filter((spot) => spot[1].ownerId === id));
  },
  update: (req, res) => {
    const uid = req.params.id;
    const userdata = req.body;

    // Sjekket at uid faktisk er en bruker i db - ellers lages en ny bruker!
    const updateUser = dbUsers.update(uid, userdata);

    res.sendStatus(updateUser ? 200 : 500);
  }
};

export { users };
