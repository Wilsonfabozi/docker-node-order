import { Channel, ConsumeMessage } from 'amqplib';
import rabbitmq from '../rabbitmq';
import logger from '../../logger/logger';
import { labelGenerator } from '../../utils/utils';
import errorHandler from '../../utils/errorHandler';

const emailConsumerLogic = async(channel: Channel) => async(msg: ConsumeMessage | null): Promise<void> => {
  const label = labelGenerator();

  if (msg) {
    try {
      await logger('info', `Email queue consumer processing message: ${msg.content.toString()}`, label);
      await logger('info', `Sending email to customer: ${msg.content.toString()}`, label);

      channel.ack(msg);
    } catch (error) {
      errorHandler(error, label);
    }
  }
};

const emailConsumer = async(label: string) => {
  await logger('debug', 'Creating emailConsumer', label);

  const channel = await rabbitmq(label);
  channel.on('error', (error) => errorHandler(error, label));
  channel.consume('email', await emailConsumerLogic(channel));
};

export default emailConsumer;
