const express = require('express')
const app = express()
require('dotenv').config()
const routes = require('./routes/routes')
const DB_CONNECTION = require('./config/database')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


if (!process.env.jsonPrivateKey) {
    console.error('JWT private key not available')
    process.exit(1)
}


// Use cors for cross connection
app.use(cors())

//For URL-encoded payloads
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());


//Routers
routes(app)

DB_CONNECTION()
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${'http://localhost:'+process.env.PORT}`);
})