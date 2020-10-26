import { users } from "../db/index.js";

export const processLoginData = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  res.sendStatus(verifyUsernamePassword(email, password) ? 200 : 400);
};

const verifyUsernamePassword = (email, password) => {
  const userArray = Object.values(users.get());

  return userArray.find((user) => {
    if (user.email === email && user.password === password) return true;
  });
};
