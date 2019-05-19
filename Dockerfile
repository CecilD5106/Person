FROM alpine

LABEL maintainer="cecild5106@hotmail.com"

RUN apk add --update nodejs nodejs-npm

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 9000

ENTRYPOINT ["node", "./app.js"]
