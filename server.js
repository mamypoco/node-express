const express = require("express");
const morgan = require("morgan");
const router = require("./routes");

const hostname = "localhost";
const port = 3000;

const app = express();
//express will be available to this variable app.

app.use(morgan("dev"));
//configure morgan to log using the development version that print some additional info

app.use(express.json());

app.use(router);

app.use(express.static(__dirname + "/public"));
//To serve static files, use the express.static built-in middleware function in Express.
//In Node, __dirname refers absolute path of the current directy
// => I check it worked without __dirname

app.use((req, res) => {
   //morgan will handle request header info
   res.statusCode = 200;
   res.setHeader("Content-Type", "text/html");
   res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
