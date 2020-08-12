#!/bin/bash -x
docker rm -f fullstack-mongo 
docker run -d -p 27017:27017 --name fullstack-mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo --auth