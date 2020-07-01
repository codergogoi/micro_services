import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError } from 'codergogoi-common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate('ticket');

  if (!order) {
    throw new NotAuthorizedError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.id,
    },
  });

  res.status(204).send(order);
});

export { router as deleteOrderRouter };
