// const db = require("./db");
import { connectDB } from "./db.js";
const postPlayersTest = async () => {
  let sqlRequest =
    "select COLUMN_NAME from information_schema.columns where table_name = N'Players'";
  let columnsNames = [];
  try {
    const promise1 = await connectDB.query(sqlRequest);
    if (!promise1) {
      console.log("%cX Test failed: Cannot get column names...", "color:FF0000");
      return;
    }
    columnsNames = promise1[0].map((e) => Object.values(e));
    columnsNames = columnsNames.flat();
    // drop id
    columnsNames.shift();
    sqlRequest = `insert into Players(${columnsNames.toString()}) values ('Test')`;
    // console.log(sqlRequest);
    const promise2 = await connectDB.query(sqlRequest);
    if (!promise2) {
      console.log("%cX Test failed: Cannot insert values...", "color:FF0000");
      return;
    }
    console.log("%c🗸 Test passed !", "color: green;");
  } catch (error) {
    console.log(error);
  }
};

const deletePlayerTest = async () => {
  postPlayersTest();
  let sqlRequest = "delete from Players where PlayerName = 'Test'";
  try {
    const promise1 = await connectDB.query(sqlRequest);
    if (!promise1) {
      console.log('%cX Test failed: Cannot delete Player "Player"...', "color:FF0000");
      return;
    }
    console.log("%c🗸 Test passed !", "color: green;");
  } catch (error) {
    console.log("%cX Test failed: " + error, "color:FF0000");
  }
};

deletePlayerTest();
