import client, { Channel, Connection } from 'amqplib';
import * as dotenv from 'dotenv';
import errorHandler from '../utils/errorHandler';
import logger from '../logger';

dotenv.config();

const ENVS = process.env;

const rabbitmq = async(label: string): Promise<Channel> => {
  await logger('debug', 'Creating RabbitMQ connection', label);
  const connection: Connection = await client.connect(
    `amqp://${ENVS.RABBITMQ_USERNAME}:${ENVS.RABBITMQ_PASSWORD}@${ENVS.RABBITMQ_URL}:${ENVS.RABBITMQ_PORT}`
  );
  connection.on('error', (error) => errorHandler(error, label));

  await logger('debug', 'RabbitMQ connection created', label);

  const channel: Channel = await connection.createChannel();
  channel.on('error', (error) => errorHandler(error, label));
  await channel.assertQueue('order');
  await channel.assertQueue('email');

  return channel;
};

export default rabbitmq;
