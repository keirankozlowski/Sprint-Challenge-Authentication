const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const jwtPayload = {
    ...user,
    subject: `${user.id}`
  };

  const jwtOptions = {
    expiresIn: '15m'
  }
  console.log(jwtKey);
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

function register(request, response) {
  const credentials = request.body;

  const hashedPW = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hashedPW;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      return response
        .status(201)
        .json({ newUserInfo: credentials });
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "There was an error while creating the user." })
    });
}

function login(request, response) {
  const credentials = request.body;

  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        return response
          .status(401)
          .json({ message: "You shall not pass!" });
      } else {
        const token = generateToken(user);
        return response
          .status(200)
          .json({ message: `${credentials.username} logged in... ${token}` });
      }
    })
    .catch(() => {
      console.log(request.body);
      return response
        .status(500)
        .json({ Error: "There was an error while logging in." })
    });
}

function getJokes(request, response) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      return response
        .status(200)
        .json(response.data);
    })
    .catch(err => {
      return response
        .status(500)
        .json({ message: 'Error Fetching Jokes', error: err });
    });
}