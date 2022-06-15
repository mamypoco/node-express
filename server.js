const express = require("express");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();
//express will be available to this variable app.

// To use middleware, use 'use'
//https://expressjs.com/en/guide/using-middleware.html
app.use(morgan("dev"));
//This will configure morgan to log using the development version that will print some additional info
app.use(express.json());

app.all("/campsites", (req, res, next) => {
   res.statusCode = 200;
   res.setHeader("Content-Type", "text/plain");
   next();
});

app.get("/campsites", (req, res) => {
   res.end("Will send all the campsites to you");
});

app.post("/campsites", (req, res) => {
   res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
   );
});

app.put("/campsites", (req, res) => {
   res.statusCode = 403;
   res.end("PUT operation not supported on /campsites");
});

app.delete("/campsites", (req, res) => {
   res.end("Deleting all campsites");
});

app.get("/campsites/:campsiteId", (req, res) => {
   res.end(
      `Will send details of the campsite: ${req.params.campsiteId} to you`
   );
});

app.post("/campsites/:campsiteId", (req, res) => {
   res.statusCode = 403;
   res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
   );
});

app.put("/campsites/:campsiteId", (req, res) => {
   res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
   res.end(
      `Will update the campsite: ${req.body.name} with description: ${req.body.description}`
   );
});

app.delete("/campsites/:campsiteId", (req, res) => {
   res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

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
