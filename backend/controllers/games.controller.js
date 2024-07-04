import { connectDB } from "../db/db.js";

export async function getGameById(id) {
  const sqlRequest = `select * from Games where GameId=${id}`;
  const [response] = await connectDB.query(sqlRequest);
  return response[0];
}

/**
 * @description Get one Game
 * @route Get /games/:id
 *
 */
export const getGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await getGameById(id);
    if (!game) return next(new Error("Game not found"));

    return res.status(200).json(game);
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get all Games
 * @route Get /games
 *
 */
export const getAllGames = async (req, res, next) => {
  try {
    const sqlRequest = "select * from games";
    const [response] = await connectDB.query(sqlRequest);
    if (!response.length) return next(new Error("Games not found"));

    return res.status(200).json({ games: response });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Create Game
 * @route Post /games
 *
 */
export const createGame = async (req, res, next) => {
  try {
    const { gameName, progress } = req.body;
    if (!gameName) return next(new Error("Field not complete"));
    const sqlRequest = `insert into games(GameName,Progress) values('${gameName}', '${progress}')`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "game has been created" });
  } catch (error) {
    console.log(error);
  }
};

export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gameName, progress } = req.body;

    if (!gameName || !progress || !id) return next(new Error("Field not complete"));

    const game = await getGameById(id);
    if (!game) return next(new Error("Game not found"));

    const sqlRequest = `update games set GameName='${gameName}', set Progress='${progress}' where GameId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(201).json({ message: "game has been updated" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Delete one Game
 * @route Get /games/:id
 *
 */
export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new Error("Field not complete"));

    const game = await getGameById(id);
    if (!game) return next(new Error("Game not found"));

    const sqlRequest = `delete from Games where GameId=${id}`;
    await connectDB.query(sqlRequest);

    return res.status(200).json({ message: "game has been deleted" });
  } catch (error) {
    console.log(error);
  }
};
