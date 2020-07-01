import express, { Request, Response } from 'express';
import { requireAuth } from 'codergogoi-common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const order = Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send({});
});

export { router as indexOrderRouter };
