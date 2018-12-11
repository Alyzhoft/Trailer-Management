const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const queries = require("./db/queries");
const socket = require("socket.io");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {});

let io = socket(server);

io.on("connection", socket => {
  socket.on("create", async trailer => {
    const response = await queries.insertTrailer(trailer);
    io.emit("create", response);
  });

  socket.on("update", async trailer => {
    const response = await queries.updateTrailer(trailer);
    io.emit("update", response);
  });

  socket.on("move", async trailer => {
    const response = await queries.moveTrailer(trailer);
    io.emit("move", response);
  });

  socket.on("delete", async trailer => {
    const response = await queries.deleteTrailer(trailer);
    io.emit("delete", response);
  });

  socket.on("departed", async trailer => {
    const response = await queries.insertDeparted(trailer);
    io.emit("departed", response);
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend"
  });
});

app.get("/trailers", async (req, res) => {
  const results = await queries.getTrailers();
  res.json(results);
});

app.get("/departedtrailers", async (req, res) => {
  const results = await queries.getDeparted();
  res.json(results);
});

app.post("/departedtrailers", async (req, res) => {
  const results = await queries.trailerSearch(req.body);
  res.json(results.rows);
});
