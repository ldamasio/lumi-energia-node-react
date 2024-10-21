// __tests__/faturas.test.ts
import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import faturasRouter from '../routes/faturas';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/api/v1/faturas', faturasRouter);

describe('Faturas API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });
  it('should create a new fatura', async () => {
    const newFatura = {
      empresa: "Energia S/A",
      nomeCliente: "João da Silva",
      numeroCliente: "123456789",
      instalacao: "Rua das Flores, 123",
      mesReferencia: "2024-10",
      vencimento: new Date().toISOString(),
      valorAPagar: 150.75,
      energiaEletricaQtd: 300,
      energiaEletricaValor: 120.50,
      energiaSCEESICMSQtd: 50,
      energiaSCEESICMSValor: 30.25,
      energiaCompensadaQtd: 20,
      energiaCompensadaValor: 0,
      cosipValor: 0.50,
    };

    const response = await request(app)
      .post('/api/v1/faturas')
      .send(newFatura)
      .expect(201);

    expect(response.body).toHaveProperty('id');

    // Normalize the response for comparison
    const normalizedResponse = {
      ...response.body,
      valorAPagar: parseFloat(response.body.valorAPagar),
      energiaEletricaQtd: parseFloat(response.body.energiaEletricaQtd),
      energiaEletricaValor: parseFloat(response.body.energiaEletricaValor),
      energiaSCEESICMSQtd: parseFloat(response.body.energiaSCEESICMSQtd),
      energiaSCEESICMSValor: parseFloat(response.body.energiaSCEESICMSValor),
      energiaCompensadaQtd: parseFloat(response.body.energiaCompensadaQtd),
      energiaCompensadaValor: parseFloat(response.body.energiaCompensadaValor),
      cosipValor: parseFloat(response.body.cosipValor),
    };

    expect(normalizedResponse).toMatchObject(newFatura);
  });


});

