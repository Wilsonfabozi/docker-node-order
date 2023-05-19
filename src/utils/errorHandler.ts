import logger from '../logger';

const errorHandler = async(error: any, label: string, mongo = false) => {
  logger('error', error, label, mongo);

  Promise.resolve();
};

export default errorHandler;
