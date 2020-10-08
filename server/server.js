import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";

// Api routes
// Legges under mappen server/routes
// må importeres på toppen
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
