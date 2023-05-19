FROM node:16-alpine
RUN npm install --global nodemon
WORKDIR /app
COPY . /app
RUN npm i --silent
CMD ["nodemon", "src/index.ts"]