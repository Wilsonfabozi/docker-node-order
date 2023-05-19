import express from 'express';
import cors from 'cors';
// import logger from './logger';
import setupPostgres from './database/postgresql_setup';
import orderRoutes from './order/order.routes';
import orderConsumer from './rabbitmq/consumers/orderConsumer';
import emailConsumer from './rabbitmq/consumers/emailConsumer';
import { labelGenerator } from './utils';

const label = labelGenerator();

const setup = async() => {
  await setupPostgres(label);
  await orderConsumer(label);
  await emailConsumer(label);
};

setup();

const app = express();

app.use(express.json());
app.use(cors());

// const miliseconds = 1000;
// const seconds = 60;
// const minutes = 2;
// const timeoutTime = miliseconds * seconds * minutes;

// app.use((req, res, next) => {
//   res.setTimeout(timeoutTime, async() => {
//     await logger('info', `Timeout: ${req.get('host') + req.originalUrl}"`, label);

//     res.status(408).send({
//       message: 'Looks like the server is taking too long to respond, this can be caused by '
//       + 'either poor connectivity or an error with our servers. Please try again in a while',
//     });
//   });
//   next();
// });

app.use(orderRoutes);

app.listen(8080);
