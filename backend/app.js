import express from "express";
import router from "./routes/index.routes.js";
import dotenv from "dotenv";
dotenv.config();

const corsOption = {};

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/", router);
// Start the server
app.listen(port, () => {
  console.log(`Node.js HTTP test server is running on port ${port}`);
});
