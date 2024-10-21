// routes/users.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const  
 { name, email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);  

  } catch (error) {
    console.error(error);  

    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
});

export default router;
