import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from 'codergogoi-common';
import { Ticket } from '../models/tickets';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater then 0'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.sendStatus(201).send(ticket);
  }
);

// router.post(
//   '/api/tickets',
//   requireAuth,
//   (req: Request, res: Response, next: NextFunction) => {
//     res.sendStatus(200);
//   }
// );

export { router as createTicketRouter };
