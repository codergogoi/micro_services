import request from 'supertest';
import { app } from '../../app';
import { sign } from 'jsonwebtoken';

it('has a route handler listening to /api/tickets post request', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('Can only accessed if the user is signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

// it('returns a status code other than 401 if the user is signed in', async (done) => {
//   const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({});

//   expect(response.status).not.toEqual(401);
//   done();
// }, 600000);

it('return an error if an invalid title is provided', async () => {});

it('return an error if an invalid price is provided', async () => {});

it('creates a ticket with valid inputs', async () => {});
