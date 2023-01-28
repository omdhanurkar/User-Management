
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2")  //mysql2 bcoz we have version 8.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "user-management"
})

app.get("/api/get", (req, res) => {
    const getData = "SELECT * FROM users";
    db.query(getData, (err, result) => {
        res.send(result)
        //console.log(result)

    })
})
app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO users(name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM users WHERE id =?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error)
        }

    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const getData = "SELECT * FROM users Where id = ?";
    db.query(getData, id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE users SET name = ?,email = ?,contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)

    });
});



app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});