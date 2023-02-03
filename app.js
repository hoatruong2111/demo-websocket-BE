const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
  pingTimeout: 60000,
});

const functions = require("./functions.js")

const data = [
  {
    id: "f740f6a6-2d34-4ae0-9bcd-edd30404ac07",
  },
  {
    id: "8df401e1-0bce-4eec-9102-4611c2fb26ee",
  },
  {
    id: "5dc2c601-a6b6-47cc-8cba-ca362513a9fd",
  },
];

dataInChart = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", (reason) => {
    console.log("a user disconnected");
  });

  socket.on("joinRoom", () => {
    socket.join("room1");

    for (let i = 0; i < 1000; i++) {
      dataInChart.push(functions.randomData());
    }

    io.to("room1").emit("getData", data);
    io.to("room1").emit("getDataInChart", dataInChart);

    setInterval(() => {
      for (let i = 0; i < 20; i++) {
        dataInChart.shift();
        dataInChart.push(functions.randomData());
      }
      io.to("room1").emit("getDataInChart", dataInChart);
    }, 1000);
  });

  socket.on("addID", (newItem) => {
    data.push(newItem);
    io.to("room1").emit("getData", data);
  });

  socket.on("deleteID", (id) => {
    const index = data.findIndex((obj) => obj["id"] === id);
    if (index > -1) {
      data.splice(index, 1);
    }
    io.to("room1").emit("getData", data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
