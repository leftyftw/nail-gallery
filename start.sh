docker stop gallery
docker rm gallery

docker run -d  \
  -p 3000:3000 \
  -v /data/website/collections/:/app/src/nails/collections \
  -v `pwd`/code:/app \
  --name gallery gallery
