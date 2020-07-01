import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { errorHandler, NotFoundError } from 'codergogoi-common';

const app = express();
app.set('trust proxy', true); // Traffic will reach to our app through Ingress Inginx
app.use(json());
app.use(
  cookieSession({
    signed: false, // We do not need encryption JWT already encrypt
    secure: process.env.NODE_ENV !== 'test', // cookies can used only secure https connection
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.get('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
