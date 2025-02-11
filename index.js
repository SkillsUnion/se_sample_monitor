const express = require('express');
const app = express();

// default endpoint 
app.get("/",(req,res) => res.json({
 "GET /": "All Routes", 
 "GET /hello": "Hello World", 
 "GET /metrics": "Metrics data",
 "POST /bye": "POST Request: + post data"
}));
// hello world rest endpoint 
app.get("/hello", (req,res) => res.send("Hello World"));
app.post("/bye", (req,res) => res.send("POST Request : "+ req));
app.listen(8080, function () { 
 console.log('Listening at http://localhost:8080'); 
 });