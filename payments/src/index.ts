import monggose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI must be defined');
  }

  if (!process.env.NATS_CLUSTER) {
    throw new Error('NATS Cluster must be defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS CLIENT ID must be defined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS URL must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log(`NATS connection closed`);
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await monggose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongo db Tickets');
  } catch (err) {
    console.log(`Error on Mongo connect ${err}`);
  }

  app.listen(3000, () => {
    console.log(`Listening port 3000`);
  });
};

startServer();
