import express from 'express';

const host = '127.0.0.1'
const port = 8000
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello')
})

app.post('/hello', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`Start server at ${host}:${port}`)
})
