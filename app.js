var express = require("express");
var app = express();
const port = 5000;
//setting middleware
app.use("/", express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.listen(port);
console.log("APP is hosted on http://localhost:" + port);
