import express from "express";
import processLoginData from "../controller/login.js";

const router = express.Router();

// husk: users/
router.get("/*", (req, res) => {
  // forbidden
  res.sendStatus(403);
});
router.post("/", processLoginData);

export default router;
