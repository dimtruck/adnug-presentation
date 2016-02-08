#!/bin/bash

NODE_LIST=`docker info | awk '/Nodes/{flag=1;next}/^CPUs/{flag=0}flag' | awk '!/^  /' | awk '{print $2}'`

cp haproxy/haproxy.cfg.template haproxy/haproxy.cfg

counter=0
for NODE_ID in $NODE_LIST; do
  #1. build webapi
  echo $NODE_ID
  pushd webapi
  docker -H tcp://$NODE_ID build --tag adnug-demo .
  popd
  docker -H tcp://$NODE_ID run --name webapi --detach --publish-all adnug-demo

  #2. build nginx
  pushd demo
  docker -H tcp://$NODE_ID build --tag adnug-nginx .
  popd
  docker -H tcp://$NODE_ID run -tid --link webapi:webapi --name angularjs-nginx -p 8080:80 adnug-nginx

  NODE=`echo $NODE_ID | awk -F':' '{print $1}'`
  echo $NODE_ID
  echo $NODE
  counter=$((counter+1))
  echo -e "    server serv$counter $NODE:8080 check" >> haproxy/haproxy.cfg
done

#4. run haproxy
pushd haproxy


docker build --tag adnug-haproxy .
popd
docker run -d -p 80:80 --env affinity:image==adnug-haproxy --name adnug-haproxy adnug-haproxy

docker info
docker ps

#3. run redis
#docker run -p 6379:6379 --label type=redis --name adnug-redis -d redis

