const mysql = require('mysql');
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000


const camera_api = require("./api_module/api")
app.use("/camera_api", camera_api);


//app.get('/', (req, res) => res.send('Welcome To Shuttle!'))


app.get('/', function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "phpmyadmin",
        password: "123456",
        database: "camera_nodejs_api"
    });

    con.connect(function (err) {
        if (err) {
            res.send('Error!')
        } else {
            res.send("Connected!");
            
        }

    });


})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))