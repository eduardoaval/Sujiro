const express = require("express");
const cors = require("cors");
const Team = require("./controllers/TeamController");
const Player = require("./controllers/PlayerController");
const Match = require("./controllers/MatchController");
const SeasonRating = require("./controllers/SeasonRatingController");

const app = express();
require("./database/index");

app.use(express.json());
app.use(cors());
app.options("*", cors());

// TeamController
app.get("/team", Team.createData);

// PlayerController
app.get("/player", Player.getPlayers);
app.get("/player/create", Player.createData);

// MatchController
app.get("/match", Match.createData);

// SeasonRatingController
app.get("/rating", SeasonRating.createData);

// Listen 9090
app.listen(9090, () => {
  console.log(`Node.js HTTP server is running on port 9090`);
});
