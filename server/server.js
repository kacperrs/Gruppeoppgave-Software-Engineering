import express from "express";
import { errorHandler, notFound } from "./errorHandling.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/login.js";
import spotsRoutes from "./routes/spots.js";

// Api routes
// Legges under mappen server/routes
// må importeres på toppen
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/spots", spotsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Share-A-Spot Server - Up and 🏃"
  });
});

// Håndterer feil requests til server
app.use(notFound);
app.use(errorHandler);

export { app };
