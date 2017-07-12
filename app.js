const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
   var express = require("express");
   var app = express();

   app.use(express.static(__dirname + '/./public'));
 
   var port = process.env.PORT || 5000;
   app.listen(port, function() {
   console.log("Listening on " + port);
 });

  console.log(`Worker ${process.pid} started`);
}