const express = require('express')
const app = express()
require('dotenv').config()
const routes = require('./routes/routes')
const DB_CONNECTION = require('./config/database')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


if (!process.env.jsonPrivateKey) {
    console.error('JWT private key not available')
    process.exit(1)
}


// Use cors for cross connection
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));

// app.use(cors())


app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}))

app.use(cookieParser());
//For URL-encoded payloads
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));




//Routers
routes(app)

DB_CONNECTION()
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${'http://localhost:'+process.env.PORT}`);
})