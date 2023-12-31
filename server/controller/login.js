import database from "../db/index.js";

export default (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginSuccess = verifyUsernamePassword(email, password);

  res.status(loginSuccess ? 200 : 400);
  res.send(loginSuccess);
};

const verifyUsernamePassword = (email, password) => {
  const userArray = Object.entries(database.users.get());

  const foundUser = userArray.find((user, i) => {
    if (user[1].email === email && user[1].password === password) return true;
  });

  return foundUser ? foundUser[0] : false;
};
