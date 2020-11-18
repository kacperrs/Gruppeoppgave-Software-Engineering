import database from "../db/index.js";
import UserController from "./models/user-controller.js";

export default new UserController(database);
