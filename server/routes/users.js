import express from "express";

// Funksjonene som skal kalles ifb. med routing legges i egen controller fil.
import {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser
} from "../controller/users.js";

const router = express.Router();

// husk: users/
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/", createUser);
router.patch("/:id", updateUser);

export default router;
