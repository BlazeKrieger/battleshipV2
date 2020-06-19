import express from "express";
import handler from "./handler.js";
//import session from "express-session";
const port = 8080; //standard backup port for HTTP

const app = express();

app.use("/", express.static("static")); //route to serve static folder to server

app.use("/", express.json());

app.post("/", function (req, res) {
    //object sent by client side
    const reqObj = req.body;
    handler(reqObj).then(function (resObj) {
        console.log(resObj);
        res.json(resObj);
    });
});

//server listens to any incoming requests from a port, function is reaction
app.listen(port, function () {
    console.log("Listening on port " + port);
});
