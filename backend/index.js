
const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql2")  //mysql2 bcoz we have version 8.
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

    })
})

app.get("/", (req, res) => {
    // const insertData ="INSERT INTO users (name,email,contact) VALUES('om','omdhanurkar@gmail.com',9898655326)";
    // db.query(insertData,(err,result)=>{
    //     console.log("err",err)
    //     console.log("result",result)
    //     res.send("heeloo");

    // })
})

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});