import database from "../db/index.js";
import SpotsController from "./models/spots-controller.js";

export default new SpotsController(database);
