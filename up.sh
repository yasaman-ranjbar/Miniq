#!/bin/bash
reg="localhub.minimum.money/miniq"
docker build -t $1 .
docker tag $1 $reg/$1
docker run -d --name $1 -p 0.0.0.0:3000:3000 $reg/$1