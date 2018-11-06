const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const trailers = require('./db/trailers');
const socket = require('socket.io');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
var server = app.listen(port, () => {

});

let io = socket(server);

io.on("connection", (socket) => {
    socket.on("create", async (trailer) => {
        const response = await trailers.createTrailer(trailer);
        io.emit("create", response);
    });

    socket.on("update", async (trailer) => {
        const response = await trailers.updateTrailer(trailer);
        io.emit("update", response);
    });

    socket.on("move", async (trailer) => {
        const response = await trailers.moveTrailer(trailer);
        io.emit("move", response);
    });

    socket.on("delete", async (trailer) => {
        const response = await trailers.removeTrailer(trailer);
        io.emit("delete", response);
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'Backend'
    });
});

app.get('/trailers/dashboard', (req, res) => {
    trailers.getAll()
    .then(trailers => {
        res.json(trailers);
    });
});
