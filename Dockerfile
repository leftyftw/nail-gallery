FROM node:20
RUN apt-get update && apt-get -y install zip 
VOLUME [ "/app/src/nails/collections"  ]
COPY code /app
WORKDIR /app
RUN npm ci --production
ENTRYPOINT ["npm", "start"]
