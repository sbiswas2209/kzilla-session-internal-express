const express = require('express');
const app = express();
const router = require('./api/index');
const config = require('./shared/config');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = config.port;

app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Sample API for Demo Session"
    });
})

app.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found"
    })
})

app.listen(port, (err) => {
    if (err) {
        console.error("Error : ", err);
    } else {
        console.info("Server started on port ", port)
    }
})