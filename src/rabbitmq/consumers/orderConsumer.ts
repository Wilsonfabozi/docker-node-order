import { Channel, ConsumeMessage } from 'amqplib';
import rabbitmq from '../rabbitmq';
import logger from '../../logger/logger';
import insertOrder from '../../order/order.repository';
import { getSingleCustomer, insertSingleCustomer } from '../../customer/customer.repository';
import { labelGenerator } from '../../utils/utils';
import errorHandler from '../../utils/errorHandler';

const orderConsumerLogic = (channel: Channel) => async(msg: ConsumeMessage | null): Promise<void> => {
  const label = labelGenerator();

  if (msg) {
    await logger('info', `Order queue consumer processing message: ${msg.content.toString()}`, label);

    const orderParams = JSON.parse(msg.content.toString());

    const customer = await getSingleCustomer(orderParams.customer.document);

    if (customer.length === 0) {
      await logger('info', 'Customer not found in database. Creating new customer', label);
      await insertSingleCustomer(orderParams.customer);
    } else {
      await logger('info', 'Customer found', label);
    }

    await logger('info', 'Creating Order in database', label);
    await insertOrder(orderParams);

    channel.ack(msg);
  }
};

const orderConsumer = async(label: string) => {
  await logger('debug', 'Creating orderConsumer', label);

  const channel = await rabbitmq(label);
  channel.on('error', (error) => errorHandler(error, label));
  channel.consume('order', orderConsumerLogic(channel));
};

export default orderConsumer;
