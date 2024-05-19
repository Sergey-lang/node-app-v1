import express from 'express';
import { userRouter } from './users/users.js';

const host = '127.0.0.1'
const port = 8000
const app = express();

app.use((req, res, next) => {
    next()
})

app.get('/hello', (req, res) => {
    res.status(201).json({success: true})
})

app.use('/users', userRouter);

app.use((err, res) => {
    res.status(500).send(err.message)
})
app.listen(port, () => {
    console.log(`Start server at ${host}:${port}`)
})
