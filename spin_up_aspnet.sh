#!/bin/bash

# set up asp.net in brew
brew tap aspnet/dnx
brew install dnvm
source dnvm.sh

# install latest asp.net
dnvm upgrade -r coreclr

# install node
brew install node

# install yeoman
sudo npm install -g yo

# install asp.net generator
sudo npm install -g generator-aspnet

# generate asp.net
yo aspnet

# run sample app
pushd WebApplication
dnu restore
dnx web
popd

# usage ./spin-up-demo.sh NUMBER_OF_NODES

#1. check if redis container already exists (docker ps --filter "label=type=redis"), if it doesn't spin one up.
# if it does, don't do anything
#2. check if nginx node already exists and exist equals to NUMBER_OF_NODES
# if they don't, iterate through and create more nodes
# if they do, skip
#3. add let's encrypt to nginx
#3. check if webapi node already exists and exist equals to NUMBER_OF_NODES
# if they don't, iterate through and create more nodes
# if they do, skip
#4. start haproxy
#5. get all nginx hosts and add them to haproxy


# demonstrations:
#1. docker on windows
# docker toolbox example https://www.docker.com/products/docker-toolbox
# pull down image
# run docker 
# create own dockerfile
# run as daemon
# shell into it

#2. docker-machine
# show docker machine create, ls, ip, env

#3. docker-compose
# show docker compose on the same machine for our app

#4. docker-swarm
# show swarm create commands

#5. networking
# show network create, delete

#6. show deploying our app to a remote node 
#7. scaling nodes



# set up redis and expose it on 6379
docker run -p 6379:6379 --label type=redis --name adnug-redis -d redis

# spin up nginx container on node 1


#build web api image
docker build --tag adnug-demo .
docker run --name demo --detach --publish-all aspnet-demo