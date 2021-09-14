FROM node:alpine

RUN apk update && apk add ca-certificates openssl && update-ca-certificates

RUN mkdir /app
COPY package.json /app
COPY . /app
WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN npm install

EXPOSE 3000

CMD /wait && npm start