FROM node:12
RUN apt-get update && apt-get -y install zip 
VOLUME [ "/app/src/nails/collections", "/app" ]
WORKDIR /app
ENTRYPOINT ["npm", "start"]
