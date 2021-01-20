//dependencies
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const PORT  = process.env.PORT

server.use(helmet());
server.use(cors());
server.use(express.json());


server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });