import express from "express";
import SpotsController from "../controller/spots.js";
import database from "../db/index.js";

const router = express.Router();
const spots = new SpotsController(database);

// husk: spots/
router.get("/", spots.all);
router.get("/:id", spots.get);
router.delete("/:id", spots.delete);
router.post("/", spots.create);
router.get("/location/:zipcode/", spots.getSpotsZipcode);
router.post("/book", spots.book);
router.get("/bookings/:id", spots.bookings);
//router.patch("/:id", spots.);

export default router;
