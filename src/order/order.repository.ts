import postgres from '../database/postgresql';
import { OrderParams, Product } from '../types';

const insertOrder = async(orderParams: OrderParams): Promise<void> => {
  const { customer, items, address } = orderParams;

  const resultOrder = await postgres
    .insert({ customerDocument: customer.document }, ['orderId'])
    .into('orders');

  const { orderId } = resultOrder[0];

  items.forEach(async(product: Product) => {
    await postgres('orderItem').insert({
      orderId,
      productId: product.id,
      amount: product.amount,
    });
  });

  await postgres.insert({
    orderId,
    customerDocument: customer.document,
    status: 'created',
    zip_code: address.zip_code,
    house_number: address.house_number,
    street: address.street,
    neighborhood: address.neighborhood,
    city: address.city,
    uf: address.uf,
    complement: address.complement,
    reference: address.reference,
  }, ['deliveryId']).into('deliveries');
};

export default insertOrder;
