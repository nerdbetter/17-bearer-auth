'use-strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('app:server');

const app = express();
app.use(cors());
app.use(morgan('dev'));
require('dotenv').load();
require('./lib/mongoose-connect');

app.use(require('./routes/auth'));

app.use(require('./lib/basic-auth-middleware'));

app.use(require('./lib/error-middleware'));

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('you forgot your .env!');
}

if (!module.parent) {
  app.listen(PORT, () => debug(`listening on ${PORT}`));
}

module.exports = app;
