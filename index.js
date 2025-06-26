const express = require('express');
const app = express();
const promClient = require('prom-client');
const collectDefaultMetrics = promClient.collectDefaultMetrics;
// Collect default metrics
collectDefaultMetrics();
// Create a custom counter
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

app.get("/",(req,res) => res.json({
 "GET /": "All Routes", 
 "GET /hello": "Hello World", 
 "GET /metrics": "Metrics data",
 "POST /bye": "POST Request: + post data"
}));
// rest endpoint 
app.get("/hello", (req,res) => {
    httpRequestsTotal.inc({ method: 'GET', route: '/', status: 200 });
    res.send("Hello World")
});
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});
app.post("/bye", (req,res) => res.send("POST Request : "+ req));
app.listen(8080, function () { 
 console.log('Listening at http://localhost:8080'); 
 });