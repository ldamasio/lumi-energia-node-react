import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

export default app;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// if (import.meta.url === `file://${process.argv[1]}`) {
//     app.listen(port, () => {
//         console.log(`Server is running at http://localhost:${port}`);
//     });
// }



