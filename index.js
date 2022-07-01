const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "devel0per",
  database: "usersCrud",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const surName = req.body.surName;
  const dni = req.body.dni;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (name, surName, dni, email, password) VALUES (?,?,?,?,?)",
    [name, surName, dni, email, password],
    (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.send("200");
      }
    }
  );
});

app.get("/readUsers", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.delete("/deleteUser/:userId", (req, res) => {
    const id = req.params.userId;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
  console.log("Server is running on 3001");
});
