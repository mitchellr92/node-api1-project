// implement your API here

const express = require("express");
// let db = require("./data/db");
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

const PORT = 1234;
const host = "127.0.0.1";

server.get("/", (req, res) => {
  console.log("ip:", req.connection.remoteAddress);

  res.json({ message: "Welcome to our API" });
});

server.post("/users", (req, res) => {
  const newUser = {
    id: String(db.length + 1),
    name: req.body.name,
    bio: req.body.bio
  };

  if (newUser.name && newUser.bio) {
    db("users")
      .insert(newUser)
      .then(userId => {
        res.status(201).json(newUser);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to create user" });
      });
  } else {
    res.status(400).json({ error: "Please provide name and bio for the user" });
  }
});

server.get("/users", (req, res) => {
  db("users")
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "failed to get users" });
    });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db("users")
    .where({ id })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ err: "failed to get user" });
    });
});

server.delete

server.listen(PORT, host, () => {
  console.log(`Listening at http://${host}:${PORT}`);
});
