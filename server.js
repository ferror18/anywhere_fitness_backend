require('dotenv').config()
//dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const PORT  = process.env.PORT


//routers
const userCredentialsRouter = require('./user/userCredentials/userCredentialsRouter.js');
const userDataRouter = require('./user/userData/userDataRouter.js');
const classRouter = require('./class/classRouter');
const eventRouter = require('./event/eventRouter')

//middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/', userCredentialsRouter);
server.use('/user', userDataRouter);
server.use('/class', classRouter);
server.use('/event', eventRouter)
server.get('/', (req, res) => res.status(200).send('<h1>API is available</h1>'));

//Server Listen
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });