import express from "express";
import {
  getKill,
  getAllKills,
  createKill,
  deleteKill,
  updateKill,
} from "../controllers/kills.controller.js";

const killsRouter = express.Router();

killsRouter.route("/").get(getAllKills).post(createKill);
killsRouter.route("/:id").get(getKill).delete(deleteKill).patch(updateKill);

export default killsRouter;
