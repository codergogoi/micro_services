import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { createTicketRouter } from './routes/new';

import { errorHandler, NotFoundError, currentUser } from 'codergogoi-common';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.get('*', async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
