FROM node:8.7.0-alpine 
# Create app directory 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install 

COPY . /usr/src/app

CMD ["node" , "server.js"]