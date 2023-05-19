import Joi from 'joi';
import logger from '../logger';
import { Product } from '../types';
import { getSingleProductById } from '../products/products.repository';

const validateJson = async(values: Record<string, string>, label: string) => {
  await logger('info', 'Verifying request body', label);

  const schema = Joi.object({
    customer: Joi.object({
      name: Joi.string().required(),
      document: Joi.string().pattern(/^[0-9]{11}$/).required(),
    }),
    items: Joi.array().items(Joi.object({
      id: Joi.string().pattern(/^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/).required(),
      amount: Joi.number().required(),
    })),
    address: Joi.object({
      zip_code: Joi.number().required(),
      house_number: Joi.number().required(),
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      uf: Joi.string().pattern(/^[A-Z]{2}$/),
      complement: Joi.string().optional().allow(''),
      reference: Joi.string().optional().allow(''),
    }),
  });

  const validation = schema.validate(values);

  if (validation.error) {
    return {
      valid: false,
      message: validation.error.details[0].message,
    };
  }

  return {
    valid: true,
    message: 'Data validated',
  };
};

const validateDatabase = async(items: Product[], label: string) => {
  await logger('info', 'Verifying if the products exists', label);

  const promises: Promise<Product>[] = [];
  const products: Product[] = [];

  let foundProduct = true;
  let missingProduct = '';

  items.forEach(async(product: Product) => {
    promises.push(getSingleProductById(product.id, label));
  });

  await Promise.all(promises).then((resultProduct) => {
    resultProduct.forEach((product, index) => {
      if (typeof product === 'undefined') {
        foundProduct = false;
        missingProduct = items[index].id;
      } else {
        products.push(product);
      }
    });
  });

  if (!foundProduct) {
    return {
      valid: false,
      message: `Product not found: ${missingProduct}`,
    };
  }

  return {
    valid: true,
    message: 'Database validated',
  };
};

const validateOrder = async(values: Record<string, string>, items: Product[], label: string) => {
  const jsonValidation = await validateJson(values, label);
  const databaseValidation = await validateDatabase(items, label);

  if (!jsonValidation.valid) {
    return jsonValidation;
  }

  if (!databaseValidation.valid) {
    return databaseValidation;
  }

  return {
    valid: true,
    message: 'Data validated',
  };
};

export default validateOrder;
