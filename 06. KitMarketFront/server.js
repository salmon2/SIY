const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const hpp = require('hpp');
const helmet = require('helmet');
const { query, response } = require('express');
const axios = require('axios');

const loadJWT = require('./loadJWT');

const app = next({ dev });
const handle = app.getRequestHandler();

const setAxiosCookie = (str) => {
  axios.defaults.headers.Cookie = str;
};

app.prepare().then(() => {
  const server = express();

  if (dev) {
    server.use(morgan('dev'));
    server.use(cookieParser());
  } else {
    server.set('trust proxy', 1);
    server.use(morgan('combined'));
    server.use(hpp());
    server.use(
      helmet({
        contentSecurityPolicy: false,
      })
    );
    server.use(cookieParser(process.env.COOKIE_SECRET));
  }
  server.use(express.urlencoded({ extended: true }));
  server.use('/', express.static(path.join(__dirname, 'public')));
  server.use(loadJWT(['/login', '/signup']));

  server.all('*', (req, res) => {
    handle(req, res);
  });

  server.listen(3000, () => {
    console.log(`next express port: 3000`);
  });
});
