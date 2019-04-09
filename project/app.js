const express = require('express')
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000


const camera_api=require("./api_module/api")
app.use("/camera_api",camera_api);


app.get('/', (req, res) => res.send('Hello Areyen !!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))