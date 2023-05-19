import rabbitmq from './rabbitmq';
import { Queue } from '../types';
import errorHandler from '../utils/errorHandler';

const sendMessage = async(queue: Queue, message: string, label: string) => {
  const channel = await rabbitmq(label);
  channel.on('error', (error) => errorHandler(error, label));

  channel.sendToQueue(queue, Buffer.from(message));
};

export default sendMessage;
