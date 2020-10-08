const users = [
  {
    username: "admin",
    password: "password",
  },
  {
    username: "bruker",
    password: "welcome",
  },
];

export const processLoginData = (req, res) => {
  const userCredentials = req.body;
  if (userCredentials) console.log(userCredentials);

  if (
    verifyUsernamePassword(userCredentials.username, userCredentials.password)
  ) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

function verifyUsernamePassword(username, password) {
  console.log("verify:", username, password);
  users.find((obj, i) => {
    if (obj.username === username && obj.password === password) {
      console.log("Sucess!");
      return true;
    } else {
      console.log("Fail!");
      return false;
    }
  });
}
