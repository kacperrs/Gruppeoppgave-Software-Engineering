import express from "express";

import { spots } from "../controller/spots.js";
// import {getUserSpots} from "../controller/users";

const router = express.Router();

// husk: spots/
router.get("/", spots.all);
router.get("/:id", spots.get);
router.delete("/:id", spots.delete);
router.post("/", spots.create);
router.get("/location/:zipcode/", spots.getSpotsZipcode);
router.post("/book", spots.book);
//router.patch("/:id", spots.);

export default router;
