//dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const PORT  = process.env.PORT


//routers
const userRouter = require('./user/userRouter.js');
const studentRouter = require('./student/studentRouter.js');
const instructorRouter = require('./instructor/instructorRouter.js');

//middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/', userRouter);
server.use('/student', studentRouter);
server.use('/instructor', instructorRouter);
server.get('/', (req, res) => res.status(200).send('<h1>API is available</h1>'));

//Server Listen
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });