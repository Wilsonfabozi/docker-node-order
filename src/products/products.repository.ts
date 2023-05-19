import postgres from '../database/postgresql';
import { Product } from '../types';

export const getSingleProductById = async(productId: string): Promise<Product> => {
  const result = await postgres.select('*').from('products').where('productId', productId);

  const product: Product = result[0];

  return product;
};

export default getSingleProductById;
