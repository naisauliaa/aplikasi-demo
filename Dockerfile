
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG APP_VERSION_ARG=1.0

ENV APP_VERSION=${APP_VERSION_ARG}

EXPOSE 8080

CMD [ "npm", "start" ]
