//dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const PORT  = process.env.PORT || 8000


//routers
const userCredentialsRouter = require('./user/userCredentials/userCredentialsRouter.js');
const userDataRouter = require('./user/userData/userDataRouter.js');
const classRouter = require('./class/classRouter');
const eventRouter = require('./event/eventRouter');
const { verifyToken } = require('./user/userCredentials/utilities.js');

//middleware
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/', userCredentialsRouter);

server.get('/', (req, res) => res.status(200).send('<h1>API is available</h1>'));

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  // console.log(req.headers.authorization)
  if (req.headers.authorization === undefined
    ) {
      const status = 401;
      const message = "Error in authorization format";
      res.status(status).json({ status, message, headers: req.headers });
      return;
    }
    try {
      let verifyTokenResult;
      // console.log(req.headers.authorization);
      verifyTokenResult = verifyToken(req.headers.authorization);
      
      if (verifyTokenResult instanceof Error) {
        const status = 401;
        const message = "Access token not provided";
        res.status(status).json({ status, message, token: req.headers.authorization });
        return;
      }
      next();
    } catch (err) {
      const status = 401;
      const message = "Error access_token is revoked";
      res.status(status).json({ status, message });
    }
  });
  
server.use('/user', userDataRouter);
server.use('/class', classRouter);
server.use('/event', eventRouter)

//Server Listen
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });