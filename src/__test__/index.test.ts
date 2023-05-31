import request from 'supertest';
import server from '../index';

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  it('should respond with "Hello, world!"', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });
});