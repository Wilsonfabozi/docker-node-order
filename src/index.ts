// import app from './app';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import setupPostgres from './database/postgresqlSetup';
import orderRoutes from './order/order.routes';
import orderConsumer from './rabbitmq/consumers/orderConsumer';
import emailConsumer from './rabbitmq/consumers/emailConsumer';
import { labelGenerator } from './utils/utils';

const label = labelGenerator();

export const initServices = {
  setupPostgres: async() => {
    await setupPostgres(label);
  },
  setupOrderConsumer: async() => {
    await orderConsumer(label);
  },
  setupEmailConsumer: async() => {
    await emailConsumer(label);
  },
};

initServices.setupPostgres();
initServices.setupOrderConsumer();
initServices.setupEmailConsumer();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(orderRoutes);

app.listen(8080);

export default app;
