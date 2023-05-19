import express from 'express';
import createOrder from './order.controller';

const router = express();

router.post('/order/create', createOrder);

export default router;
