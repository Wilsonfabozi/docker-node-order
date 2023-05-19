import express from 'express';
import createOrder from './order.controller';
// import logger from '../logger';

const router = express();

router.post('/order/create', createOrder);

export default router;
