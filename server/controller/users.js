import { users } from "../db/index.js";

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUser = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  res.send(users[id]);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  // slett bruker i databasen
  users.splice(id, 1);

  res.send(`Bruker med id ${id} ble fjernet fra databasen.`);
};

export const createUser = (req, res) => {
  // post-data fra front end
  const user = req.body;

  res.send(`Bruker med navn ${user.firstname} lagt til i databasen.`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;

  const user = users[id];

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (email) user.email;
};
