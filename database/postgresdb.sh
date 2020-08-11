#!/bin/bash -x
docker rm -f fullstack-postgres && \
docker run --name fullstack-postgres -e POSTGRES_PASSWORD=testing -e POSTGRES_USER=testing -e POSTGRES_DB=testing -p 5432:5432 -d postgres
