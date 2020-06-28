import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from 'codergogoi-common';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater then 0'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
