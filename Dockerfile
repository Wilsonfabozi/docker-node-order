FROM node:16-alpine
RUN npm install --global nodemon
WORKDIR /
COPY . .
RUN npm i --silent
CMD ["nodemon", "src/index.ts"]
EXPOSE 8080