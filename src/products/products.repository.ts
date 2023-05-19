/* eslint-disable import/prefer-default-export */
import postgres from '../database/postgresql';
import { Product } from '../types';

export const getSingleProductById = async(productId: string, label: string): Promise<Product> => {
  const result = await postgres(label)
    .select('*')
    .from('products')
    .where('productId', productId);

  const product: Product = result[0];

  return product;
};
