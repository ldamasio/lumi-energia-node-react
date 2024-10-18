import request from 'supertest';
import app from '../index'; // Ensure this path is correct

describe('Testes da aplicação', () => {
  it('Deve retornar "Hello, World!" com status 200 na rota /', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.text).toBe('Hello, World!');
  });
});

