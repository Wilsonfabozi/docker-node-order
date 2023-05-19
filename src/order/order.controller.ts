import { Request, Response } from 'express';
import logger from '../logger/logger';
import validateOrder from './order.valitadions';
import sendMessage from '../rabbitmq/sendMessage';
import { labelGenerator } from '../utils/utils';
import errorHandler from '../utils/errorHandler';

const createOrder = async(req: Request, res: Response): Promise<Response> => {
  const { customer, items, address } = req.body;
  const label = labelGenerator();

  try {
    await logger('info', 'Requested endpoint: (/order/create)', label);
    await logger('info', JSON.stringify(req.body), label);

    const validation = await validateOrder({ customer, items, address }, items, label);

    if (!validation.valid) {
      await logger('info', `Data validation failed. Reason: ${validation.message}`, label);

      return res.status(400).send({ error: validation.message });
    }

    await logger('info', 'Sending order info to order queue', label);
    await sendMessage('order', JSON.stringify({ customer, items, address }), label);

    await logger('info', 'Sending email information to email queue', label);
    await sendMessage('email', 'emailAddress', label);

    return res.send({ message: 'Order placed successfully' });
  } catch (error) {
    errorHandler(error, label);

    return res.status(500).send({ message: JSON.stringify(error) });
  }
};

export default createOrder;
