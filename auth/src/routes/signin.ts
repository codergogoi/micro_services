import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { validateRequest, BadRequestError } from 'codergogoi-common';

import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Please provide a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Email does not exist');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
