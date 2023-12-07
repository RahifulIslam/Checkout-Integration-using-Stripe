const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const userRouter = require('./routers/userRouter');
const stripeRouter = require('./routers/stripeRouters');

const app = express();
app.use(compression());
app.use(morgan());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/payment', stripeRouter);
module.exports = app;
