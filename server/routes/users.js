import express from "express";
import UserController from "../controller/users.js";
import database from "../db/index.js";

const router = express.Router();
const users = new UserController(database);

// husk: users/
router.get("/", users.all);
router.get("/:id", users.get);
router.delete("/:id", users.delete);
router.post("/", users.create);
router.put("/:id", users.update);
router.get("/spots/:id/", users.spots);
router.get("/bookings/:id/", users.bookings);
router.get("/earnings/:id/", users.earnigns);

export default router;
