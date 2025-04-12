const express = require("express");
const cors = require("cors");
const Team = require("./controllers/TeamController");
const Player = require("./controllers/PlayerController");

const app = express();
require("./database/index");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    useCredentials: true,
  })
);

// TeamController
app.get("/team", Team.createData);

// PlayerController
app.get("/player", Player.createData);

// Listen 9090
app.listen(9090, () => {
  console.log(`Node.js HTTP server is running on port 9090`);
});
