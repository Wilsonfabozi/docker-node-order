import postgres from '../database/postgresql';
import { Customer } from '../types';

export const getSingleCustomer = async(customerDocument: string, label: string) => {
  const customer = await postgres(label).select('*').from('customers').where('document', customerDocument);

  return customer;
};

export const insertSingleCustomer = async(customer: Customer, label: string) => {
  await postgres(label)('customers').insert({
    document: customer.document,
    name: customer.name,
  });
};
