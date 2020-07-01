import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from 'codergogoi-common';import { createChargeRouter } from './routes/new';
\
const app = express();
app.set('trust proxy', true); // Traffic will reach to our app through Ingress Inginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // We do not need encryption JWT already encrypt
    secure: process.env.NODE_ENV !== 'test', // cookies can used only secure https connection
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.get('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
