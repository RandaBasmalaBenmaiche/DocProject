#! /bin/bash

docker build -t qcm/frontend:1.0 --file=./front/Dockerfile ../
docker build -t qcm/backend:1.0 --file=./back/Dockerfile ../
