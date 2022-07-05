const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { encrypt, decrypt } = require('./crypto');

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
  const {iv, content} = encrypt(req.body.password);
 
  db.query(
    "INSERT INTO usersCrypto (name, surName, dni, email, iv, content) VALUES (?,?,?,?,?,?)",
    [name, surName, dni, email, iv, content],
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
    db.query("SELECT * FROM usersCrypto", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        /* res.send(result); */
        const buildResult = () => {
          const passwords = result.map( item => decrypt({ iv: item.iv, content: item.content}))

          const postResult = result.map( (item, i) => ({
            id : item.id,
            name: item.name,
            surName: item.surName,
            dni: item.dni,
            email: item.email,
            password: passwords[i]
          }))

          return postResult
        }
        const newResult = buildResult(result)
        res.send(newResult)
      }
    });
  });

  app.delete("/deleteUser/:userId", (req, res) => {
    const id = req.params.userId;
    db.query("DELETE FROM usersCrypto WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/updateUser", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surName = req.body.surName;
    const dni = req.body.dni;
    const email = req.body.email;
    const {iv, content} = encrypt(req.body.password);

    db.query(
      "UPDATE usersCrypto SET name = ?, surName = ?, dni = ?, email = ?, iv = ?, content = ? WHERE id = ?",
      [name, surName, dni, email, iv, content, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

app.listen(3001, () => {
  console.log("Server is running on 3001");
});
