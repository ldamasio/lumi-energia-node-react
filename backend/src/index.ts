// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routes/users';
import faturasRouter from './routes/faturas';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// app.post('/api/contas', ContasController.createConta);

app.use('/users', usersRouter);
app.use('/faturas', faturasRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

export default app;