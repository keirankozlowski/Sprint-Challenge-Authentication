const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(cors());

const configureRoutes = require('./config/routes');
configureRoutes(server);

const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
};

module.exports = {
  server,
};
