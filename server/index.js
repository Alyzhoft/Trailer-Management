const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const queries = require("./queries");
const socket = require("socket.io");

const app = express();

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

  socket.on("deleteTrailer", async trailer => {
    const response = await queries.deleteTrailer(trailer);
    io.emit("deleteTrailer", response);
  });

  socket.on("deleteRequest", async request => {
    const response = await queries.deleteRequest(request);
    io.emit("deleteRequest", response);
  });

  socket.on("departed", async trailer => {
    const response = await queries.insertDeparted(trailer);
    io.emit("departed", response);
  });

  socket.on("request", async data => {
    const response = await queries.request(data);
    io.emit("request", response);
  });

  socket.on("inRequest", async data => {
    const response = await queries.inRequest(data);
    io.emit("request", response);
  });

  socket.on("completed", async data => {
    const response = await queries.completed(data);
    io.emit("completed", response);
  });

  socket.on("addCarrier", async data => {
    const response = await queries.addCarrier(data);
    io.emit("addCarrier", response);
  });

  socket.on("deleteCarrier", async data => {
    const response = await queries.deleteCarrier(data);
    io.emit("deleteCarrier", response);
  });

  socket.on("addCategory", async data => {
    const response = await queries.addCategory(data);
    io.emit("addCategory", response);
  });

  socket.on("editCategory", async data => {
    const response = await queries.editCategory(data);
    io.emit("editCategory", response);
  });

  socket.on("deleteCategory", async data => {
    const response = await queries.deleteCategory(data);
    io.emit("deleteCategory", response);
  });

  socket.on("addUser", async user => {
    const response = await queries.addUser(user);
    io.emit("addUser", response);
  });

  socket.on("editUser", async user => {
    const response = await queries.editUser(user);
    io.emit("editUser", response);
  });

  socket.on("deleteUser", async user => {
    const response = await queries.deleteUser(user);
    io.emit("editUser", response);
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

app.get("/requests", async (req, res) => {
  const results = await queries.getRequests();
  res.json(results);
});

app.post("/trailerNumbers", async (req, res) => {
  const results = await queries.getTrailerNumbers(req.body);
  res.json(results.rows);
});

app.post("/emptyTrailers", async (req, res) => {
  const results = await queries.getEmptyTrailers(req.body);
  res.json(results.rows);
});

app.post("/search", async (req, res) => {
  const results = await queries.trailerSearch(req.body);
  res.json(results.rows);
});

app.get("/carriers", async (req, res) => {
  const results = await queries.getCarriers();
  res.json(results);
});

app.get("/categories", async (req, res) => {
  const results = await queries.getCategories();
  res.json(results);
});

app.get("/users", async (req, res) => {
  const results = await queries.getUsers();
  res.json(results);
});

app.post("/getUser", async (req, res) => {
  const results = await queries.getUser(req.body);
  res.json(results);
});
