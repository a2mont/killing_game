import { connectDB } from "../db/db.js";
import { getGameById } from "./games.controller.js";
import { getPlayerById } from "./players.controller.js";

export async function getKillById(id) {
  const sqlRequest = `select * from Kills where KillId=${id}`;
  const [response] = await connectDB.query(sqlRequest);
  return response[0];
}

/**
 * @description Get one Kill
 * @route Get /kills/:id
 *
 */
export const getKill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const kill = await getKillById(id);
    if (!kill) return next(new Error("Kill not found"));

    return res.status(200).json(kill);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get all Kills
 * @route Get /kills
 *
 */
export const getAllKills = async (req, res, next) => {
  try {
    const sqlRequest = "select * from kills";
    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Kills not found"));

    return res.status(200).json({ kills: response });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Create Kill
 * @route Post /kills
 *
 */
export const createKill = async (req, res, next) => {
  try {
    const { killDescription, targetId, ownerId, gameId } = req.body;
    if (!killDescription || !targetId || !ownerId || !gameId)
      return next(new Error("Field not complete"));

    const game = await getGameById(gameId);
    if (!game) return next(new Error("Game does not exist"));

    const target = await getPlayerById(targetId);
    if (!target) return next(new Error("Target player does not exist"));
    const owner = await getPlayerById(ownerId);
    if (!owner) return next(new Error("Owner player does not exist"));

    const sqlRequest = `insert into kills(KillDescription, TargetId, OwnerId, GameId) values('${killDescription}', ${targetId}, ${ownerId}, ${gameId})`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "kill has been created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateKill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { killName, progress } = req.body;

    if (!killName || !progress || !id) return next(new Error("Field not complete"));

    const kill = await getKillById(id);
    if (!kill) return next(new Error("Kill not found"));

    const sqlRequest = `update kills set KillName='${killName}', set Progress='${progress}' where KillId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "kill has been updated" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Delete one Kill
 * @route Get /kills/:id
 *
 */
export const deleteKill = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new Error("Field not complete"));

    const kill = await getKillById(id);
    if (!kill) return next(new Error("Kill not found"));

    const sqlRequest = `delete from Kills where KillId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(200).json({ message: "kill has been deleted" });
  } catch (error) {
    console.log(error);
  }
};
