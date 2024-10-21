import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware para capturar erros
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Criar uma nova fatura
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const {
    empresa,
    nomeCliente,
    numeroCliente,
    instalacao,
    mesReferencia,
    vencimento,
    valorAPagar,
    energiaEletricaQtd,
    energiaEletricaValor,
    energiaSCEESICMSQtd,
    energiaSCEESICMSValor,
    energiaCompensadaQtd,
    energiaCompensadaValor,
    cosipValor
  } = req.body;

  const newFatura = await prisma.fatura.create({
    data: {
      empresa,
      nomeCliente,
      numeroCliente,
      instalacao,
      mesReferencia,
      vencimento: new Date(vencimento),
      valorAPagar,
      energiaEletricaQtd,
      energiaEletricaValor,
      energiaSCEESICMSQtd,
      energiaSCEESICMSValor,
      energiaCompensadaQtd,
      energiaCompensadaValor,
      cosipValor
    },
  });
  
  return res.status(201).json(newFatura);
}));

// Obter todas as faturas
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const faturas = await prisma.fatura.findMany();
  return res.json(faturas);
}));

// Obter uma fatura por ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const fatura = await prisma.fatura.findUnique({
    where: { id: Number(id) },
  });

  if (!fatura) {
    return res.status(404).json({ message: 'Fatura não encontrada' });
  }

  return res.json(fatura);
}));

// Atualizar uma fatura por ID
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const updatedFatura = await prisma.fatura.update({
    where: { id: Number(id) },
    data: req.body,
  });

  return res.json(updatedFatura);
}));

// Deletar uma fatura por ID
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.fatura.delete({
    where: { id: Number(id) },
  });

  return res.status(204).send(); // No content
}));

export default router;
