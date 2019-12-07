// implement your API here

const express = require("express");
let db = require("./data/db");

const server = express();

server.use(express.json());

const PORT = 1234;
const host = "127.0.0.1";

server.get("/", (req, res) => {
  console.log("ip:", req.connection.remoteAddress);

  res.json({ message: "Welcome to our API" });
});

server.get("/users", (req, res) => {
  res.json(db)
});

server.listen(PORT, host, () => {
  console.log(`Listening at http://${host}:${PORT}`);
});
