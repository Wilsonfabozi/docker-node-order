import postgres from '../database/postgresql';
import { Customer } from '../types';

export const getSingleCustomer = async(customerDocument: string): Promise<Customer[]> => {
  const customer = await postgres.select('*').from('customers').where('document', customerDocument);

  return customer;
};

export const insertSingleCustomer = async(customer: Customer): Promise<void> => {
  await postgres('customers').insert({
    document: customer.document,
    name: customer.name,
  });
};
