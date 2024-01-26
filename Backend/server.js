const express = require('express')
const app = express()
require('dotenv').config()


app.get('/', (req, res) => {
    res.end('Hello NODE JS Server')
})

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${'http://localhost:3000'}`);
})