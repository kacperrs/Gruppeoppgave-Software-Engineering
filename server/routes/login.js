import express from "express";
import { processLoginData } from "../controller/login.js";

const router = express.Router();

// husk: users/
router.post("/", processLoginData);

export default router;
