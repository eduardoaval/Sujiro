const express = require("express");
const cors = require("cors");
const Team = require("./controllers/TeamController");

const app = express();
require("./database/index");

app.use(express.json());
app.use(
  cors({
    origin: "*",
    useCredentials: true,
  })
);

// FollowerController
app.get("/team", Team.createData);

// Listen 9090
app.listen(9090, () => {
  console.log(`Node.js HTTP server is running on port 9090`);
});
