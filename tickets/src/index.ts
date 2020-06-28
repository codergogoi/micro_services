import monggose from 'mongoose';
import { app } from './app';

const startServer = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI must be defined');
  }

  try {
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
