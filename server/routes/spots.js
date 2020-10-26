import express from "express";

import { spots } from "../controller/spots.js";

const router = express.Router();

// husk: spots/
router.get("/", spots.all);
router.get("/:id", spots.get);
router.delete("/:id", spots.delete);
router.post("/", spots.create);
//router.patch("/:id", spots.);

export default router;
