import cluster from 'cluster';
import os from 'os';
import express from 'express';

import IndexRoute from './api/routes/index.js';

if (cluster.isMaster) {
   console.log('this is the master process : ', process.pid);

   // Count the machine's CPUs
   const cpuCount = os.cpus().length;

   // Create a worker for each CPU
   for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
   }

   // Listen for dying workers
   cluster.on('exit', function () {
      cluster.fork();
   });
} else {
   const app = express();
   const port = process.env.PORT || 3000;
   const pid = process.pid;
   // const server = app.listen(port, () => {
   //    console.log("this is the worker process : ", pid);
   // });

   // Listen to connection
   app.listen(port, () => {
      console.log('this is the worker process : ', pid);
   });

   // v1: API version 1 => index Routes folder
   app.use('/v1/', IndexRoute);
}
