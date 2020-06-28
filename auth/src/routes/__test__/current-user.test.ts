import request from 'supertest';
import { app } from '../../app';

it('Failes When current User info is missing', async (done) => {
  const cookie = await global.signin();

  console.log(cookie);

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  console.log(`Response ${response}`);
  done();
}, 60000);
